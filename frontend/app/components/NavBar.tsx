import Link from "next/link";
import { useContext } from "react";
import UserContext from "../context/user/context";

export default function Navbar() {
  const context = useContext(UserContext);
  const { email } = context?.state!;
  return (
    <nav className="bg-primary p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-semibold">
          <Link href="/">
            <span className="hover:bg-secondary">DAPP</span>
          </Link>
        </div>
        <div className="flex space-x-4">
          {email ? (
            <>
              <Link href="/profile">
                <span className="text-white hover:bg-secondary px-3 py-2 rounded">
                  Profile
                </span>
              </Link>
              <div className="cursor-pointer">
                <span
                  className="text-white hover:bg-secondary px-3 py-2 rounded"
                  onClick={context?.logout}
                >
                  Logout
                </span>
              </div>
            </>
          ) : (
            <>
              <Link href="/login">
                <span className="text-white hover:bg-secondary px-3 py-2 rounded">
                  Login
                </span>
              </Link>
              <Link href="/signup">
                <span className="text-white hover:bg-secondary px-3 py-2 rounded">
                  Signup
                </span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
