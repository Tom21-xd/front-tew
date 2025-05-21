'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; // Usa tu contexto

const links = [
  { name: "Inicio", href: "/" },
  { name: "Reports", href: "/reports" },
];

export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-gray-500">
      <div className="flex items-center justify-between px-10 py-4">

        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link href="/" legacyBehavior>
            <a className="flex items-center space-x-2">
              <img src="/img/logo.png" alt="Logo TEW" className="h-8 w-auto" draggable={false} />
              <span className="text-white font-bold text-lg select-none">TEW</span>
            </a>
          </Link>
        </div>

        {/* Navegación */}
        <nav className="flex items-center space-x-6">
          {links.map((link) => (
            <Link href={link.href} key={link.name} legacyBehavior>
              <a className="text-white hover:underline transition">{link.name}</a>
            </Link>
          ))}
        </nav>

        {/* Botón Login / Logout */}
        <div>
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-white rounded-lg
                         group bg-gradient-to-br from-red-600 to-orange-500 hover:text-white
                         focus:ring-4 focus:outline-none focus:ring-red-300"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white text-gray-900 rounded-md group-hover:bg-transparent group-hover:text-white">
                Cerrar sesión
              </span>
            </button>
          ) : (
            <Link href="/auth/login" legacyBehavior>
              <a
                className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-white rounded-lg
                           group bg-gradient-to-br from-purple-600 to-blue-500 hover:text-white
                           focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white text-gray-900 rounded-md group-hover:bg-transparent group-hover:text-white">
                  Iniciar Sesión
                </span>
              </a>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
