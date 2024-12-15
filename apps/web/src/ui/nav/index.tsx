"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Scissors } from "lucide-react";
import { FadeRoomIcon } from "../icons/FadeRoom";

const NavBar = () => {
  return (
    <motion.nav
      className="fixed left-0 right-0 top-0 z-40 border-b border-zinc-800 bg-zinc-900/80 font-basis-grotesque-pro-medium backdrop-blur-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Scissors className="h-8 w-8 text-fr-300" />
              <span className="ml-2 text-xl font-bold text-fr-300">
                The Fade Room
              </span>
              <FadeRoomIcon className="text-fr-300 h-10 w-10" width={40} />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/"
                className="rounded-md px-3 py-2 text-sm font-medium text-zinc-300 hover:text-fr-300">
                Home
              </Link>
              <Link
                href="/#services"
                className="rounded-md px-3 py-2 text-sm font-medium text-zinc-300 hover:text-fr-300">
                Services
              </Link>
              <Link
                href="/#gallery"
                className="rounded-md px-3 py-2 text-sm font-medium text-zinc-300 hover:text-fr-300">
                Gallery
              </Link>
              <Link
                href="/#contact-us"
                className="rounded-md px-3 py-2 text-sm font-medium text-zinc-300 hover:text-fr-300">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default NavBar;
