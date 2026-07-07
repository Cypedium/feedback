'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Feedback from "./Feedback";

export default function FeedbackPage() {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      router.replace("/"); // root tar hand om redirect till login
    } else {
      setAllowed(true); // visa formuläret
    }
  }, []);

  if (!allowed) return null; // visa inget innan redirect/allow

  return <Feedback />;
}