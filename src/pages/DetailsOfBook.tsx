"use client";

import type React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetBookByIdQuery } from "../redux/api/baseApi";
import {
  BookOpen,
  Calendar,
  Edit,
  Hash,
  Users,
  Star,
  Clock,
} from "lucide-react";
import Loading from "../components/Loader";

interface Book {
  _id: string;
  title: string;
  author: string;
  description: string;
  isbn: string;
  createdAt: string;
  copies: number;
  genre: string;
  available: boolean;
}

const BookDetails: React.FC = () => {
  const urldata = useLocation();
  const id = urldata.pathname.split("/")[2];
  const { data, isError, isLoading } = useGetBookByIdQuery(id);
  const book: Book = data?.data;
  const navigate = useNavigate();

  const handleEdit = (id: string) => {
    navigate(`/edit-book/${id}`);
  };

  const handleBorrow = (id: string) => {
    navigate(`/borrow/${id}`);
  };

  if (isLoading) return <Loading />;
  if (isError) return <p className="text-red-400 text-3xl">book load failed</p>;

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Action Buttons */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => handleEdit(book?._id)}
            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Book
          </button>
          <button
            onClick={() => handleBorrow(book?._id)}
            disabled={!book?.available}
            className={`flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              book?.available
                ? "border border-green-300 text-green-700 bg-green-50 hover:bg-green-100 focus:ring-green-500"
                : "border border-gray-300 text-gray-400 bg-gray-50 cursor-not-allowed"
            }`}
          >
            {book?.available ? "Borrow Book" : "Not Available"}
          </button>
        </div>

        {/* Main Book Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl border-0 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-6">
            <div className="space-y-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                  {book?.title}
                </h1>
                <p className="text-xl text-slate-200 mt-2">by {book?.author}</p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < 4
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-400"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-slate-300">
                    4.2 (2,847 reviews)
                  </span>
                </div>

                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    book?.available
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : "bg-red-100 text-red-800 border border-red-200"
                  }`}
                >
                  {book?.available ? "Available" : "Not Available"}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-white/20 text-white border border-white/30">
                  {book?.genre}
                </span>
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-white/10 text-white border border-white/30">
                  {book?.copies} copies available
                </span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 space-y-6 bg-gray-200">
            {/* Description */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                {book?.description}
              </p>
            </div>

            {/* Separator */}
            <div className="border-t border-gray-200"></div>

            {/* Book Details Grid */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Book Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                    <Hash className="w-5 h-5 text-gray-500 mt-0.5" />
                    <div>
                      <span className="text-sm font-medium text-gray-600">
                        ISBN
                      </span>
                      <p className="font-mono text-sm text-gray-900">
                        {book?.isbn}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                    <Calendar className="w-5 h-5 text-gray-500 mt-0.5" />
                    <div>
                      <span className="text-sm font-medium text-gray-600">
                        Published
                      </span>
                      <p className="text-sm text-gray-900">{book?.createdAt}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                    <Users className="w-5 h-5 text-gray-500 mt-0.5" />
                    <div>
                      <span className="text-sm font-medium text-gray-600">
                        Genre
                      </span>
                      <p className="text-sm text-gray-900">{book?.genre}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                    <Clock className="w-5 h-5 text-gray-500 mt-0.5" />
                    <div>
                      <span className="text-sm font-medium text-gray-600">
                        Available Copies
                      </span>
                      <p className="text-sm text-gray-900">
                        {book?.copies} copies
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
