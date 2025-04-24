import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import styles from '../app/page.module.css';
import ProtectedRoute from '../components/ProtectedRoute';

export default function Home() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
  
    const token = localStorage.getItem('token');
    
    if (!token) {
      
      router.push('/login');
      return;
    }
    
    
    const fetchUserData = async () => {
      try {
        
        await new Promise(resolve => setTimeout(resolve, 500));
        
        
        const mockUserData = {
          id: '123',
          first_name: 'Jean',
          last_name: 'Dupont',
          email: 'jean.dupont@efrei.fr',
          role: localStorage.getItem('userRole') || 'student', 
          classe: 'M1 Informatique'
        };
        
        setUserData(mockUserData);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des données utilisateur');
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [router]);
 
  const renderDashboardByRole = () => {
    if (!userData) return null;
    console.log(userData);
    switch (userData.role) {
      case 'admin':
        return (
          <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#f8f9fa', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h2>Tableau de bord Administrateur</h2>
            <p>Bienvenue dans votre espace administrateur, {userData.first_name}.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '1.5rem' }}>
              <div style={{ padding: '1rem', backgroundColor: '#e3f2fd', borderRadius: '8px' }}>
                <h3>Gestion des Utilisateurs</h3>
                <p>Gérez les comptes étudiants, professeurs et administrateurs.</p>
                <button 
                  onClick={() => router.push('/admin')}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#1976d2',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginTop: '0.5rem'
                  }}
                >
                  Accéder
                </button>
              </div>
              
              <div style={{ padding: '1rem', backgroundColor: '#e8f5e9', borderRadius: '8px' }}>
                <h3>Gestion des Cours</h3>
                <p>Gérez les cours, les notes et les affectations.</p>
                <button 
                  onClick={() => router.push('/admin?tab=courses')}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#388e3c',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginTop: '0.5rem'
                  }}
                >
                  Accéder
                </button>
              </div>
              
              <div style={{ padding: '1rem', backgroundColor: '#fff3e0', borderRadius: '8px' }}>
                <h3>Gestion des Filières</h3>
                <p>Gérez les filières et les classes.</p>
                <button 
                  onClick={() => router.push('/admin?tab=sectors')}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#f57c00',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginTop: '0.5rem'
                  }}
                >
                  Accéder
                </button>
              </div>
            </div>
          </div>
        );
        
      case 'teacher':
        return (
          <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#f8f9fa', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h2>Tableau de bord Professeur</h2>
            <p>Bienvenue dans votre espace enseignant, {userData.first_name}.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginTop: '1.5rem' }}>
              <div style={{ padding: '1rem', backgroundColor: '#e3f2fd', borderRadius: '8px' }}>
                <h3>Mes Cours</h3>
                <p>Accédez à vos cours et gérez votre contenu pédagogique.</p>
                <button 
                  onClick={() => alert('Fonctionnalité en développement')}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#1976d2',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginTop: '0.5rem'
                  }}
                >
                  Voir mes cours
                </button>
              </div>
              
              <div style={{ padding: '1rem', backgroundColor: '#e8f5e9', borderRadius: '8px' }}>
                <h3>Gestion des Notes</h3>
                <p>Attribuez et gérez les notes de vos étudiants.</p>
                <button 
                  onClick={() => alert('Fonctionnalité en développement')}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#388e3c',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginTop: '0.5rem'
                  }}
                >
                  Gérer les notes
                </button>
              </div>
            </div>
          </div>
        );
        
      case 'student':
      default:
        return (
          <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#f8f9fa', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h2>Tableau de bord Étudiant</h2>
            <p>Bienvenue dans votre espace étudiant, {userData.first_name}.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginTop: '1.5rem' }}>
              <div style={{ padding: '1rem', backgroundColor: '#e3f2fd', borderRadius: '8px' }}>
                <h3>Mes Cours</h3>
                <p>Accédez à vos cours et ressources pédagogiques.</p>
                <button 
                  onClick={() => alert('Fonctionnalité en développement')}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#1976d2',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginTop: '0.5rem'
                  }}
                >
                  Voir mes cours
                </button>
              </div>
              
              <div style={{ padding: '1rem', backgroundColor: '#fff3e0', borderRadius: '8px' }}>
                <h3>Mes Notes</h3>
                <p>Consultez vos résultats et votre progression.</p>
                <button 
                  onClick={() => alert('Fonctionnalité en développement')}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#f57c00',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginTop: '0.5rem'
                  }}
                >
                  Voir mes notes
                </button>
              </div>
            </div>
            
            <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#e8f5e9', borderRadius: '8px' }}>
              <h3>Ma Classe</h3>
              <p>Vous êtes inscrit en <strong>{userData.classe}</strong>.</p>
              <p>Consultez les informations relatives à votre classe et votre filière.</p>
            </div>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <main className={styles.main}>
          <p>Chargement...</p>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.page}>
        <main className={styles.main}>
          <p style={{ color: 'red' }}>{error}</p>
          <button 
            onClick={() => router.push('/login')}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Retour à la connexion
          </button>
        </main>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className={styles.page} style={{ padding: '0' }}>
        <Navbar />
        <main className={styles.main} style={{ padding: '0 2rem' }}>
          <h1>Bienvenue sur EFREI App</h1>
          
          {renderDashboardByRole()}
          
          <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
            <h3>À propos de l'application</h3>
            <p>Cette application a été développée pour faciliter la gestion des cours, des notes et des utilisateurs à l'EFREI.</p>
            <p>Fonctionnalités implémentées:</p>
            <ul>
              <li>Authentification avec JWT</li>
              <li>Tableau de bord adapté au rôle de l'utilisateur</li>
              <li>Gestion des utilisateurs (administrateurs)</li>
              <li>Gestion des cours et des notes (administrateurs)</li>
            </ul>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}