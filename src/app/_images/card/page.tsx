import { Badge } from "@/components/badge";
import { DATA } from "@/data/resume";

export default function Logo() {
  return (
    <div className="flex flex-col gap-10 justify-center items-center relative bg-gradient-to-br from-blue-950 to-slate-900 font-sans w-[2400px] h-[1260px]">
        <h1 className="text-slate-200 font-bold text-8 text-9xl">{DATA.name}</h1>
        <Badge className="text-6xl px-14 py-8">{DATA.role}</Badge>
    </div>
  );
}