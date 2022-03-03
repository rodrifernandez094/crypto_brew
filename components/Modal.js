import { useState } from "react";
import useAuth from "../context/authContext";

const Modal = ({ setIsOpen }) => {
  const [password, setPassword] = useState("");
  const { deleteUser } = useAuth();

  return (
    <div className="w-full h-full z-40 text-stone-800 bg-neutral-900/80 flex justify-center items-center absolute top-0 left-0">
      <div
        className=" max-w-sm z-50 flex flex-col justify-center text-center 
            bg-white shadow-md opacity-100 rounded-xl py-8 px-4 relative"
      >
        <div
          className="cursor-pointer absolute top-0 right-0 p-4 text-sm"
          onClick={() => setIsOpen((oldState) => !oldState)}
        >
          X
        </div>
        <h1 className=" font-bold text-xl my-4">Are you absolutely sure?</h1>
        <p className="text-sm">
          This action cannot be undone. This will permanently delete your
          account.
        </p>
        <form
          className="my-8 flex flex-col"
          onSubmit={(e) => {
            e.preventDefault();
            deleteUser(password);
          }}
        >
          <label htmlFor="password">Enter your password.</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            className="my-2 rounded"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="submit"
            className="bg-red-700 text-white text-sm cursor-pointer rounded py-2 px-4 disabled:opacity-50"
            disabled={!password}
            value="Delete"
          />
        </form>
      </div>
    </div>
  );
};

export default Modal;
