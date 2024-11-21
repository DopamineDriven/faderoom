import Image from "next/image";
import { shimmer } from "@/lib/shimmer";
import { Modal } from "@/ui/modal";

export default async function PhotoModal({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const photoId = (await params).id;
  return (
    <Modal>
      <Image
        alt={"/womens-undercut.png"}
        src={`/booksy/images/${photoId}.jpeg`}
        width={1170}
        height={300}
        placeholder="blur"
        blurDataURL={shimmer([1170, 1170])}
        className="object-cover"
      />
    </Modal>
  );
}
