'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Globe } from "@/components/magicui/globe";
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { login } from "@/services/auth_tew";
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await login(email, password);

      console.log("Usuario autenticado:", response);

      router.push("/");
    } catch (err: any) {
      console.error("Error de autenticación:", err);
      setError(err.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-black">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="size-auto">
          <Globe />
        </div>
      </div>

      <div className="relative z-10 flex flex-col max-w-sm">
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
              className="p-4 pl-12 pr-4 rounded-lg bg-white border-2 border-gray-300 shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all h-12 w-full"
              required
            />
            <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-4 pl-12 pr-4 rounded-lg bg-white border-2 border-gray-300 shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all h-12 w-full"
              required
            />
            <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          {error && (
            <div className="text-red-500 text-center">
              {error}
            </div>
          )}

          {/* Botón de inicio de sesión */}
          <button
            type="submit"
            disabled={loading}
            className={`bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition-colors duration-300 h-12 w-full ${loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            {loading ? "Cargando..." : "Iniciar Sesión"}
          </button>
        </form>

        <div className="text-sm mt-4 text-center">
          <a href="/forgot-password" className="text-orange-600 hover:underline">¿Olvidaste tu contraseña?</a>
        </div>
        <div className="text-center mt-6 text-sm text-gray-300">
          ¿No tienes cuenta?{" "}
          <Link href="/auth/register" className="text-orange-600 hover:underline font-semibold">
            Registrarse
          </Link>
        </div>
      </div>
    </div>
  );
}
