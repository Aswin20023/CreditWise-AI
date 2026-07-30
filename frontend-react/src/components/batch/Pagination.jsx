import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Pagination({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4">

      <div className="text-sm text-gray-500">
        Page
        <span className="font-semibold text-gray-800 mx-2">
          {currentPage}
        </span>
        of
        <span className="font-semibold text-gray-800 mx-2">
          {Math.max(totalPages, 1)}
        </span>
      </div>

      <div className="flex items-center gap-3">

        <button
          onClick={onPrevious}
          disabled={currentPage === 1}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          <ChevronLeft size={18} />
          Previous
        </button>

        <button
          onClick={onNext}
          disabled={
            currentPage === totalPages ||
            totalPages === 0
          }
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          Next
          <ChevronRight size={18} />
        </button>

      </div>

    </div>
  );
}