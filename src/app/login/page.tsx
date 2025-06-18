'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('http://localhost:8080/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('token', data.token);
      router.push('/dashboard');
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <main className="formSection">
      <div className='formBanner'>
        <img src="/assets/logo.svg" alt="logo" />
        <img className='back' src="/assets/back01.jpg" alt="back" />
      </div>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="User"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <span>Forgot your password?</span>
        <input type="submit" value='Login' />
      </form>
      <Link href="/signin">
        <p className="signInButton">Create Account</p>
      </Link>
      <Footer />
    </main>
  );
}