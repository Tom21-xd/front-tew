// services/auth_tew.ts
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

export const login = async (correo_usuario: string, contrasenia_usuario: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      correo_usuario,
      contrasenia_usuario,
    });
    return response.data;
  } catch (error: any) {
    console.error("Error en el inicio de sesión:", error);
    throw error.response?.data || error.message;
  }
};

