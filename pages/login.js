import { withPublic } from "../services/protectRoutes";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const Login = ({ auth }) => {
  const { signInWithGoogle, signIn, error } = auth;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-4 mt-16">
          <div>
            <div className="flex justify-center  w-full ">
              <Image src="/logo.png" alt="logo" height={96} width={96} />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <form
            className="mt-8 space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              signIn(email, password);
            }}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                {error && (
                  <div className="bg-red-600 text-white py-1 px-2 rounded">
                    {error}
                  </div>
                )}
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link href="/reset-password">
                  <a className="font-medium text-yellow-600 hover:text-yellow-500">
                    Forgot your password?
                  </a>
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                Log in
              </button>
            </div>
          </form>
          <div>
            <button
              onClick={signInWithGoogle}
              className="group relative w-full flex justify-center py-2 px-4  border border-transparent text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              Sign in with google
            </button>
            <p className="text-sm mt-2">
              ¿Are you new?
              <Link href="/register">
                <a className="text-yellow-600 hover:text-yellow-500">
                  Register
                </a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default withPublic(Login);
