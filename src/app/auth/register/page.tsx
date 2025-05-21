"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";
import axios from "axios";
import gsap from "gsap";
import { Meteors } from "@/components/magicui/meteors";

export default function RegisterPage() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [formData, setFormData] = useState({
    nombre_usuario: "",
    correo_usuario: "",
    contrasenia_usuario: "",
    telefono_usuario: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (formRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".form-element", {
          y: 30,
          opacity: 0,
          stagger: 0.15,
          duration: 0.7,
          ease: "power3.out",
        });
      }, formRef);
      return () => ctx.revert();
    }
  }, []);

  useEffect(() => {
    inputRefs.current.forEach((input) => {
      if (!input) return;

      const handleFocus = () => {
        const parent = input.parentElement;
        if (!parent) return;
        gsap.to(input, { borderColor: "#fb923c", duration: 0.3 });
        const icon = parent.querySelector("svg");
        if (icon) gsap.to(icon, { scale: 1.2, color: "#fb923c", duration: 0.3 });
      };

      const handleBlur = () => {
        const parent = input.parentElement;
        if (!parent) return;
        gsap.to(input, { borderColor: "#d1d5db", duration: 0.3 });
        const icon = parent.querySelector("svg");
        if (icon) gsap.to(icon, { scale: 1, color: "#f97316", duration: 0.3 });
      };

      input.addEventListener("focus", handleFocus);
      input.addEventListener("blur", handleBlur);

      return () => {
        input.removeEventListener("focus", handleFocus);
        input.removeEventListener("blur", handleBlur);
      };
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (
      !formData.nombre_usuario ||
      !formData.correo_usuario ||
      !formData.contrasenia_usuario
    ) {
      setError("Por favor completa todos los campos obligatorios");
      setLoading(false);
      return;
    }

    try {
      const postData = {
        nombre_usuario: formData.nombre_usuario,
        correo_usuario: formData.correo_usuario,
        contrasenia_usuario: formData.contrasenia_usuario,
        telefono_usuario: formData.telefono_usuario || null,
      };

      const response = await axios.post(
        "http://localhost:4000/auth/register",
        postData
      );

      if (response.status === 201 || response.status === 200) {
        setSuccess("Registro exitoso! Redirigiendo al login...");
        setTimeout(() => router.push("/auth/login"), 2000);
      } else {
        setError("Error en el registro. Intenta nuevamente.");
      }
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Error de conexión. Intenta nuevamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-black px-4 overflow-hidden">
      {/* Meteoros con mejor configuración */}
      <div className="absolute inset-0 overflow-hidden">
        <Meteors />
      </div>
      
      {/* Formulario con fondo semi-transparente */}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="form-element relative z-10 w-full max-w-md bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-xl mx-auto border border-orange-200"
      >
        <h2 className="form-element text-center text-2xl font-semibold text-orange-500 mb-6">
          Registrarse
        </h2>

        <div className="form-element relative mb-4">
          <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400 transition-transform duration-300" />
          <input
            ref={(el) => {
              if (el) inputRefs.current[0] = el;
            }}
            type="text"
            name="nombre_usuario"
            placeholder="Nombre completo"
            value={formData.nombre_usuario}
            onChange={handleChange}
            required
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300 transition"
          />
        </div>

        <div className="form-element relative mb-4">
          <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400 transition-transform duration-300" />
          <input
            ref={(el) => {
              if (el) inputRefs.current[1] = el;
            }}
            type="email"
            name="correo_usuario"
            placeholder="Correo electrónico"
            value={formData.correo_usuario}
            onChange={handleChange}
            required
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300 transition"
          />
        </div>

        <div className="form-element relative mb-4">
          <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400 transition-transform duration-300" />
          <input
            ref={(el) => {
              if (el) inputRefs.current[2] = el;
            }}
            type="password"
            name="contrasenia_usuario"
            placeholder="Contraseña"
            value={formData.contrasenia_usuario}
            onChange={handleChange}
            required
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300 transition"
          />
        </div>

        <div className="form-element relative mb-6">
          <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400 transition-transform duration-300" />
          <input
            ref={(el) => {
              if (el) inputRefs.current[3] = el;
            }}
            type="tel"
            name="telefono_usuario"
            placeholder="Teléfono (opcional)"
            value={formData.telefono_usuario}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300 transition"
          />
        </div>

        {error && (
          <p className="form-element mb-4 text-center text-red-600 font-semibold">
            {error}
          </p>
        )}
        {success && (
          <p className="form-element mb-4 text-center text-green-600 font-semibold">
            {success}
          </p>
        )}

        <button
          ref={buttonRef}
          type="submit"
          disabled={loading}
          className={`form-element w-full py-3 rounded-md text-white font-semibold transition-colors duration-300 ${loading
              ? "bg-orange-300 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600"
            }`}
        >
          {loading ? "Registrando..." : "Registrarse"}
        </button>
      </form>
    </div>
  );
}