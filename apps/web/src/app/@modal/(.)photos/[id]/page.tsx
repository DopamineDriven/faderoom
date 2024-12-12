import Image from "next/image";
import { notFound } from "next/navigation";
import { shimmer } from "@/lib/shimmer";
import { Modal } from "@/ui/modal/WIthFramer";
import { imageData as imageObject } from "@/utils/__generated__/image-object";

export default async function PhotoModal({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const idA = (await params).id;
  const img = imageObject.data.find(({ id }) => id.toString(10) === idA);
  if (!img) {
    notFound();
  }
  return (
    <Modal>
      <Image
        alt={`/booksy/images/${img.id}.jpeg`}
        src={img.url}
        width={img.width}
        height={img.height}
        placeholder="blur"
        blurDataURL={shimmer([img.width, img.height])}
        className="object-cover"
        loading="eager"
      />
    </Modal>
  );
}
