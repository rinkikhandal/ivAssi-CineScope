import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import styles from "./Favorites.module.css";

const Favorites = () => {
   const [favorites, setFavorites] = useState([]);

   useEffect(() => {
      const stored = localStorage.getItem("favorites");
      if (stored) setFavorites(JSON.parse(stored));
   }, []);

   const removeFavorite = (id) => {
      const updated = favorites.filter((movie) => movie.imdbID !== id);
      setFavorites(updated);
      localStorage.setItem("favorites", JSON.stringify(updated));
   };

   return (
      <section className={styles.favorites}>
         <h1>🎞️ Favorite Movies</h1>
         {favorites.length === 0 ? (
            <p
               style={{ textAlign: "center", marginTop: "2rem", color: "#ccc" }}
            >
               No favorites added yet. Go explore and mark some!
            </p>
         ) : (
            <div className={styles.grid}>
               {favorites.map((movie) => (
                  <MovieCard
                     key={movie.imdbID}
                     movie={movie}
                     onRemove={removeFavorite}
                  />
               ))}
            </div>
         )}
      </section>
   );
};

export default Favorites;
