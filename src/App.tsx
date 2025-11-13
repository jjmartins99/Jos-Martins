

import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Header from './components/common/Header';

const queryClient = new QueryClient();

const LandingPage = lazy(() => import('./pages/LandingPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const POSPage = lazy(() => import('./pages/POSPage'));
const ImportPage = lazy(() => import('./pages/ImportPage'));
const DeliveryTrackingPage = lazy(() => import('./pages/DeliveryTrackingPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Fix: Explicitly pass children as a prop to fix type error. */}
      <AuthProvider children={
        <BrowserRouter>
          <Header />
          <main className="container mx-auto p-4">
            <Suspense fallback={<div className="text-center p-8">A carregar...</div>}>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                
                {/* Fix: Explicitly pass children as a prop to fix type error. */}
                <Route path="/dashboard" element={<ProtectedRoute children={<DashboardPage />} />} />
                {/* Fix: Explicitly pass children as a prop to fix type error. */}
                <Route path="/pos" element={<ProtectedRoute roles={['Vendedor', 'Supervisor']} children={<POSPage />} />} />
                {/* Fix: Explicitly pass children as a prop to fix type error. */}
                <Route path="/import" element={<ProtectedRoute roles={['Gerente', 'Admin']} children={<ImportPage />} />} />
                {/* Fix: Explicitly pass children as a prop to fix type error. */}
                <Route path="/delivery" element={<ProtectedRoute children={<DeliveryTrackingPage />} />} />
                {/* Fix: Explicitly pass children as a prop to fix type error. */}
                <Route path="/admin" element={<ProtectedRoute roles={['Admin']} children={<AdminPage />} />} />

                <Route path="*" element={<div className="text-center p-8">Página não encontrada</div>} />
              </Routes>
            </Suspense>
          </main>
        </BrowserRouter>
      } />
    </QueryClientProvider>
  );
}

export default App;