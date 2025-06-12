'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function SigninPage() {
    const router = useRouter();
    const [form, setForm] = useState({ email: '', username: '', password: '' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch('http://localhost:8080/api/users/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });

        if (res.ok) {
            router.push('/login'); 
        } else if (res.status === 409) {
            alert('El nombre de usuario ya está en uso');
        } else {
            alert('Error al registrar el usuario');
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
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
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
            <input type="submit" className='signinSubmit' value='Sign In' />
        </form>
        <Link href="/login">
            <p className='signInButton'>I already have an account</p>
        </Link>
        <Footer />
    </main>
  );
}