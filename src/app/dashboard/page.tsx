'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  sub: string;
  exp: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const isExpired = decoded.exp * 1000 < Date.now();

      if (isExpired) {
        localStorage.removeItem('token');
        router.push('/login');
      } else {
        setUsername(decoded.sub); 
      }
    } catch (err) {
      console.error('Token inválido:', err);
      router.push('/login');
    }
  }, [router]);

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold">Bienvenido, {username || 'usuario'} 👋</h1>
    </main>
  );
}