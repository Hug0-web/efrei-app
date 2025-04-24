import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Vérifier si un token existe dans le localStorage
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');

    
    setIsLoggedIn(!!token);
    setUserRole(role);
    
  }, []);

  const handleLogout = () => {
    
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    router.push('/login');
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem',
      backgroundColor: '#f0f0f0',
      marginBottom: '2rem'
    }}>
      <div>
        <Link href="/" style={{ fontWeight: 'bold', fontSize: '1.2rem', textDecoration: 'none', color: '#333' }}>
          EFREI App
        </Link>
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        {isLoggedIn ? (
          <>
            {userRole === 'admin' && (
              <Link href="/admin" style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                textDecoration: 'none'
              }}>
                Administration
              </Link>
            )}
            <button 
              onClick={handleLogout}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Déconnexion
            </button>
          </>
        ) : (
          <Link 
            href="/login"
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#0070f3',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px'
            }}
          >
            Connexion
          </Link>
        )}
      </div>
    </nav>
  );
}