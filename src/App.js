import "./App.css";
import FilePage from "./components/pages/FilePage";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import FavoritesPage from "./components/pages/FavoritesPage";
import SharePage from "./components/pages/SharePage";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import ProfilePage from "./components/pages/ProfilePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/file" element={<FilePage />} />
        <Route path="/share" element={<SharePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/userProfile" element={<ProfilePage />} />
      </Routes> 
    </div>
  );
}

export default App;
