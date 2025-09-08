export default function Loader() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl p-3 shadow animate-pulse">
          <div className="h-56 w-full bg-gray-200 rounded-xl" />
          <div className="mt-3 h-5 bg-gray-200 rounded" />
          <div className="mt-2 h-4 w-3/5 bg-gray-200 rounded" />
        </div>
      ))}
    </div>
  );
}
