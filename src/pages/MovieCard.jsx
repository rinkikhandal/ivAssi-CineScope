import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, HeartOff, Info } from "lucide-react";
import styles from "./MovieCard.module.css";

const MovieCard = ({ movie, onRemove }) => {
   const [isFavorited, setIsFavorited] = useState(false);

   useEffect(() => {
      const stored = localStorage.getItem("favorites");
      const favorites = stored ? JSON.parse(stored) : [];
      setIsFavorited(favorites.some((m) => m.imdbID === movie.imdbID));
   }, [movie.imdbID]);

   const saveFavorite = () => {
      const stored = localStorage.getItem("favorites");
      let favorites = stored ? JSON.parse(stored) : [];

      const index = favorites.findIndex((m) => m.imdbID === movie.imdbID);

      if (index !== -1) {
         // Already favorited — remove it
         favorites.splice(index, 1);
         setIsFavorited(false);
      } else {
         // Not favorited — add it
         favorites.push(movie);
         setIsFavorited(true);
      }

      localStorage.setItem("favorites", JSON.stringify(favorites));
   };

   return (
      <div className={styles.card}>
         <div className={styles.poster}>
            <img src={movie.Poster} alt={movie.Title} />
            <span className={styles.year}>{movie.Year}</span>
         </div>
         <h3 title={movie.Title}>
            {movie.Title.length > 25
               ? movie.Title.slice(0, 25) + "..."
               : movie.Title}
         </h3>

         <div className={styles.actions}>
            <Link to={`/movie/${movie.imdbID}`}>
               <button className={styles.infoBtn}>
                  <Info size={16} /> More Info
               </button>
            </Link>
            {onRemove ? (
               <button
                  className={styles.removeBtn}
                  onClick={() => onRemove(movie.imdbID)}
               >
                  <HeartOff size={16} /> Remove
               </button>
            ) : (
               <button
                  onClick={saveFavorite}
                  className={`${styles.favoriteBtn} ${
                     isFavorited ? styles.active : ""
                  }`}
               >
                  <Heart size={16} fill={isFavorited ? "#fff" : "none"} />{" "}
                  {isFavorited ? "Favorited" : "Favorite"}
               </button>
            )}
         </div>
      </div>
   );
};

export default MovieCard;
