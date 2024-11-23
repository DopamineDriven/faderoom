import Image from "next/image";
import { notFound } from "next/navigation";
import { shimmer } from "@/lib/shimmer";
import { imageObject } from "@/utils/__generated__/image-object";

export function generateStaticParams() {
  return imageObject.data.map(v => {
    return { id: v.id };
  });
}
export default async function PhotoPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const photoId = (await params).id;
  const img = imageObject.data.find(img => img.id.toString() === photoId);
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
