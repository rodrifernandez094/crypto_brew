import useAuth from "../context/authContext";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);

  const navigation = {
    public: [
      { name: "Login", href: "/login" },
      { name: "Register", href: "/register" },
    ],
    auth: [
      { name: "Market", href: "/market" },
      { name: "Profile", href: "/profile" },
    ],
  };

  return (
    <div className="w-full absolute top-0 left-0 z-50 px-4 lg:px-16 py-2 flex justify-between lg:justify-start gap-8 items-center">
      <div className="w-16 cursor-pointer">
        <Image width={64} height={64} src="/logo.png" alt="logo" />
      </div>
      {/* large screens */}
      <div className="hidden md:block">
        <ul className="flex justify-center items-center py-4 gap-8">
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          {user ? (
            <>
              {navigation.auth.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <a> {link.name}</a>
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={() => signOut()}
                  className=" bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                >
                  Log out
                </button>
              </li>
            </>
          ) : (
            navigation.public.map((link) => (
              <li key={link.name}>
                <Link href={link.href}>
                  <a> {link.name}</a>
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>
      {/* small screens */}
      <div className="md:hidden" onClick={() => setOpen(!open)}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      {open && (
        <div className="absolute w-full right-0 top-16 p-8 bg-white">
          <ul className="flex flex-col gap-4 ">
            <li className="border-b py-2">
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            {user ? (
              <>
                {navigation.auth.map((link) => (
                  <li className="border-b py-2" key={link.name}>
                    <Link href={link.href}>
                      <a> {link.name}</a>
                    </Link>
                  </li>
                ))}
                <li className="border-b py-2">
                  <button
                    onClick={() => signOut()}
                    className=" bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Log out
                  </button>
                </li>
              </>
            ) : (
              navigation.public.map((link) => (
                <li className="border-b py-2" key={link.name}>
                  <Link href={link.href}>
                    <a> {link.name}</a>
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
