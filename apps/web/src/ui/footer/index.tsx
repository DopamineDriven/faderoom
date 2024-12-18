"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Booksy } from "@/ui/icons/Booksy";
import { Facebook } from "@/ui/icons/Facebook";
import { FadeRoomIcon } from "@/ui/icons/FadeRoom";
import { Instagram } from "@/ui/icons/Instagram";
import { getYear } from "@/utils/get-year";

const navigation = {
  social: [
    {
      name: Facebook.displayName,
      href: "https://www.facebook.com/thefaderoominc/",
      icon: Facebook
    },
    {
      name: Instagram.displayName,
      href: "https://www.instagram.com/thefaderoomhighlandpark/?hl=en",
      icon: Instagram
    },
    {
      name: Booksy.displayName,
      href: "https://booksy.com/en-us/481001_the-fade-room_barber-shop_18688_highland-park",
      icon: Booksy
    }
  ],
  main: [
    { name: "Home", href: "/#top", target: "_self" },
    { name: "Services", href: "/#services", target: "_self" },
    { name: "Gallery", href: "/#gallery", target: "_self" },
    { name: "Contact Us", href: "/#contact-us", target: "_self" }
  ]
} as const;

export default function Footer() {
  return (
    <footer className="border-t-4 border-t-fr-300 bg-zinc-900">
      <div className="mx-auto max-w-[1980px] px-4 py-12 lg:px-8">
        <div className="flex flex-col items-center space-y-8">
          <div className="flex flex-col items-center space-y-4">
            <Link href="/#top" className="inline-block" shallow={true} passHref>
              <span className="sr-only">The Fade Room Inc.</span>
              <FadeRoomIcon
                aria-description="The Fade Room Inc"
                className="h-24 w-auto"
              />
            </Link>
            <p className="text-center text-base text-zinc-400">
              Precision Cuts. Fresh Fades. Sculpted Beards. Clean Shaves.
            </p>
          </div>
          <div className="flex space-x-6">
            {navigation.social.map(item => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-fr-300 hover:text-[hsl(46,58%,73%)]"
                target="_blank"
                rel="noreferrer noopener"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>
                <span className="sr-only">{item.name}</span>
                <motion.div
                  initial={{ rotate: 0 }}
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.75, ease: "easeInOut" }}>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </motion.div>
              </motion.a>
            ))}
          </div>
          <nav className="flex justify-center space-x-6">
            {navigation.main.map(item => (
              <Link
                shallow={true}
                key={item.name}
                href={item.href}
                className="text-sm font-semibold text-fr-300 hover:text-[hsl(46,58%,73%)]">
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-8 border-t border-zinc-800 pt-8">
          <p className="text-center text-sm text-zinc-400">
            &copy; {getYear(Date)} The Fade Room Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
