import MyChatComponent from "@/components/MyChatComponent";
import { auth } from "@clerk/nextjs";
import { Undo2 } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth();
  const isAuth = !!userId;
  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-rose-50 to-emerald-100">
      <Link
        href={"/"}
        className="absolute top-1/3 right-0 -translate-x-1/2 -translate-y-1/2"
      >
        <Undo2 />
      </Link>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4">
        <div className="flex flex-col items-center text-center">
          <MyChatComponent chatId={0} />
        </div>
      </div>
    </div>
  );
}
