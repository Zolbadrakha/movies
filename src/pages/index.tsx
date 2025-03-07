import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";

interface Movie {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  videoUrl: string;
}

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get<Movie[]>("/api/movies");
      setMovies(response.data);
    };
    fetchMovies();
  }, []);

  // Function to handle search
  const handleSearch = async () => {
    const response = await axios.get<Movie[]>(
      `/api/movies?search=${searchQuery}`
    );
    setMovies(response.data);
  };

  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector("nav");
      if (window.scrollY > 50) {
        nav?.classList.add("scrolled");
      } else {
        nav?.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="container mx-auto p-6">
      {/* Navbar */}
      <nav className="flex justify-between items-center shadow-md px-6 py-4">
        {/* Logo */}
        <Link href="/">
          <img
            src="https://loodibee.com/wp-content/uploads/Netflix-logo.png"
            alt="Logo"
            className="h-16 cursor-pointer"
          />
        </Link>

        {/* Search Box */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Хайх..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Хайх
          </button>
        </div>
      </nav>

      {/* Movie List */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-16 bg-gray-400">
        {movies.map((movie) => (
          <div
            key={movie._id}
            className="movie-card p-4 border rounded-lg shadow-lg bg-white dark:bg-gray-800"
          >
            <Image
              src={movie.imageUrl}
              alt={movie.title}
              className="w-full h-48 object-cover rounded-lg"
            />
            <h2 className="text-lg font-semibold mt-2 text-gray-800 dark:text-gray-300">
              {movie.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {movie.description}
            </p>
            <Link href={`/movie/${movie._id}`}>
              <div className="text-blue-500 dark:text-blue-400 mt-2 block font-semibold hover:underline">
                Үзэх
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
