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

  if (!movie) return <div>Уншиж байна...</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="movie-detail">
        <img
          src={movie.imageUrl}
          alt={movie.title}
          className="w-full h-64 object-cover rounded-md"
        />
        <h2 className="text-3xl font-bold mt-4">{movie.title}</h2>
        <p className="text-lg text-gray-700">{movie.description}</p>
        <Link
          href={movie.videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Шууд үзэх
        </Link>
      </div>
    </div>
  );
};

export default MovieDetail;
