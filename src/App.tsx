import { Routes, Route, Navigate } from "react-router-dom";
import SignupPage from "@/pages/auth/SignupPage";
import LoginPage from "@/pages/auth/LoginPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import WelcomePage from "@/pages/onboarding/WelcomePage";
import KYBPage from "@/pages/onboarding/KYBPage";
import DashboardLayout from "@/components/layout/DashboardLayout";
import HomePage from "@/pages/dashboard/HomePage";
import BookingsPage from "@/pages/dashboard/BookingsPage";
import TransactionsPage from "@/pages/dashboard/TransactionsPage";
import ProductsPage from "@/pages/dashboard/ProductsPage";
import UsersPage from "@/pages/dashboard/UsersPage";
import SettingsPage from "@/pages/dashboard/SettingsPage";
import AuditPage from "@/pages/dashboard/AuditPage";

export default function App() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* Onboarding */}
      <Route path="/onboarding/welcome" element={<WelcomePage />} />
      <Route path="/onboarding/kyb" element={<KYBPage />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<HomePage />} />
        <Route path="bookings" element={<BookingsPage />} />
        <Route path="transactions" element={<TransactionsPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="audit" element={<AuditPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* Default */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
