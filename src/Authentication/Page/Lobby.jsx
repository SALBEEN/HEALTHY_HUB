import { Link } from "react-router-dom";

export default function Lobby() {
  return (
    <>
      <div className="bg-slate-700 p-20 flex flex-row items-center justify-center sticky gap-10 text-white text-lg w-full">
        <Link className="text-white text-2xl pt-10 " to="/signup">
          Sign Up
        </Link>
        <Link className="text-white text-2xl pt-10 " to="/signin">
          Sign In
        </Link>
      </div>
    </>
  );
}
