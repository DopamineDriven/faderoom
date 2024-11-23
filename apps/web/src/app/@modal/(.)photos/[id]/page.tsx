import Image from "next/image";
import { shimmer } from "@/lib/shimmer";
import { Modal } from "@/ui/modal";
import { imageObject } from "@/utils/__generated__/image-object";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return imageObject.data.map(v => {
    return { id: v.id };
  });
}
export default async function PhotoModal({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const photoId = (await params).id;
  const img = imageObject.data.find((img) => img.id.toString() === photoId);
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
