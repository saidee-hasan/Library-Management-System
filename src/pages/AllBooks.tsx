import { useState } from "react";
import { useNavigate } from "react-router";
import { useDeleteBookMutation, useGetBooksQuery } from "../redux/api/baseApi";
import type { IBook } from "../types";
import { ChevronLeft, ChevronRight, Edit, ScanEye, Trash2 } from "lucide-react";
import Loader from "../components/Loader";
import { toast } from "sonner";

const genres = [
  "ALL",
  "FICTION",
  "NON_FICTION",
  "SCIENCE",
  "HISTORY",
  "BIOGRAPHY",
  "FANTASY",
];
const ITEMS_PER_PAGE = 10;

const AllBooks = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetBooksQuery({});
  const allBooks = data?.data || [];
  const [deleteBook] = useDeleteBookMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [genreFilter, setGenreFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredBooks = allBooks.filter((book: IBook) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.isbn.includes(searchTerm);
    const matchesGenre = genreFilter === "ALL" || book.genre === genreFilter;
    return matchesSearch && matchesGenre;
  });

  const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE);
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleEdit = (id: string) => navigate(`/edit-book/${id}`);
  const handleBorrow = (id: string) => navigate(`/borrow/${id}`);
  const handleView = (id: string) => navigate(`/book/${id}`);

  const handleDelete = async (id: string) => {
    toast("Are you sure you want to delete this book?", {
      action: {
        label: "Confirm",
        onClick: async () => {
          try {
            await deleteBook(id).unwrap();
            toast.success("Book deleted successfully!");
          } catch (err) {
            toast.error("Failed to delete book.");
            console.error("Delete error:", err);
          }
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => toast("Deletion cancelled."),
      },
    });
  };

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <div className="text-center text-red-600 mt-8">Failed to load books.</div>
    );

  return (
    <div className="mx-auto max-w-6xl py-8">
      <h1 className="text-3xl font-bold mb-6 text-center font-primary">
        All Books
      </h1>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by title, author, or ISBN"
          className="border-2 px-4 py-2 rounded w-full md:w-1/4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border-2 px-4 py-2 rounded w-full md:w-1/4"
          value={genreFilter}
          onChange={(e) => setGenreFilter(e.target.value)}
        >
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded shadow">
        <table className="min-w-full divide-y divide-gray-200 bg-white odd:bg-gray-100">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Title
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Author
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Genre
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                ISBN
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold">
                Copies
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold">
                Availability
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {paginatedBooks.length > 0 ? (
              paginatedBooks.map((book: IBook) => (
                <tr key={book._id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-2">{book.title}</td>
                  <td className="px-4 py-2">{book.author}</td>
                  <td className="px-4 py-2">{book.genre}</td>
                  <td className="px-4 py-2">{book.isbn}</td>
                  <td className="px-4 py-2 text-center">{book.copies}</td>
                  <td
                    className={`px-4 py-2 text-center font-medium ${
                      book.available && book.copies > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {book.available && book.copies > 0
                      ? "Available"
                      : "Unavailable"}
                  </td>
                  <td className="px-4 py-2 text-center space-x-2">
                    <button
                      onClick={() => handleView(book._id!)}
                      className="text-yellow-500 hover:text-yellow-700"
                    >
                      <ScanEye />
                    </button>
                    <button
                      onClick={() => handleEdit(book._id!)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Edit />
                    </button>
                    <button
                      onClick={() => handleDelete(book._id!)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 />
                    </button>
                    <button
                      onClick={() => handleBorrow(book._id!)}
                      className="bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700"
                    >
                      Borrow
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                  No books found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-4 py-1 border rounded disabled:opacity-50"
        >
          <ChevronLeft />
        </button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-4 py-1 border rounded disabled:opacity-50"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default AllBooks;
