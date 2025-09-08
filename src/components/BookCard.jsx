function coverUrl(cover_i) {
  return cover_i
    ? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`
    : "https://placehold.co/300x450?text=No+Cover";
}

export default function BookCard({ book }) {
  const authors = book.author_name?.join(", ") || "Unknown author";
  const year = book.first_publish_year ? `• ${book.first_publish_year}` : "";

  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-md transition p-3 flex flex-col">
      <img
        src={coverUrl(book.cover_i)}
        alt={book.title}
        className="w-full h-56 object-cover rounded-xl"
        loading="lazy"
      />
      <div className="mt-3 flex-1">
        <h3 className="font-semibold line-clamp-2">{book.title}</h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-1">
          {authors} {year}
        </p>
      </div>

      <a
        href={`https://openlibrary.org${book.key}`}
        target="_blank"
        rel="noreferrer"
        className="mt-3 text-center text-sm bg-indigo-50 text-indigo-700 rounded-xl py-2 hover:bg-indigo-100"
      >
        View on OpenLibrary
      </a>
    </div>
  );
}
