export default function Pagination({ page, totalPages, onPrev, onNext }) {
  if (!totalPages || totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-3 mt-6">
      <button
        onClick={onPrev}
        disabled={page <= 1}
        className="px-4 py-2 rounded-lg border bg-white disabled:opacity-50"
      >
        ← Prev
      </button>
      <span className="text-sm">
        Page <b>{page}</b> of <b>{totalPages}</b>
      </span>
      <button
        onClick={onNext}
        disabled={page >= totalPages}
        className="px-4 py-2 rounded-lg border bg-white disabled:opacity-50"
      >
        Next →
      </button>
    </div>
  );
}
