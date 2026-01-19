import axios, { AxiosError, AxiosInstance } from 'axios';
import { API_BASE_URL, STORAGE_KEYS } from '@/constants';
import type { AuthRequest, AuthResponse, OrdersResponse, ApiError } from '@/@types';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'json',
      validateStatus: status => status >= 200 && status < 300,
      // Без withCredentials - используем только токен в заголовке Authorization
    });

    // Добавляем токен к каждому запросу
    this.client.interceptors.request.use(
      config => {
        const token = localStorage.getItem(STORAGE_KEYS.JWT_TOKEN);

        if (token) {
          config.headers['jwt_token'] = token;
        }

        return config;
      },
      error => {
        if (import.meta.env.DEV) {
          console.error('Request interceptor error:', error);
        }
        return Promise.reject(error);
      }
    );

    // Обработка ошибок
    this.client.interceptors.response.use(
      response => {
        // Игнорируем set-cookie заголовки - используем только токен из тела ответа
        if (response.data?.jwt_token) {
          localStorage.setItem(STORAGE_KEYS.JWT_TOKEN, response.data.jwt_token);
          console.log('✅ Token updated from response');
        }

        if (import.meta.env.DEV) {
          console.log('Response:', {
            url: response.config.url,
            status: response.status,
          });
        }
        return response;
      },
      (error: AxiosError) => {
        // Не перенаправляем на /login если это запрос авторизации или если мы уже на странице логина
        const isAuthRequest = error.config?.url?.includes('/auth');
        const isOnLoginPage = window.location.pathname === '/login';

        if (error.response?.status === 401 && !isAuthRequest && !isOnLoginPage) {
          localStorage.removeItem(STORAGE_KEYS.JWT_TOKEN);
          if (window.location.pathname !== '/login') {
            window.location.href = '/login';
          }
        }
        return Promise.reject(this.handleError(error));
      }
    );
  }

  private handleError(error: AxiosError): ApiError {
    // Логируем только в dev режиме
    if (import.meta.env.DEV) {
      console.error('API Error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
    }

    if (error.response) {
      const errorData = error.response.data as { message?: string; error?: string };
      return {
        message:
          errorData?.message || errorData?.error || `Ошибка сервера (${error.response.status})`,
        status: error.response.status,
      };
    }
    if (error.request) {
      // Проверяем, является ли это CORS ошибкой
      const isCorsError =
        error.message?.includes('CORS') ||
        error.message?.includes('Network Error') ||
        !error.response;

      if (isCorsError) {
        return {
          message: 'Ошибка CORS. Сервер не разрешает запросы с этого домена.',
        };
      }

      return {
        message: 'Ошибка сети. Проверьте подключение к интернету',
      };
    }
    return {
      message: error.message || 'Произошла неизвестная ошибка',
    };
  }

  async auth(credentials: AuthRequest): Promise<AuthResponse> {
    try {
      const response = await this.client.post<AuthResponse>('/crm/auth', credentials);

      if (!response.data?.jwt_token) {
        throw new Error('Токен не получен от сервера');
      }

      return response.data;
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Auth error:', error);
      }
      throw error;
    }
  }

  async getOrders(page: number = 1): Promise<OrdersResponse> {
    const response = await this.client.get<OrdersResponse>('/crm/orders', {
      params: { page },
    });
    return response.data;
  }
}

export const apiClient = new ApiClient();
