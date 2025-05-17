const links = [
    { name: "Inicio", href: "/" },
    { name: "Viajes", href: "/viajes" },
    { name: "Reportes", href: "/dashboard" },
];

export default function Header() {
    return (
        <header>
            <div className="flex items-center justify-between p-4 bg-gray-800">
                <div className="ml-10 flex items-center space-x-4">
                    <a href="" className="text-white">TEW</a>
                </div>
                <div className="flex items-center space-x-4">
                    {links.map((link) => (
                        <a key={link.name} href={link.href} className="text-white">{link.name}</a>
                    ))}
                </div>
                <div className="mr-10 flex items-center space-x-4">
                    <a href="/auth/login">
                        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800" >
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                                Iniciar Sesión
                            </span>
                        </button>
                    </a>
                </div>
            </div>
        </header>
    );
}
