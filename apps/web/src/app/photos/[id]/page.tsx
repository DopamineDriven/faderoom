import Image from "next/image";
import { notFound } from "next/navigation";
import { shimmer } from "@/lib/shimmer";
import { imageData as imageObject } from "@/utils/__generated__/image-object";


export default async function PhotoPage({params}: {params: Promise<{id: string;}>}) {
  const photoId = (await params).id;
  const img = imageObject.data.find(img => img.id.toString(10) === photoId);
  if (!img) {
    notFound();
  }
  return (
    <div className="">
      <Image
        alt={"/womens-undercut.png"}
        src={img.url}
        width={img.width}
        height={img.height}
        placeholder="blur"
        blurDataURL={shimmer([img.width, img.height])}
        className="object-cover"
      />
    </div>
  );
}
