import "./App.css";
import FilePage from "./components/pages/FilePage";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import FavoritesPage from "./components/pages/FavoritesPage";
import SharePage from "./components/pages/SharePage";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:userId/file" element={<FilePage />} />
        <Route path="/:userId/share" element={<SharePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/:userId/favorites" element={<FavoritesPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
