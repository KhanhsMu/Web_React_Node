import Header from './components/Header'
import Banner from './components/Banner'
import MovieList from "./pages/userpages/movieList"
import { useState, useContext } from "react";
import MovieDetailUser from "./pages/userpages/movieDetailUser"
import MovieDetail from './pages/adminpages/movieDetail';
import './App.css'
import { Routes, Route } from "react-router-dom";
import Login from './pages/publicpages/Login';
import Register from './pages/publicpages/Register';
import AdminHeader from "./components/AdminHeader"
import Category from "./pages/userpages/movieByCategory"
import ManagerCategory from "./pages/adminpages/managerCategory"
import Profile from "./pages/publicpages/Profile"
import ManagerMovie from "./pages/adminpages/managerMovie"
import ManagerUser from "./pages/adminpages/managerUser"
import Watch from './pages/userpages/watchMovie';
import FavoritePage from './pages/userpages/favoriteMovie';
import PrivateRoute from './components/PrivateRoute';
import NotFound from "./components/NotFound";
import CategoryPage from './pages/userpages/movieByCategory';


function App() {
  return (
    <>
      <div >
        <main >
          <Routes>
            <Route path="/" element={<Header />} />
            <Route path="/comment/:id" element={<MovieDetailUser />} />
            <Route path="/movieList" element={<MovieList />} />
            <Route path="/category" element={<Category />} />
            <Route path="/watch/:episodeId" element={<Watch />} />
            <Route path="/favorite" element={<FavoritePage />} />
            //public page
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/category/:id" element={<CategoryPage />} />
            //admin page
            <Route path="/adminpage" element={<AdminHeader />} />
            <Route path="/profile" element={<PrivateRoute> <Profile /> </PrivateRoute>} />
            <Route path="/managerMovie" element={<PrivateRoute> <ManagerMovie /> </PrivateRoute>} />
            <Route path="/managerUser" element={<PrivateRoute> <ManagerUser /> </PrivateRoute>} />
            <Route path="/managerCategory" element={<PrivateRoute> <ManagerCategory /> </PrivateRoute>} />
            <Route path="/commentadmin/:id" element={<PrivateRoute> <MovieDetail /> </PrivateRoute>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
