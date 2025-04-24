import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vérifier si un token existe
    const token = localStorage.getItem('token');
    
    if (!token) {
      // Rediriger vers la page de connexion si pas de token
      router.push('/login');
    } else {
      setIsAuthenticated(true);
    }
    
    setLoading(false);
  }, [router]);

  // Afficher un indicateur de chargement pendant la vérification
  if (loading) {
    return <div>Chargement...</div>;
  }

  // Rendre les enfants uniquement si l'utilisateur est authentifié
  return isAuthenticated ? children : null;
}