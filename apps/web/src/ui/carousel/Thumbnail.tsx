import type { FC, MouseEventHandler } from "react";
import Image from "next/image";
// import { shimmer } from "@/lib/shimmer";
import { cn } from "@/lib/utils";

export type ThumbnailProps = {
  image: {
    id: number;
    width: number;
    height: number;
    file_extension: string;
    relative_path: string;
    url: string;
  };
  selected: boolean;
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
  key: string | number | bigint;
  index: number;
};

export const Thumbnail: FC<ThumbnailProps> = ({
  image,
  selected,
  onClick,
  key,
  index
}) => {
  return (
    <button
      key={key}
      onClick={onClick}
      aria-current={selected}
      aria-label={`View ${image.id}`}
      className={cn(
        "relative aspect-[4/3] w-20 min-w-0 flex-[0_0_auto] overflow-hidden rounded-md transition-all",
        selected === true
          ? "opacity-100 ring-2 ring-fr-300"
          : "opacity-60 hover:opacity-80"
      )}>
      <Image
        src={image.url}
        alt={image.relative_path}
        fill
        loading="lazy"
        className="object-cover"
        // width={image.width}
        // height={image.height}
        // placeholder="blur"
        // blurDataURL={shimmer([image.width, image.height])}
      />
      <div className="absolute bottom-2 right-2 rounded rounded-tl-sm bg-black/50 px-[0.0625rem] py-[0.03125rem] text-xxs tracking-tight text-white">
        {index + 1}
      </div>
    </button>
  );
};
