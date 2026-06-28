"use client";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import Link from "next/link";
import { Bell } from "../../components/ui/icons/HeaderImage";
import SignInModal from "../modal/SignInModal";
import SignUpModal from "../modal/SignUpModal";

const Header = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeModal, setActiveModal] = useState<"login" | "register" | null>(
    null,
  );

  const closeModal = () => setActiveModal(null);

  return (
    <>
      <header className="w-full bg-[#184B7BFF] text-white px-6 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2">
          <Link href="/">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center font-bold">
              D
            </div>
          </Link>
          <div className="leading-tight">
            <h1 className="font-semibold text-lg">DevSphere</h1>
            <p className="text-xs text-gray-400">Կոդի հզորություն</p>
          </div>
        </div>

        <nav className="hidden md:flex gap-6 text-sm text-gray-300">
          <Link href="/posts" className="hover:text-white cursor-pointer">Գրառումներ</Link>
          <Link href="/posts" className="hover:text-white cursor-pointer">Խմբեր</Link>
          <Link href="/posts" className="hover:text-white cursor-pointer">Ծրագրեր</Link>
          <Link href="/posts" className="hover:text-white cursor-pointer">Հոդվածներ</Link>
        </nav>

        <div className="flex items-center gap-4">
          {isAuthenticated && user ? (
            <>
              <Link href="/profile" className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center cursor-pointer">
                {user.username?.[0] || "A"}
              </Link>
              <Bell />
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded-lg text-sm cursor-pointer">
                Create
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setActiveModal("login")}
                className="text-sm hover:text-blue-400 cursor-pointer"
              >
                Մուտք
              </button>
              <button
                onClick={() => setActiveModal("register")}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded-lg text-sm cursor-pointer"
              >
                Գրանցում
              </button>
            </>
          )}
        </div>
      </header>

      {/* Modal Overlay: Centers modals on screen */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          {activeModal === "login" ? (
            <SignInModal
              onClose={closeModal}
              onLoginSuccess={closeModal}
              onSwitchToRegister={() => setActiveModal("register")}
            />
          ) : (
            <SignUpModal
              onClose={closeModal}
              onSwitchToLogin={() => setActiveModal("login")}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Header;
