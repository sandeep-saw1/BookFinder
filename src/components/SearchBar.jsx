import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [searchBy, setSearchBy] = useState("title"); // title | author | subject

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    onSearch({ query: q, searchBy, page: 1 });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col sm:flex-row gap-3 sm:gap-0 sm:items-center"
    >
      <div className="flex flex-col sm:flex-row w-full sm:w-3/4">
        {/* Dropdown */}
        <select
          value={searchBy}
          onChange={(e) => setSearchBy(e.target.value)}
          className="sm:rounded-l-xl rounded-md cursor-pointer border border-gray-300 px-3 py-2 bg-white mb-2 sm:mb-0"
        >
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="subject">Subject</option>
        </select>

        {/* Input */}
        <input
          type="text"
          placeholder={`Search by ${searchBy}...`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border border-gray-300 px-4 py-2 outline-none rounded-md sm:rounded-none sm:border-t sm:border-b"
        />
      </div>

      {/* Button */}
      <button
        type="submit"
        className="rounded-md cursor-pointer sm:rounded-r-xl bg-indigo-600 text-white px-5 py-2 font-medium hover:bg-indigo-700 w-full sm:w-auto"
      >
        Search
      </button>
    </form>
  );
}
