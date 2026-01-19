export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://gocrm.gruzoperevozki-rf.com';

export const STORAGE_KEYS = {
  JWT_TOKEN: 'jwt_token',
} as const;

export const ROUTES = {
  LOGIN: '/login',
  ORDERS: '/orders',
} as const;

export const ORDER_STATUS_COLORS: Record<string, string> = {
  'Архивирована': '#d4edda',
  'Не обработана': '#d4edda',
  'В обработке': '#fff3cd',
  'Выполнена': '#d1ecf1',
} as const;
