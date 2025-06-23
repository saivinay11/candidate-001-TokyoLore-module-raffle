import Link from "next/link";
import { Trophy, Sparkles } from "lucide-react";

export default function AwardsPanels() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
      <Link
        href="https://top216.com/vote"
        target="_blank"
        rel="noopener noreferrer"
        className="group bg-white border border-[#424242] rounded-lg p-6 shadow-lg hover:border-[#E91E63] transition-all duration-300 flex items-center hover:shadow-xl transform hover:-translate-y-1"
      >
        <Trophy
          className="text-[#424242] mr-4 flex-shrink-0 group-hover:text-[#E91E63] transition-colors duration-300"
          size={28}
        />
        <span
          className="font-serif text-xl text-[#424242] group-hover:text-[#E91E63] transition-colors duration-300"
          style={{ fontFamily: "Playfair Display, serif", fontSize: "20px" }}
        >
          Vote Top216
        </span>
      </Link>

      <Link
        href="https://thetop36.com/highlights"
        target="_blank"
        rel="noopener noreferrer"
        className="group bg-white border border-[#424242] rounded-lg p-6 shadow-lg hover:border-[#E91E63] transition-all duration-300 flex items-center hover:shadow-xl transform hover:-translate-y-1"
      >
        <Sparkles
          className="text-[#424242] mr-4 flex-shrink-0 group-hover:text-[#E91E63] transition-colors duration-300"
          size={28}
        />
        <span
          className="font-serif text-xl text-[#424242] group-hover:text-[#E91E63] transition-colors duration-300"
          style={{ fontFamily: "Playfair Display, serif", fontSize: "20px" }}
        >
          Explore TheTop36
        </span>
      </Link>
    </div>
  );
}
