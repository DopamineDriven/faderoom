/* In progress for v2 of three providers for one carousel 🚀 */
"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import type { TsxExclude, Unenumerate } from "@/types/helpers";
import { imageData } from "@/utils/__generated__/image-object";
import Carousel from "../carousel";
import { GalleryContainer } from "../carousel/GalleryContainer";

/*

Import into a test page with the following code

import SharedLayoutAnimation from "@/ui/motion/SharedLayoutAnimation";

export default function TestPage() {
  return (
    <div className="flex flex-col font-basis-grotesque-pro-black items-center justify-center min-h-screen bg-background">
      <h1 className="text-3xl font-bold mb-8 text-foreground">Shared Layout Animation Demo</h1>
      <SharedLayoutAnimation />
    </div>
  )
}
*/

const Booksy = ({
  ...svg
}: TsxExclude<"svg", "xmlns" | "viewBox" | "fill">) => (
  <svg
    viewBox="0 0 33 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...svg}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.5936 7.2902C21.8684 6.54005 23.2838 6.14115 24.7162 6.20014C27.7609 6.32572 30.1624 7.70256 31.7526 10.3361C32.6961 11.8986 33.0243 13.6029 33.0004 15.4217C32.9734 17.4646 32.3892 19.2825 31.0705 20.8398C29.4132 22.7973 27.2717 23.7424 24.6962 23.9583C20.8977 24.277 17.8132 22.7308 14.9155 20.5771C13.4855 19.5141 12.0441 18.4685 10.5369 17.5142C9.87135 17.0928 9.16381 16.7727 8.40129 16.5715C6.68829 16.1194 5.0401 16.7722 4.11515 18.2702C4.03322 18.4026 3.94576 18.5341 3.884 18.676C3.69872 19.1016 3.3819 19.2702 2.91675 19.2555C2.22777 19.2337 1.53718 19.2646 0.848202 19.2458C0.0274943 19.2233 -0.175452 18.9317 0.143692 18.1871C1.22482 15.6642 3.13058 14.0731 5.81047 13.4598C8.29615 12.8911 10.5957 13.3915 12.6555 14.8948C13.8669 15.7786 15.0419 16.7125 16.2673 17.5763C17.9305 18.7484 19.6392 19.8822 21.6244 20.4294C23.7181 21.0063 25.7775 20.9328 27.6333 19.6038C28.7244 18.8224 29.4438 17.7915 29.6497 16.4664C29.9253 14.6932 29.7376 13.0003 28.6161 11.5004C26.5015 8.67235 22.3749 8.80944 20.4492 11.8012C19.9008 12.653 19.5571 13.5766 19.6129 14.6163C19.6361 15.0505 19.6424 15.4901 19.5994 15.9216C19.5487 16.4285 19.2551 16.6207 18.8317 16.4011C18.054 15.9981 17.3322 15.4988 16.6396 14.9635C16.2953 14.6974 16.3572 14.298 16.357 13.9269C16.3569 11.7806 16.357 9.63399 16.3595 7.4877C16.3595 5.34123 16.3554 3.19477 16.3613 1.0483C16.3638 0.0652277 16.4252 0.0136833 17.4462 0.00252411C17.7596 -0.000841369 18.0731 -0.000841369 18.3865 0.00252411C19.455 0.0140376 19.6129 0.172923 19.6163 1.26971C19.621 2.70075 19.6176 4.13161 19.6176 5.56264C19.6176 5.93586 19.6169 6.30925 19.6177 6.68246C19.6202 7.84267 19.6295 7.85755 20.5936 7.2902Z"
    />
  </svg>
);

const Facebook = ({
  ...svg
}: TsxExclude<"svg", "xmlns" | "viewBox" | "fill">) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...svg}>
    <path
      d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Instagram = ({
  ...svg
}: TsxExclude<"svg", "xmlns" | "viewBox" | "fill">) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...svg}>
    <path
      d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.9997 11.3703C16.1231 12.2025 15.981 13.0525 15.5935 13.7993C15.206 14.5461 14.5929 15.1517 13.8413 15.53C13.0898 15.9082 12.2382 16.0399 11.4075 15.9062C10.5768 15.7726 9.80947 15.3804 9.21455 14.7855C8.61962 14.1905 8.22744 13.4232 8.09377 12.5925C7.96011 11.7619 8.09177 10.9102 8.47003 10.1587C8.84829 9.40716 9.45389 8.79404 10.2007 8.40654C10.9475 8.01904 11.7975 7.87689 12.6297 8.0003C13.4786 8.12619 14.2646 8.52176 14.8714 9.12861C15.4782 9.73545 15.8738 10.5214 15.9997 11.3703Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17.5 6.5H17.51"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const s = [
  {
    icon: Facebook,
    label: "FacebookIcon"
  },
  { icon: Instagram, label: "InstagramIcon" },
  { icon: Booksy, label: "BooksyIcon" } as const
];

export interface Ingredient {
  icon: Unenumerate<typeof s>["icon"];
  label: Unenumerate<typeof s>["label"];
}

const [FacebookIcon, InstagramIcon, BooksyIcon] = s as typeof s;
const tabs = [FacebookIcon, InstagramIcon, BooksyIcon] as const as typeof s;

export default function SharedLayoutAnimation() {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const ScaleCarousel = () => (
    <div className="flex shrink scale-[0.25] align-top">
      <GalleryContainer>
        <Carousel imageData={imageData} />
      </GalleryContainer>
    </div>
  );
  return (
    <div style={container}>
      <nav style={nav}>
        <ul style={tabsContainer}>
          {tabs.map(item => (
            <motion.li
              key={item.label}
              initial={false}
              animate={{
                backgroundColor: item === selectedTab ? "#eee" : "#eee0"
              }}
              style={tab}
              onClick={() => setSelectedTab(item)}>
              <item.icon className="block h-5 w-5" />
              &nbsp;
              {`${item.label}`}
              {item === selectedTab ? (
                <motion.div style={underline} layoutId="underline" />
              ) : null}
            </motion.li>
          ))}
        </ul>
      </nav>
      <section style={iconContainer}>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab ? selectedTab.label : "empty"}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={icon}>
            {selectedTab ? (
              selectedTab.label === "BooksyIcon" ? (
                <ScaleCarousel />
              ) : (
                <selectedTab.icon className="block h-9 w-9" />
              )
            ) : (
              "🧝‍♂️"
            )}
          </motion.div>
        </AnimatePresence>
      </section>
    </div>
  );
}

const container: React.CSSProperties = {
  width: 480,
  height: "60vh",
  maxHeight: 360,
  borderRadius: 10,
  background: "white",
  verticalAlign: "top",
  overflow: "scroll",
  boxShadow:
    "0 1px 1px hsl(0deg 0% 0% / 0.075), 0 2px 2px hsl(0deg 0% 0% / 0.075), 0 4px 4px hsl(0deg 0% 0% / 0.075), 0 8px 8px hsl(0deg 0% 0% / 0.075), 0 16px 16px hsl(0deg 0% 0% / 0.075), 0 2px 2px hsl(0deg 0% 0% / 0.075), 0 4px 4px hsl(0deg 0% 0% / 0.075), 0 8px 8px hsl(0deg 0% 0% / 0.075), 0 16px 16px hsl(0deg 0% 0% / 0.075)",
  display: "flex",
  flexDirection: "column"
};

const nav: React.CSSProperties = {
  background: "#fdfdfd",
  padding: "5px 5px 0",
  borderRadius: "10px",
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  borderBottom: "1px solid #eeeeee",
  height: 44
};

const tabsStyles: React.CSSProperties = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  fontWeight: 500,
  fontSize: 14
};

const tabsContainer: React.CSSProperties = {
  ...tabsStyles,
  display: "flex",
  width: "100%"
};

const tab: React.CSSProperties = {
  ...tabsStyles,
  borderRadius: 5,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  width: "100%",
  padding: "10px 15px",
  position: "relative",
  background: "white",
  cursor: "pointer",
  height: 24,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flex: 1,
  minWidth: 0,
  userSelect: "none",
  color: "var(--black)"
};

const underline: React.CSSProperties = {
  position: "absolute",
  bottom: -2,
  left: 0,
  right: 0,
  height: 2,
  background: "var(--accent)"
};

const iconContainer: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flex: 1
};

const icon: React.CSSProperties = {
  fontSize: 128
};
