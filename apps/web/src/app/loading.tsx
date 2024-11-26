import { LoadingDots } from "@/ui/loading/Dots";

export default function Loading() {
  return (
    <div className='mx-auto my-auto grid grid-cols-1 h-screen w-screen justify-center bg-current align-middle'>
      <LoadingDots />
    </div>
  );
}
