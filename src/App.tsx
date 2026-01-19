import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider, Spin } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import { useAuthStore } from '@/store/authStore';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { MainLayout } from '@/components/Layout/MainLayout';
import { ROUTES } from '@/constants';
import '@/styles/global.css';

// Lazy loading для страниц
const Login = lazy(() => import('@/pages/Login/Login').then(module => ({ default: module.Login })));
const Orders = lazy(() =>
  import('@/pages/Orders/Orders').then(module => ({ default: module.Orders }))
);

function App() {
  const { initAuth } = useAuthStore();

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return (
    <ConfigProvider locale={ruRU}>
      <BrowserRouter>
        <Suspense
          fallback={
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
              }}
            >
              <Spin size="large" />
            </div>
          }
        >
          <Routes>
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route
              path={ROUTES.ORDERS}
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Orders />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to={ROUTES.ORDERS} replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
