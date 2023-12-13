import React from "react";

function Header() {
  return (
    <div className="bg-white bg-opacity-5 text-black shadow-lg hidden md:block">
      <div className="container flex items-center h-24">
        <a href="" className="flex items-center justify-center">
          <span className="ml-4 uppercase font-black">
            Legal
            <br />
            Beagle
          </span>
        </a>
        <nav className="contents font-semibold text-base lg:text-lg">
          <ul className="mx-auto flex items-center">
            <li className="p-5 xl:p-8 active">
              <a href="">
                <span className="ml-14">Home</span>
              </a>
            </li>
            <li className="p-5 xl:p-8">
              <a href="">
                <span>About</span>
              </a>
            </li>
            <li className="p-5 xl:p-8">
              <a href="">
                <span className="underline underline-offset-8">Attorneys</span>
              </a>
            </li>
            <li className="p-5 xl:p-8">
              <a href="">
                <span>Services</span>
              </a>
            </li>
            <li className="p-5 xl:p-8">
              <a href="">
                <span>Blog</span>
              </a>
            </li>
          </ul>
        </nav>
        <button className="border border-black rounded-full font-bold px-4 py-2 mr-4">
          Contact Us
        </button>
      </div>
    </div>
  );
}

export default Header;
