// src/App.tsx
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';

export default function App() {
  function toggleTheme(): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="bg-black min-h-screen text-white font-raleway">
      <header className="p-4 bg-gray-dark text-white text-center flex justify-between">
        <h1 className="text-xl font-bold">My Portfolio</h1>
        <nav className="space-x-4">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </header>

      <main className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <Navbar isIntroDone={true} toggleTheme={toggleTheme} theme={theme} />
    </div>
  );
}
