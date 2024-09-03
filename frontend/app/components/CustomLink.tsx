import Link from "next/link";
import React from "react";

/**
 *
 * Custom Link Interface
 */
interface CustomLinkI {
  text: string;
  href: string;
  className: string;
}

/**
 *
 * @param param0 string
 * @param param1 string
 * @param param2 string
 * @returns
 */
const CustomLink = ({
  text = "Login",
  href = "login",
  className = "text-white hover:bg-secondary px-3 py-2 rounded",
}: CustomLinkI) => {
  return (
    <Link href={`/${href}`}>
      <span className={className}>{text}</span>
    </Link>
  );
};

export default CustomLink;
