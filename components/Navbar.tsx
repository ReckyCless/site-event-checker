import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import CustomButton from "./CustomButton";

const redirectTo = () => {
  return redirect("/login");
};

const NavBar = () => (
  <header className="w-full  absolute z-10">
    <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4 bg-transparent">
      <Link href="/" className="flex justify-center items-center">
        <Image
          src="/logo.svg"
          alt="logo"
          width={200}
          height={40}
          className="object-contain"
        />
      </Link>

      <Link
        className="flex flex-row relative justify-center items-center py-3 px-6 outline-none text-primary-blue rounded-full bg-white min-w-[130px]"
        href={"/auth"}
      >
        Войти
      </Link>
    </nav>
  </header>
);

export default NavBar;
