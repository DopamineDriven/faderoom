"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { FadeRoomIcon } from "@/ui/icons/FadeRoom";

const menuVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 20,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: {
      type: "spring",
      damping: 20,
      when: "afterChildren",
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
};

const navItems = [
  { href: "/#top", label: "Home" },
  { href: "/#services", label: "Services" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#contact-us", label: "Contact Us" }
];

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // prevent scrolling when a modal is opened in the gallery component and prevent scrolling when the mobile nav menu is open
    const isImagePath = /\/photos\/.+/g.test(pathname);
    if (isImagePath || isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [pathname, isOpen]);
  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-40 bg-zinc-900/80 font-basis-grotesque-pro-medium backdrop-blur-sm">
        <nav
          className="mx-auto flex max-w-[1980px] items-center justify-between p-4 lg:px-8"
          aria-label="Global">
          <div className="flex items-center">
            <Link href="/#top" className="-m-1.5 flex items-center p-1.5">
              <span className="sr-only">The Fade Room</span>
              <FadeRoomIcon className="h-10 w-10 text-fr-300" />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <motion.button
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-fr-300"
              onClick={toggleMenu}
              whileTap={{ scale: 0.95 }}>
              <span className="sr-only">Open main menu</span>
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}>
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}>
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-semibold text-zinc-300 hover:text-fr-300">
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      {/* Mobile menu portal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden">
            <motion.div
              className="fixed inset-0 bg-zinc-900/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="fixed inset-y-0 right-0 z-[101] w-full overflow-y-auto bg-zinc-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-zinc-800"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit">
              <div className="flex items-center justify-between">
                <Link href="/" className="-m-1.5 flex items-center p-1.5">
                  <span className="sr-only">The Fade Room Inc</span>
                  <FadeRoomIcon className="h-8 w-8 text-fr-300" />
                </Link>
                <motion.button
                  className="-m-2.5 rounded-md p-2.5 text-fr-300"
                  onClick={toggleMenu}
                  whileTap={{ scale: 0.95 }}>
                  <span className="sr-only">Close menu</span>
                  <X className="h-6 w-6" />
                </motion.button>
              </div>
              <motion.div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-zinc-700">
                  <div className="space-y-2 py-6">
                    {navItems.map(item => (
                      <motion.div key={item.href} variants={itemVariants}>
                        <Link
                          href={item.href}
                          className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-zinc-100 transition-colors hover:bg-zinc-800 hover:text-fr-300"
                          onClick={toggleMenu}>
                          {item.label}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
