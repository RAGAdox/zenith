import React from "react";
import Button from "../Button/Button";

interface NavbarProps {
  title: string;
  titleLink?: string;
  linkSlot?: React.ComponentType;
  enableSearch?: boolean;
}
export default function Navbar({
  title,
  titleLink,
  enableSearch = false,
}: NavbarProps) {
  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-10">
      <div className="flex-1">
        <Button variant="navlink" className="text-xl" asChild>
          <a href={titleLink ? titleLink : "/"}>{title}</a>
        </Button>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search"
          className={`input input-bordered w-24 md:w-auto ${
            !enableSearch && "hidden"
          }`}
        />
        <Button variant="navlink">
          <a href="/menu">Menu</a>
        </Button>
        <div className="dropdown dropdown-end [position:unset] md:relative">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-none md:rounded-box mt-3 md:mt-4 z-10 md:w-52 p-2 shadow w-full "
          >
            <li>
              <Button
                asChild
                variant="navlink"
                className="flex justify-between"
              >
                <a href="/profile">
                  Profile
                  <span className="badge badge-primary end-0">New</span>
                </a>
              </Button>
            </li>
            <li>
              <Button asChild variant={"navlink"} className="justify-between">
                <a href="/settings">Settings</a>
              </Button>
            </li>
            <li>
              <Button asChild variant={"navlink"} className="justify-between">
                <a href="/signout">Log out</a>
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
