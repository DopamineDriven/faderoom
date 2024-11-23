import Image from "next/image";
import { notFound } from "next/navigation";
import { shimmer } from "@/lib/shimmer";
import { Modal } from "@/ui/modal";
import { imageObject } from "@/utils/__generated__/image-object";
import type { InferGSPRT } from "@/types/next";

export async function generateStaticParams() {
  return imageObject.data.map(v => {
    return { id: v.id.toString(10) };
  });
}
export default async function PhotoModal({
  params
}: InferGSPRT<typeof generateStaticParams>) {
  const photoId = (await params).id;
  const img = imageObject.data.find(img => img.id.toString(10) === photoId);
  if (!img) {
    notFound();
  }
  return (
    <Modal>
      <Image
        alt={"/womens-undercut.png"}
        src={img.relative_path}
        width={img.width}
        height={img.height}
        placeholder="blur"
        blurDataURL={shimmer([img.width, img.height])}
        className="object-cover"
      />
    </Modal>
  );
}
