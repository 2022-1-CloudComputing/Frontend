import './App.css';
import FilePage from './components/pages/FilePage';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import FavoritesPage from './components/pages/FavoritesPage';
import SharePage from './components/pages/SharePage';
import LoginPage from './components/pages/LoginPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/file" element={<FilePage />} />
        <Route path="/share" element={<SharePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/login" element={<LoginPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
