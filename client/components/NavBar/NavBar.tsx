import Link from "next/link";

// Example icons - replace these with your actual icon components
const navItems = [
  { name: "Հիմնական", path: "/", icon: "🏠" },
  { name: "Ֆիդ", path: "/feed", icon: "📡" },
  { name: "Պահպանված", path: "/saved", icon: "🔖" },
  { name: "Հաղորդագրություններ", path: "/messages", icon: "💬" },
  { name: "Հարաբերություններ", path: "/network", icon: "👥" },
];

const NavBar = () => {
  return (
    <aside className="flex flex-col p-4 bg-[#B0AFB4FF] h-screen">
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#1e1e1e] transition-colors hover:text-white"
          >
            <span>{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default NavBar;
