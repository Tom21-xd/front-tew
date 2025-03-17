import { cn } from "@/lib/utils";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import Map from "@/components/Map";

export default function Home() {
  return (
    <main className="relative flex items-center justify-center h-full w-full bg-black overflow-hidden">
      <InteractiveGridPattern
        className={cn(
          "absolute inset-0 w-full h-full",
          "skew-y-6 opacity-40"
        )}
        width={60}
        height={60}
        squares={[30, 30]}
        squaresClassName="hover:fill-blue-500"
      />
      <div className="relative z-10 w-full max-w-4xl h-full flex items-center justify-center">
        <Map className="w-full h-[500px] max-h-full" />
      </div>
    </main>
  );
}
