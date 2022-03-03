import Link from "next/link";
import Image from "next/image";
import useAuth from "../context/authContext";
import { useEffect } from "react";
import FirestoreService from "../services/FirestoreService";

const Home = () => {
  const { user } = useAuth();
  useEffect(() => {
    const getFavorites = async () => {
      if (user) {
        await FirestoreService.getFavorites(user.uid);
      }
    };
    getFavorites();
  }, [user]);

  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <div className="relative pt-6 px-4 sm:px-6 lg:px-8"></div>

          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="text-center lg:text-left pt-8">
              <h1 className="text-4xl tracking-tight font-extrabold text-stone-800 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Crypto </span>{" "}
                <span className="block text-yellow-500 xl:inline">Brew</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                With crypto Brew you can monitor the cryptocurrency market to
                know the last prices, coin market cap, token price charts, and
                24h change of bitcoin and other altcoins.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link href={user ? "/market" : "/login"}>
                    <a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-700 md:py-4 md:text-lg md:px-10">
                      Get started
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="/crypto.jpg"
          alt="crypto"
        />
      </div>
    </div>
  );
};

export default Home;
