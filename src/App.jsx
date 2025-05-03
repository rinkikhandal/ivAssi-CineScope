import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import styles from "./App.module.css";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import MovieDetails from "./pages/MovieDetails";

const App = () => {
   const location = useLocation(); // Hook to get current route
   const [activeLink, setActiveLink] = useState("/");

   useEffect(() => {
      setActiveLink(location.pathname); // Update activeLink on route change
   }, [location]);

   return (
      <div className={styles.container}>
         <nav className={styles.navbar}>
            <div className={styles.logo}>
               <Link
                  to="/"
                  className={activeLink === "/" ? styles.active : ""}
                  onClick={() => setActiveLink("/")}
               >
                  🎬 CineScope
               </Link>
            </div>
            <div className={styles.links}>
               <Link
                  to="/"
                  className={activeLink === "/" ? styles.active : ""}
                  onClick={() => setActiveLink("/")}
               >
                  Home
               </Link>
               <Link
                  to="/favorites"
                  className={activeLink === "/favorites" ? styles.active : ""}
                  onClick={() => setActiveLink("/favorites")}
               >
                  Favorites
               </Link>
            </div>
         </nav>

         <main className={styles.main}>
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/movie/:id" element={<MovieDetails />} />
               <Route path="/favorites" element={<Favorites />} />
            </Routes>
         </main>
      </div>
   );
};

export default App;
