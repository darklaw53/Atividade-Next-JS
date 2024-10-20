import React from 'react';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css'; 

export const Menu: React.FC = () => {
    return (
      <nav style={{ backgroundColor: 'black', padding: '10px' }}>
        <ul style={{ listStyle: 'none', display: 'flex', gap: '20px', margin: 0, padding: 0 }}>
          <li>
            <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/LivroLista" style={{ color: 'white', textDecoration: 'none' }}>
              Catálogo
            </Link>
          </li>
          <li>
            <Link href="/LivroDados" style={{ color: 'white', textDecoration: 'none' }}>
              Novo
            </Link>
          </li>
        </ul>
      </nav>
    );
};