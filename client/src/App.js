import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home/Home';
import Blogs from './components/Blogs/Blogs.js';

function App() {
  return (
    <Routes>
          <Route path='/' element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
    </Routes>

  );
}

export default App;
