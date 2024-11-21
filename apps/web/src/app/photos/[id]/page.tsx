import Image from "next/image";
import { shimmer } from "@/lib/shimmer";
import { imageTuple } from "@/utils/__generated__/image-tuples";

export function generateStaticParams() {
  return imageTuple["imgIdAndPathTuple"].map(v => {
    return { id: v[0] };
  });
}
export default async function PhotoPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return (
    <div className="card">
      {" "}
      <Image
        alt={"/womens-undercut.png"}
        src={`/booksy/images/${id}.jpeg`}
        width={1170}
        height={300}
        placeholder="blur"
        blurDataURL={shimmer([1170, 1170])}
        className="object-cover"
      />
    </div>
  );
}
