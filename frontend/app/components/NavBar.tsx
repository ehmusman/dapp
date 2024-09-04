import { useContext, useEffect } from "react";
import UserContext from "../context/user/context";
import CustomLink from "./CustomLink";
import Button from "./Button";

export default function Navbar() {
  const context = useContext(UserContext);
  const { email } = context?.state!;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      context?.getUserProfile();
    }
  }, []);
  return (
    <nav className="bg-primary p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-semibold">
          <CustomLink href="" className="hover:bg-secondary" text="DAPP" />
        </div>
        <div className="flex space-x-4">
          {email ? (
            <>
              <CustomLink
                href="profile"
                className="text-white hover:bg-secondary px-3 py-2 rounded"
                text="Profile"
              />
              <div className="cursor-pointer">
                <Button
                  className="text-white hover:bg-secondary px-3 rounded"
                  title="Logout"
                  type="button"
                  onClick={context?.logout}
                />
              </div>
            </>
          ) : (
            <>
              <CustomLink
                href="login"
                className="text-white hover:bg-secondary px-3 py-2 rounded"
                text="Login"
              />
              <CustomLink
                href="signup"
                className="text-white hover:bg-secondary px-3 py-2 rounded"
                text="Signup"
              />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
