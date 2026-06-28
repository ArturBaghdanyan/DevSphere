import Image from "next/image";
import Link from "next/link";

export const SocialButton = ({ text, img }: { text: string; img: string }) => (
  <Link
    href="/"
    className="w-full flex items-center gap-3 bg-transparent border border-gray-700 hover:bg-gray-800 text-white py-5 pl-7 rounded-lg transition-colors"
  >
    <div className="flex items-center gap-x-3">
      <Image sizes="100vw" src={img} alt="google" />
      <span>{text}</span>
    </div>
  </Link>
);
