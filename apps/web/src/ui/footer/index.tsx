import Link from "next/link";
import type { TsxExclude } from "@/types/helpers";
import { FacebookIcon } from "@/ui/icons/Facebook";
import { FadeRoomIcon } from "@/ui/icons/FadeRoom";
import { InstagramIcon } from "@/ui/icons/Instagram";
import { getYear } from "@/utils/get-year";
import { BooksyIcon } from "../icons/Booksy";

const navigation = {
  social: [
    {
      name: "Facebook",
      href: "https://www.facebook.com/thefaderoominc/",
      icon: FacebookIcon
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/thefaderoomhighlandpark/?hl=en",
      icon: InstagramIcon
    },
    { name: "Booksy", href: "", icon: BooksyIcon }
  ],
  main: [
    { name: "Home", href: "/", target: "_self" },
    { name: "Services", href: "/#services", target: "_self" },
    { name: "Gallery", href: "/#gallery", target: "_self" },
    { name: "Contact Us", href: "/#contact-us", target: "_self" }
  ]
} as const satisfies Readonly<{
  social: {
    name: string;
    href: string;
    icon: ({
      ...props
    }: TsxExclude<"svg", "fill" | "viewBox" | "xmlns">) => JSX.Element;
  }[];
  main: {
    name: string;
    href: string;
    target: string;
  }[];
}>;

export function Footer() {
  return (
    <footer className="border-t-[0.25rem] border-t-fr-300 bg-fr-bg-main px-6 lg:px-20">
      <div className="overflow-hidden lg:pb-4 lg:pt-4">
        <nav
          className="hidden lg:flex lg:flex-row lg:items-center lg:justify-start"
          aria-label="Global">
          <div className="not-sr-only mr-[3.25rem] mt-1 flex flex-shrink">
            <Link href="/" className="lg:-m-1.5 lg:px-1.5 lg:pb-1.5">
              <span className="sr-only">The Fade Room Inc.</span>
              <FadeRoomIcon height={115} width={115} />
            </Link>
          </div>
          <div className="lg:flex lg:flex-row lg:justify-start lg:gap-x-[3.25rem] lg:space-y-0">
            {navigation.main.map(item => (
              <Link
                key={`footer-${item.name}`}
                href={item.href}
                target={item.target}
                className="font-basis-grotesque-pro-medium text-[1.125rem] leading-[1.5rem] tracking-[0.07813rem] text-fr-300 hover:text-fr-300/95 lg:tracking-[-0.00675rem]">
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
        <nav className="grid grid-cols-1 lg:hidden" aria-label="Global">
          <div className="not-sr-only col-span-2 mr-[3.25rem] flex flex-shrink">
            <Link href="/" className="lg:-m-1.5 lg:px-1.5 lg:pb-1.5">
              <span className="sr-only">The Fade Room Inc.</span>
              <FadeRoomIcon height={100} width={100} />
            </Link>
          </div>
          <div className="my-auto flex flex-col justify-start gap-y-3.5 scroll-smooth">
            {navigation.main.map(item => (
              <Link
                key={`footer-${item.name}`}
                href={item.href}
                className="font-basis-grotesque-pro-medium text-[0.875rem] leading-[1.25rem] tracking-[-0.00675rem] text-fr-300 hover:text-fr-300/95">
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>
      <div className="mt-4 border-t border-fr-300 pb-4 pt-2 lg:mt-0 lg:flex lg:justify-between lg:pt-4">
        <div className="flex space-x-6 pb-2 pt-2 md:order-2">
          {navigation.social.map(item => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noreferrer noopener"
              className="text-fr-300 hover:text-fr-300/95">
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>
        <p className="xs:text-[0.75rem] relative mt-5 flex flex-col justify-start space-y-2.5 text-left font-basis-grotesque-pro-regular text-[0.5rem] leading-5 text-gray-200 lg:text-[1rem]">
          <span className="my-auto w-full flex-shrink">
            &copy;&nbsp;
            {getYear(Date)}&nbsp;The Fade Room Inc. All rights reserved.
          </span>
        </p>
      </div>
    </footer>
  );
}
