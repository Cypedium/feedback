import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// utils/logout.ts or inside your component
export const handleLogout = async () => {

  try {
    await fetch('/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    localStorage.removeItem('token'); // Remove JWT
    window.location.href = '/login'; // Redirect to login page
  } catch (err) {
    console.error('Logout failed:', err);
  }
};