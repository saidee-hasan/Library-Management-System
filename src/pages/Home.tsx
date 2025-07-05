import { useNavigate } from "react-router-dom";
import { useGetBooksQuery } from "../redux/api/baseApi";
import type { IBook } from "../types";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Header from "../components/Header";
import cover from "../assets/cover.jpg";


const genres = ["", "FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"];

const Home = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const limit = 8;

  const { data, isLoading, isError } = useGetBooksQuery({ limit });
  const books = data?.data || [];

  const filteredBooks = books.filter((book: IBook) => {
    return (
      (book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase())) &&
      (filter === "" || book.genre === filter)
    );
  });

  const paginatedBooks = filteredBooks.slice((page - 1) * limit, page * limit);
  const totalPages = Math.ceil(filteredBooks.length / limit);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4">
        {Array(8).fill(0).map((_, i) => (
          <div key={i} className="bg-white animate-pulse h-72 rounded shadow p-4"></div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-600 mt-8">Failed to load books.</div>
    );
  }

  return (
    <div className="mx-auto ">
      <Header/>
      <h1 className="text-3xl font-bold mb-6 text-center font-primary ">
        All Books
      </h1>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 md:px-4">
        <input
          type="text"
          placeholder="Search by title or author"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-2 rounded px-4 py-2 w-full sm:w-64"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border-2 rounded px-4 py-2 w-full sm:w-48"
        >
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre === "" ? "All Genres" : genre}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedBooks.map((book: IBook) => (
          <div
            key={book._id}
            onClick={() => navigate(`/book/${book._id}`)}
            className="bg-gray-100 cursor-pointer rounded-lg shadow-md p-4 hover:shadow-xl transition flex flex-col h-full transform hover:scale-105"
          >
            <div className="relative">
              <img
                src={cover}
                alt={book.title}
                className="h-48 w-full object-cover mb-2 rounded"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = cover;
                }}
              />
              <span
                className={`absolute top-2 right-2 text-white text-xs px-3 py-1 rounded-full shadow font-semibold ${
                  book.genre === "FICTION"
                    ? "bg-blue-700"
                    : book.genre === "NON_FICTION"
                    ? "bg-gray-700"
                    : book.genre === "SCIENCE"
                    ? "bg-green-600"
                    : book.genre === "HISTORY"
                    ? "bg-yellow-600"
                    : book.genre === "BIOGRAPHY"
                    ? "bg-orange-600"
                    : book.genre === "FANTASY"
                    ? "bg-purple-700"
                    : "bg-purple-400"
                }`}
              >
                {book.genre}
              </span>
            </div>

            <h2 className="text-xl font-semibold mb-1 font-primary">
              {book.title}
            </h2>
            <p className="text-gray-600 text-sm">Author: {book.author}</p>
            <p className="text-gray-500 text-sm">ISBN: {book.isbn}</p>
            <div className="mt-2 flex justify-between items-center">
              <span className="text-xs text-gray-500">Copies: {book.copies}</span>
              <span
                className={`text-xs font-semibold ${
                  book.available && book.copies > 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {book.available && book.copies > 0 ? "Available" : "Unavailable"}
              </span>
            </div>
            <div className="mt-auto pt-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/borrow/${book._id}`);
                }}
                className="w-full bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700"
              >
                Borrow
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="mt-8 flex justify-center items-center gap-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
         <ChevronLeft/>
        </button>
        <span className="text-sm">Page {page} of {totalPages}</span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
         <ChevronRight/>
        </button>
      </div>
    </div>
  );
};

export default Home;
