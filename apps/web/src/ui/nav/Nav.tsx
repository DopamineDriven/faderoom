"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import throttle from "lodash.throttle";
import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/ui/dropdown";
import { cn } from "@/lib/utils";
import { NavButton } from "@/ui/nav/NavButton";
import { FadeRoomIcon } from "@/ui/icons/FadeRoom";
import css from "./navbar.module.css";

const navigation = [
  { name: "Home", href: "/" },
  {
    name: "Services",
    href: "/services",
    children: [
      { name: "Haircut", href: "/services/haircut" },
      { name: "Student Cut", href: "/services/student-cut" },
      { name: "Kids Haircut", href: "/services/kids-haircut" },
      { name: "Senior Special", href: "/services/senior-special" },
      { name: "Haircut & Shave", href: "/services/haircut-and-shave" },
      { name: "Presidential Package", href: "/services/presidential-package" },
      { name: "Hero Cut", href: "/services/hero-cut" },
      { name: "Gray Camoflauge", href: "/services/gray-camoflauge" },
      { name: "Permanent Hair Color", href: "/services/permanent-hair-color" },
      { name: "Beard Trim & Shave", href: "/services/beard-trim-and-shave" },
      { name: "Basic Beard Trim", href: "/services/basic-beard-trim" },
      { name: "Basic Shave", href: "/services/basic-shave" },
      { name: "Facial", href: "/services/facial" },
      { name: "Ear Waxing", href: "/services/ear-waxing" },
      { name: "Eyebrow Wax", href: "/services/eyebrow-wax" },
      { name: "Nose Wax", href: "/services/nose-wax" }
    ]
  },
  { name: "Business Hours", href: "/business-hours" },
  { name: "Contact Us", href: "/contact-us" }
] satisfies ({
  name: string;
  href: string;
  children?: undefined;
} | {
  name: string;
  href: string;
  children: {
      name: string;
      href: string;
  }[];
})[];

export function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [hasScrolled, setHasScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (mobileMenuOpen === true) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    // effect only fires on pathname change which closes the menu in mobile view
    console.info(`route changed to ${pathname}`);
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const offset = 0;
      const { scrollTop } = document.documentElement;
      const scrolled = scrollTop > offset;
      setHasScrolled(scrolled);
    }, 200);
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [hasScrolled]);

  const toggleExpanded = (itemName: string) => {
    setExpandedItems(prev =>
      prev.includes(itemName)
        ? prev.filter(item => item !== itemName)
        : [...prev, itemName]
    );
  };

  return (
    <>
      <nav
        className={cn(
          "bg-fr-bg font-basis-grotesque-pro-medium shadow will-change-scroll",
          css.stickyNav,
          hasScrolled === false ? "bg-opacity-100" : "bg-opacity-95"
        )}>
        <div className={"mx-auto max-w-8xl px-4 sm:px-6 lg:px-8"}>
          <div className='flex h-16 justify-between'>
            <div className='flex'>
              <div className='flex flex-shrink-0 items-center'>
                <Link
                  scroll={false}
                  href={"/"}
                  className='z-[100] text-xl font-bold text-fr-300'>
                  <FadeRoomIcon width={50} />
                </Link>
              </div>
              {/* Desktop/Tablet Menu */}
              <div className='hidden sm:ml-6 sm:flex sm:space-x-8'>
                {navigation.map(item => (
                  <div key={item.name} className='relative flex items-center'>
                    {item.children ? (
                      <>
                        <Link
                          scroll={false}
                          className='inline-flex items-center border-b-2 border-transparent px-1 py-2 text-sm font-medium text-fr-300 hover:border-fr-500 hover:text-fr-400'
                          href={item.href}>
                          {item.name}
                        </Link>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <NavButton
                              variant='ghost'
                              className='h-auto rounded-full px-1 py-1 text-sm font-medium text-fr-300 hover:text-fr-400'>
                              <ChevronDown className='h-4 w-4' />
                            </NavButton>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align='start'>
                            {item.children.map(child => (
                              <DropdownMenuItem key={child.name} asChild>
                                <Link scroll={false} href={child.href}>
                                  {child.name}
                                </Link>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </>
                    ) : (
                      <Link
                        scroll={false}
                        href={item.href}
                        className='inline-flex items-center border-b-2 border-transparent px-1 py-2 text-sm font-medium text-fr-300 hover:border-fr-500 hover:text-fr-400'>
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {/* Hamburger Menu for Mobile; Hidden on Tablet/Desktop */}
            <div className='-mr-2 flex items-center sm:hidden'>
              <NavButton
                variant='ghost'
                className='inline-flex items-center justify-center rounded-md p-2 text-fr-300 hover:bg-woodsmk-900 hover:text-fr-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-fr-500'
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <span className='sr-only'>Open main menu</span>
                {mobileMenuOpen ? (
                  <X className='block h-6 w-6' aria-hidden='true' />
                ) : (
                  <Menu className='block h-6 w-6' aria-hidden='true' />
                )}
              </NavButton>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={cn(`sm:hidden`, mobileMenuOpen ? "block" : "hidden")}>
          <div
            className={cn(
              "basis-grotesque-pro-medium absolute flow-root w-full min-w-full space-y-1 bg-fr-bg pb-3 pt-2 will-change-scroll",
              hasScrolled === false ? "bg-opacity-100" : "bg-opacity-95",
              css.navMobile
            )}>
            {navigation.map(item => (
              <div key={item.name} className='relative'>
                {item.children ? (
                  <>
                    <div className='flex w-full min-w-full flex-row justify-between px-3 py-2'>
                      <Link
                        scroll={false}
                        className='z-50 inline-flex justify-between text-base font-medium text-fr-300 hover:bg-woodsmk-900 hover:text-fr-400'
                        href={item.href}>
                        {item.name}
                      </Link>
                      <NavButton
                        variant='ghost'
                        className='-my-2.5 inline-flex items-end justify-between align-top text-base font-medium text-fr-300 hover:bg-woodsmk-900 hover:text-fr-400'
                        onClick={() => toggleExpanded(item.name)}>
                        {expandedItems.includes(item.name) ? (
                          <ChevronUp className='ml-1 h-4 w-4' />
                        ) : (
                          <ChevronDown className='ml-1 h-4 w-4' />
                        )}
                      </NavButton>
                    </div>
                    <div className=''>
                      {expandedItems.includes(item.name) && (
                        <div className='ml-4 mt-2 space-y-2'>
                          {item.children.map(child => (
                            <Link
                              scroll={false}
                              key={child.name}
                              href={child.href}
                              className='block px-3 py-2 text-base font-medium text-fr-300 hover:bg-woodsmk-900 hover:text-fr-400'>
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className='block px-3 py-2 text-base font-medium text-dcs-800 hover:bg-dcs-200 hover:text-dcs-900'>
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
