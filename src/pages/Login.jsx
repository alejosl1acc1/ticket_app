import { useState } from "react";
import { login } from "../services/authServices";
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [correo, setCorreo] = useState("");
  const navigate = useNavigate();
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setCargando(true);

    try {
      const data = await login(correo, contraseña);
      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.mensaje || "Error al iniciar sesión");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#5e0404] via-[#8a0808] to-[#f50b0c]">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#f50b0c] mb-2">
            TicketBengoa
          </h1>
          <p className="text-gray-500 text-sm">Inicia sesión para continuar</p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-[#5e0404]">
              Correo electrónico
            </label>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="correo@ejemplo.com"
              required
              className="px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#f50b0c] focus:outline-none text-sm transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-[#5e0404]">
              Contraseña
            </label>
            <input
              type="password"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              placeholder="••••••••"
              required
              className="px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#f50b0c] focus:outline-none text-sm transition-colors"
            />
          </div>

          {error && (
            <p className="text-[#f50b0c] text-sm text-center"> {error}</p>
          )}

          <button
            type="submit"
            disabled={cargando}
            className="mt-2 py-3 rounded-lg bg-gradient-to-r from-[#f50b0c] to-[#8a0808] text-white font-bold text-base cursor-pointer disabled:opacity-70 hover:opacity-90 transition-opacity"
          >
            {cargando ? "Ingresando..." : "Iniciar sesión"}
          </button>
        </form>
      </div>
    </div>
  );
}
