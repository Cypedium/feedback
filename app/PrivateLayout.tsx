'use client';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push(process.env.NEXT_PUBLIC_API_URL + "/login");
        setIsAuthenticated(false);
        return;
      }

      // Optional: validate token with server
      // const res = await fetch("/api/validate-token", { headers: { Authorization: `Bearer ${token}` } });
      // if (!res.ok) {
      //   localStorage.removeItem("token");
      //   router.replace("/login");
      //   setIsAuthenticated(false);
      //   return;
      // }

      setIsAuthenticated(true);
    };

    checkAuth();
  }, [router]);

  if (isAuthenticated === null) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!isAuthenticated) return null;

  return <>{children}</>;
}