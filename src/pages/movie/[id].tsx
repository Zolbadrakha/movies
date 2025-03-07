import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

interface Movie {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  videoUrl: string;
}

const MovieDetail: React.FC = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;

    const fetchMovie = async () => {
      const response = await axios.get<Movie>(`/api/movies/${id}`);
      setMovie(response.data);
    };
    fetchMovie();
  }, [id]);

  if (!movie)
    return (
      <div className="text-white text-center text-2xl mt-20">
        Уншиж байна...
      </div>
    );

  return (
    <div className="relative bg-black min-h-screen text-white">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0">
        <img
          src={movie.imageUrl}
          alt={movie.title}
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      {/* Movie Content */}
      <div className="relative z-10 container mx-auto px-6 py-20 flex flex-col md:flex-row items-center">
        {/* Movie Poster */}
        <div className="w-full md:w-1/3">
          <img
            src={movie.imageUrl}
            alt={movie.title}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Movie Details */}
        <div className="w-full md:w-2/3 md:ml-10 mt-6 md:mt-0">
          <h2 className="text-4xl font-bold">{movie.title}</h2>
          <p className="text-lg text-gray-300 mt-4">{movie.description}</p>

          {/* Watch Button */}
          <Link
            href={movie.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block bg-red-600 text-white font-bold py-3 px-6 rounded-md text-lg hover:bg-red-700 transition"
          >
            ▶ Шууд үзэх
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
