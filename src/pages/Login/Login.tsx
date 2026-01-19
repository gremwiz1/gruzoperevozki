import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import { ROUTES } from '@/constants';
import styles from './Login.module.css';

export const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setToken } = useAuthStore();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await apiClient.auth({ login, password });

      if (response && response.jwt_token) {
        // Сохраняем токен
        setToken(response.jwt_token);

        // Навигация с небольшой задержкой, чтобы store успел обновиться
        setTimeout(() => {
          navigate(ROUTES.ORDERS, { replace: true });
        }, 50);
      } else {
        setError('Не удалось получить токен авторизации');
        setLoading(false);
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'message' in err) {
        setError(String(err.message));
      } else {
        setError('Ошибка авторизации. Проверьте логин и пароль');
      }
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Вход в систему</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="login" className={styles.label}>
              Логин
            </label>
            <input
              id="login"
              type="text"
              value={login}
              onChange={e => setLogin(e.target.value)}
              className={styles.input}
              required
              disabled={loading}
              placeholder="Введите логин"
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>
              Пароль
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className={styles.input}
              required
              disabled={loading}
              placeholder="Введите пароль"
            />
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  );
};
