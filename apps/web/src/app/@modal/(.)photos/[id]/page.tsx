import Image from "next/image";
import { notFound } from "next/navigation";
import { shimmer } from "@/lib/shimmer";
import { Modal } from "@/ui/modal";
import { imageData as imageObject } from "@/utils/__generated__/image-object";

export default function PhotoModal({params}: {params: {id: string;}}) {

  const img = imageObject.data.find(img => img.id.toString(10) === params.id);
  if (!img) {
    notFound();
  }
  return (
    <Modal>
      <Image
        alt={"/womens-undercut.png"}
        src={img.url}
        width={img.width}
        height={img.height}
        placeholder="blur"
        blurDataURL={shimmer([img.width, img.height])}
        className="object-cover"
      />
    </Modal>
  );
}
