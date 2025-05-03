import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { getMoviesAndDramas, searchMovies } from "../services/omdb";

const Home = () => {
   const [query, setQuery] = useState("");
   const [movies, setMovies] = useState([]);
   const [loading, setLoading] = useState(false);

   const handleSearch = async () => {
      if (!query.trim()) return;
      setLoading(true);
      const results = await searchMovies(query);
      setMovies(results);
      setLoading(false);
   };

   const fetchMovies = async (signal) => {
      setLoading(true);
      const results = await getMoviesAndDramas({ signal });
      setMovies(results);
      setLoading(false);
   };

   useEffect(() => {
      const controller = new AbortController();
      fetchMovies(controller.signal);
      return () => controller.abort();
   }, []);

   return (
      <div className="min-h-screen text-white px-6 py-12 relative overflow-hidden">
         {/* Optional Light Overlay */}
         <div className="absolute inset-0  pointer-events-none z-0" />

         <div className="max-w-6xl mx-auto relative z-10">
            <h1 className="text-5xl sm:text-6xl font-extrabold text-center mb-12 tracking-tight text-blue-500 drop-shadow-md transition-all duration-300 hover:scale-105">
               🎬 Movie Search
            </h1>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">
               <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                     if (e.key === "Enter") {
                        handleSearch();
                     }
                  }}
                  placeholder="Search by movie title..."
                  className="w-full sm:w-96 px-5 py-3 rounded-lg bg-white/10 backdrop-blur-md text-white placeholder-gray-300 border border-gray-600 shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
               />

               <button
                  onClick={handleSearch}
                  className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-lg text-white font-semibold shadow-lg"
               >
                  Search
               </button>
            </div>

            {loading ? (
               <div className="text-center text-xl text-gray-400 mt-10">
                  Loading...
               </div>
            ) : (
               <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {movies.length > 0 ? (
                     movies.map((movie) => (
                        <MovieCard key={movie.imdbID} movie={movie} />
                     ))
                  ) : (
                     <p className="text-center w-full col-span-full text-lg text-gray-400">
                        No movies found. Try a different search.
                     </p>
                  )}
               </div>
            )}
         </div>
      </div>
   );
};

export default Home;
