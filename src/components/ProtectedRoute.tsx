import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { ROUTES, STORAGE_KEYS } from '@/constants';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, initAuth } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Проверяем токен из localStorage напрямую
    const token = localStorage.getItem(STORAGE_KEYS.JWT_TOKEN);
    if (token && !isAuthenticated) {
      // Если токен есть, но store не обновлен - обновляем store
      initAuth();
    }
    setIsChecking(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Показываем загрузку во время проверки
  if (isChecking) {
    return null; // или можно показать спиннер
  }

  // Проверяем и store, и localStorage напрямую
  const token = localStorage.getItem(STORAGE_KEYS.JWT_TOKEN);
  if (!token && !isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <>{children}</>;
};
