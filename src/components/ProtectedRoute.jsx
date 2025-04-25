import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const token = localStorage.getItem('token');
    
    if (!token) {
      
      router.push('/login');
    } else {
      setIsAuthenticated(true);
    }
    
    setLoading(false);
  }, [router]);


  if (loading) {
    return <div>Chargement...</div>;
  }

 
  return isAuthenticated ? children : null;
}