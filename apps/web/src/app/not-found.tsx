import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-white text-fr-300 font-basis-grotesque-pro-medium tracking-tight text-2xl">
      <p>Could not find requested resource</p>
      <p>
        Return <Link href='/' scroll={false}>Home</Link>
      </p>
    </div>
  );
}
