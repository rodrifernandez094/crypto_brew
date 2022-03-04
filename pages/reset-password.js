import { withPublic } from "../services/protectRoutes";
import { useState } from "react";
import Router from "next/router";
import Image from "next/image";
import AuthService from "../services/AuthService";
import Toast from "../components/Toast";
import { ToastContainer, toast } from "react-toastify";

const ResetPassword = () => {
  const [email, setEmail] = useState("");

  const resetPassword = async (email) => {
    await AuthService.resetPassword(email);
    toast.dark(<Toast message={"A link has been sent to your email."} />, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 mt-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-4">
          <div>
            <div className="flex justify-center  w-full ">
              <Image src="/logo.png" alt="logo" height={96} width={96} />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Reset your password
            </h2>
            <p className="text-sm text-gray-500 text-center mt-4">
              Enter your email to send you a link to reset your password.
            </p>
          </div>

          <form
            className="mt-8 space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              resetPassword(email);
            }}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
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
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer autoClose={3000} hideProgressBar={true} />
    </>
  );
};

export default withPublic(ResetPassword);
