'use client';

import { useState } from 'react';
import { Globe } from "@/components/magicui/globe";
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Error al iniciar sesión');
      }
      console.log('Token recibido:', data.access_token);
      localStorage.setItem('access_token', data.access_token);
    } catch (err: any) {
      console.error('Error en login:', err.message);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-black">

      {/* Fondo Globe */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="size-auto">
          <Globe />
        </div>
      </div>

      <div className="relative z-10 flex flex-col  max-w-sm">

        <div className="flex justify-center">
          <h1 className="text-4xl font-semibold text-client-primary mb-8">
            Iniciar Sesión
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-6 w-full">
        
          <div className="relative">
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-4 pl-12 pr-4 rounded-lg bg-white border-2 border-gray-300 shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all h-12 w-full"  // Reemplazamos con un borde válido
              required
            />
            <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          {/* Campo de contraseña con ícono */}
          <div className="relative">
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-4 pl-12 pr-4 rounded-lg bg-white border-2 border-gray-300 shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all h-12 w-full"  // Reemplazamos con un borde válido
              required
            />
            <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          {/* Botón de inicio de sesión con color naranja y ancho completo */}
          <button
            type="submit"
            className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition-colors duration-300 h-12 w-full"
          >
            Iniciar Sesión
          </button>

        </form>

        <div className="text-sm mt-4 text-center">
          <a href="/forgot-password" className="text-orange-600 hover:underline">¿Olvidaste tu contraseña?</a>
        </div>
      </div>


    </div>
  );
}
