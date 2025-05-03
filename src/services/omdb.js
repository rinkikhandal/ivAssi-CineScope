export const searchMovies = async (title) => {
   const res = await fetch(
      `https://www.omdbapi.com/?apikey=${
         import.meta.env.VITE_OMDB_API_KEY
      }&s=${title}`
   );

   if (!res.ok) {
      throw new Error(`Failed to fetch movie with title ${title} `);
   }

   const data = await res.json();
   return data.Search || [];
};

export const getMovieDetails = async (id) => {
   const res = await fetch(
      `https://www.omdbapi.com/?apikey=${
         import.meta.env.VITE_OMDB_API_KEY
      }&i=${id}`
   );
   if (!res.ok) {
      throw new Error("Failed to fetch movieDetails");
   }
   const data = await res.json();
   return data;
};

export const getMoviesAndDramas = async ({ signal }) => {
   const res = await fetch(
      `https://www.omdbapi.com/?apikey=${
         import.meta.env.VITE_OMDB_API_KEY
      }&page=1`,
      { signal }
   );
   const data = await res.json();

   if (!res.ok) {
      throw new Error("Failed to fetch movies");
   }

   return data;
   // console.log(res);
};

export const getSimilarMovies = async (genre) => {
   const keyword = genre.split(",")[0].trim();
   const res = await fetch(
      `https://www.omdbapi.com/?apikey=${
         import.meta.env.VITE_OMDB_API_KEY
      }&s=${encodeURIComponent(keyword)}&type=movie`
   );

   if (!res.ok) throw new Error("Failed to fetch similar movies");

   const data = await res.json();
   return data.Search || [];
};
