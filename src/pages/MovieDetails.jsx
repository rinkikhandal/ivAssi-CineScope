import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, getSimilarMovies } from "../services/omdb";
import MovieCard from "./MovieCard"; // ✅ Reusing the component
import styles from "./MovieDetails.module.css";

const MovieDetails = () => {
   const { id } = useParams();
   const [movie, setMovie] = useState(null);
   const [similar, setSimilar] = useState([]);

   useEffect(() => {
      const fetchDetails = async () => {
         const data = await getMovieDetails(id);
         setMovie(data);

         // Fetch similar movies
         if (data?.Genre) {
            try {
               const similarData = await getSimilarMovies(data.Genre);
               const filtered = similarData.filter(
                  (m) => m.imdbID !== data.imdbID
               );
               setSimilar(filtered.slice(0, 8)); // limit to 8 results
            } catch (err) {
               console.error("Error fetching similar movies:", err);
            }
         }
      };

      fetchDetails();
   }, [id]);

   if (!movie) return <div className={styles.loader}>Loading...</div>;

   return (
      <div className={styles.container}>
         {/* Hero Section */}
         <div className={styles.hero}>
            <img
               src={movie.Poster}
               alt={movie.Title}
               className={styles.heroImage}
            />
            <div className={styles.overlay}>
               <div className={styles.detailsContainer}>
                  <h1 className={styles.title}>{movie.Title}</h1>
                  <div className={styles.meta}>
                     <p>
                        <strong>Year:</strong> {movie.Year}
                     </p>
                     <p>
                        <strong>Genre:</strong> {movie.Genre}
                     </p>
                     <p>
                        <strong>Director:</strong> {movie.Director}
                     </p>
                     <p>
                        <strong>IMDb Rating:</strong> {movie.imdbRating}
                     </p>
                     <p>
                        <strong>Runtime:</strong> {movie.Runtime}
                     </p>
                  </div>
                  <p className={styles.plot}>
                     <strong>Plot:</strong> {movie.Plot}
                  </p>
               </div>
            </div>
         </div>

         {/* Similar Movies Section */}
         {similar.length > 0 && (
            <section className={styles.similarMovies}>
               <div className={styles.similarMoviesContainer}>
                  <h2 className={styles.similarTitle}>Similar Movies</h2>
                  <div className={styles.similarMovieCards}>
                     {similar.map((movie) => (
                        <MovieCard key={movie.imdbID} movie={movie} />
                     ))}
                  </div>
               </div>
            </section>
         )}
      </div>
   );
};

export default MovieDetails;
