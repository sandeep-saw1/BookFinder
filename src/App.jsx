import { useEffect, useMemo, useState } from "react";
import SearchBar from "./components/SearchBar";
import BookCard from "./components/BookCard";
import Pagination from "./components/Pagination";
import Loader from "./components/Loader";
import book from '../public/book.jpg'

const PER_PAGE = 20;

export default function App() {
  const [query, setQuery] = useState("");
  const [searchBy, setSearchBy] = useState("title"); 
  const [page, setPage] = useState(1);

  const [books, setBooks] = useState([]);
  const [numFound, setNumFound] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // build api url
  const apiUrl = useMemo(() => {
    if (!query) return null;
    const params = new URLSearchParams();
    params.set(searchBy, query);
    params.set("page", String(page));
    params.set("fields", "title,author_name,cover_i,first_publish_year,key");
    params.set("limit", String(PER_PAGE));
    return `https://openlibrary.org/search.json?${params.toString()}`;
  }, [query, searchBy, page]);

  // fetch books
  useEffect(() => {
    if (!apiUrl) return;
    let abort = false;

    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error("Network error");
        const data = await res.json();
        if (abort) return;

        setBooks(Array.isArray(data.docs) ? data.docs : []);
        setNumFound(Number.isFinite(data.numFound) ? data.numFound : 0);
      } catch (e) {
        if (!abort) setError("Something went wrong. Please try again.");
      } finally {
        if (!abort) setLoading(false);
      }
    };

    fetchBooks();
    return () => { abort = true; };
  }, [apiUrl]);

  const totalPages = Math.max(1, Math.ceil(numFound / PER_PAGE));
  const visible = books.slice(0, PER_PAGE);

  const handleSearch = ({ query, searchBy, page }) => {
    setQuery(query);
    setSearchBy(searchBy);
    setPage(page);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <img src={book} className="h-10 w-10 rounded-full border border-black"/>
            <h1 className="text-2xl sm:text-3xl font-bold text-indigo-600">BookFinder</h1>
            <p className="text-sm text-gray-600">
              Search books by title, author, or subject using OpenLibrary.
            </p>
          </div>
          <SearchBar onSearch={handleSearch} />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto px-4 py-6 w-full">
        {!query && (
          <div className="text-center text-gray-600 mt-12 text-sm sm:text-base">
            Start by typing a query above — e.g. <b>Harry Potter</b>, <b>Chetan Bhagat</b>, or <b>science</b>.
          </div>
        )}

        {error && (
          <div className="mt-6 bg-red-50 text-red-700 border border-red-200 rounded-xl p-3">
            {error}
          </div>
        )}

        {loading ? (
          <Loader />
        ) : (
          <>
            {query && numFound === 0 && (
              <div className="text-center text-gray-600 mt-8">No books found.</div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {visible.map((b) => (
                <BookCard key={b.key} book={b} />
              ))}
            </div>

            {query && numFound > 0 && (
              <>
                <div className="mt-4 text-sm text-gray-600">
                  Showing <b>{visible.length}</b> of approx <b>{numFound}</b> results.
                </div>
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  onPrev={() => setPage((p) => Math.max(1, p - 1))}
                  onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
                />
              </>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-4 text-center text-xs text-gray-500">
        Data by <span className="font-semibold">OpenLibrary</span> • Built by{" "}
        <span className="font-semibold text-indigo-600">Sandeep</span>
      </footer>
    </div>
  );
}
