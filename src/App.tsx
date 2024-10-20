import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LivroLista from './LivroLista';
import LivroDados from './LivroDados';
import { LivroProvider } from './LivroContext'; // Import the provider

function App() {
  return (
    <LivroProvider> {/* Wrap your app with the provider */}
      <Router>
        <div className="App">
          <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container-fluid">
              <button 
                className="navbar-toggler" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#navbarNav" 
                aria-controls="navbarNav" 
                aria-expanded="false" 
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">Catálogo</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/dados">Novo</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <main>
            <div className="content-container">
              <Routes>
                <Route path="/" element={<LivroLista />} />
                <Route path="/dados" element={<LivroDados />} />
              </Routes>
            </div>
          </main>
        </div>
      </Router>
    </LivroProvider>
  );
}

export default App;