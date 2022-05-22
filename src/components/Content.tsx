import { useEffect, useState } from "react";
import { api } from "../services/api";
import { MovieCard } from "./MovieCard";

interface IGenreResponse {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface IMovie {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface ContentProps {
  selectedGenre: IGenreResponse
  selectedGenreId: number
}

export function Content({selectedGenre, selectedGenreId}:ContentProps) {

  const [movies, setMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    api.get<IMovie[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

  }, [selectedGenreId]);

  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  )
}