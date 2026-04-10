import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Navbar */}
      <nav className="bg-gradient-to-r from-[#5e0404] to-[#f50b0c] px-8 py-4 flex items-center justify-between shadow-lg">
        <h1 className="text-white text-xl font-bold">🎵 TicketBengoa</h1>
        <div className="flex items-center gap-4">
          <span className="text-white text-sm">
            {usuario?.nombre} {usuario?.apellido}
          </span>
          <button
            onClick={handleLogout}
            className="bg-white text-[#f50b0c] text-sm font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            Cerrar sesión
          </button>
        </div>
      </nav>

      {/* Contenido */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-6">🎶</div>
          <h2 className="text-4xl font-bold text-[#5e0404] mb-3">
            ¡Bienvenido, {usuario?.nombre}!
          </h2>
          <p className="text-gray-500 text-lg">
            Estás iniciado como <span className="font-semibold text-[#f50b0c]">{usuario?.rol}</span>
          </p>
        </div>
      </div>

    </div>
  );
}