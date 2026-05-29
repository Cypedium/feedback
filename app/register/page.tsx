'use client';
import RegisterForm from "../components/RegisterForm";
import PrivateLayout from "../PrivateLayout";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <PrivateLayout>
        <RegisterForm />
      </PrivateLayout>
    </div>
  );
}