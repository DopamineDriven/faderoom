import Image from "next/image";
import { notFound } from "next/navigation";
import type { InferGSPRT } from "@/types/next";
import { shimmer } from "@/lib/shimmer";
import { imageObject } from "@/utils/__generated__/image-object";

export async function generateStaticParams() {
  return imageObject.data.map(v => {
    return { id: v.id.toString(10) };
  });
}
export default async function PhotoPage({
  params
}: InferGSPRT<typeof generateStaticParams>) {
  const photoId = (await params).id;
  const img = imageObject.data.find(img => img.id.toString(10) === photoId);
  if (!img) {
    notFound();
  }
  return (
    <div>
      <Image
        alt={"/womens-undercut.png"}
        src={img.relative_path}
        width={img.width}
        height={img.height}
        placeholder="blur"
        blurDataURL={shimmer([img.width, img.height])}
        className="object-cover"
      />
    </div>
  );
}
