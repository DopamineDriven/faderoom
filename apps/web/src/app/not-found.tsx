import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-white font-basis-grotesque-pro-medium text-2xl tracking-tight text-fr-300">
      <p>Could not find requested resource</p>
      <p>
        Return{" "}
        <Link href="/" scroll={false}>
          Home
        </Link>
      </p>
    </div>
  );
}
