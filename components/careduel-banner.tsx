import Link from "next/link";

export default function CareDuelBanner() {
  return (
    <div className="bg-gray-50 border-2 border-[#E91E63] rounded-lg shadow-lg p-6 mb-8 transform transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
      <Link
        href="https://careduel.com/topic-of-the-week"
        target="_blank"
        rel="noopener noreferrer"
        className="block text-center font-serif text-[#E91E63] text-lg relative group"
        style={{ fontFamily: "Lora, serif", fontSize: "18px" }}
      >
        <span className="relative inline-block group-hover:underline decoration-[#E91E63] underline-offset-4">
          Topic of the Week
        </span>
      </Link>
    </div>
  );
}
