import Link from "next/link";

const links = [
  { name: "Inicio", href: "/" },
  { name: "dashboard", href: "/reports" },
];

export default function Header() {
  
  return (
    <header>
      <div className="flex items-center justify-between p-4 bg-gray-500">
        <div className="ml-10 flex items-center space-x-4">
          <Link href="/" legacyBehavior>
            <a className="flex items-center space-x-2">
              <img src="/img/logo.png" alt="Logo TEW" className="h-8 w-auto" draggable={false} />
              <span className="text-white font-bold text-lg select-none">TEW</span>
            </a>
          </Link>
        </div>

        <nav className="flex items-center space-x-6">
          {links.map((link) => (
            <Link href={link.href} key={link.name} legacyBehavior>
              <a className="text-white hover:underline transition">{link.name}</a>
            </Link>
          ))}
        </nav>

        <div className="mr-10 flex items-center">
          <Link href="/auth/login" legacyBehavior>
            <a
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg
                         group bg-gradient-to-br from-purple-600 to-blue-500 hover:text-white
                         focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-transparent">
                Iniciar Sesión
              </span>
            </a>
          </Link>
        </div>
      </div>
    </header>
  );
}
