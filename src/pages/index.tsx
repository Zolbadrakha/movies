import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

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
        nav?.classList.add("bg-black", "shadow-lg");
      } else {
        nav?.classList.remove("bg-black", "shadow-lg");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 w-full flex justify-between items-center px-6 py-4 transition-all duration-300 bg-black shadow-lg">
        {/* Logo */}
        <Link href="/">
          <img
            src="https://loodibee.com/wp-content/uploads/Netflix-logo.png"
            alt="Logo"
            className="h-12 cursor-pointer"
          />
        </Link>

        {/* Search Box */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Хайх..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-800 text-black border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            onClick={handleSearch}
            className="bg-red-600 text-black px-4 py-2 rounded-md hover:bg-red-700 transition"
          >
            Хайх
          </button>
        </div>
      </nav>

      {/* Movie List */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-16 px-16">
        {movies.map((movie) => (
          <div
            className="flex flex-col items-center group mt-8"
            key={movie._id}
          >
            <Link href={`/movie/${movie._id}`}>
              <div className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer transition transform group-hover:scale-105">
                <img
                  src={movie.imageUrl}
                  alt={movie.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                  <p className="text-white font-bold text-lg">{movie.title}</p>
                </div>
              </div>
            </Link>
            <div>
              <p className="font-semibold text-center mt-2 text-white">
                {movie.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
