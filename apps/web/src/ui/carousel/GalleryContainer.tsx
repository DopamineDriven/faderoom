"use client";

import React, { PropsWithChildren } from "react";
import { Camera } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/map/ui/Card";


export const GalleryContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Card className="border-cta-border w-full overflow-hidden bg-zinc-800/50 bg-opacity-50 text-zinc-100">
      <CardHeader className="">
        <CardTitle className="flex items-center text-2xl font-bold text-[hsl(46,58%,63%)] sm:text-3xl">
          <Camera className="mr-2" /> Gallery
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">{children}</CardContent>
    </Card>
  );
};
