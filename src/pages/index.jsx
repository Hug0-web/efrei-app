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
  
    
    const fetchUserData = async () => {
      try {
        
        await new Promise(resolve => setTimeout(resolve, 500));
        
        console.log(localStorage);
        const userData = {
          id:  localStorage.getItem('id'),
          first_name:  localStorage.getItem('first_name'),
          last_name:  localStorage.getItem('last_name'),
          email:  localStorage.getItem('email'),
          role: localStorage.getItem('userRole'), 
          classe:  localStorage.getItem('classe')
        };
        
        setUserData(userData);
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
          <div>
            <ProtectedRoute>
              <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#f8f9fa', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <h2>Tableau de bord Administrateur</h2>
                <p>Bienvenue dans votre espace administrateur, {userData.first_name}.</p>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '1rem', marginTop: '1.5rem' }}>
                  <div style={{ padding: '1rem', backgroundColor: '#e3f2fd', borderRadius: '8px' }}>

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
                </div>
              </div>
            </ProtectedRoute>
        </div>
        );
        
      case 'teacher':
        return (
          <div>
            <ProtectedRoute>
              <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#f8f9fa', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <h2>Tableau de bord Professeur</h2>
                <p>Bienvenue dans votre espace enseignant, {userData.first_name}.</p>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '1rem', marginTop: '1.5rem' }}>
                  <div style={{ padding: '1rem', backgroundColor: '#e3f2fd', borderRadius: '8px'}}>
                    <p>Accédez à vos cours et gérez votre contenu pédagogique et les notes.</p>
                    <button 
                      onClick={() => router.push('/teacher')}
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
                  
                </div>
              </div>
            </ProtectedRoute>
        </div>
        );
        
      case 'student':
      default:
        return (
          <div>
            <ProtectedRoute>
              <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#f8f9fa', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <h2>Tableau de bord Étudiant</h2>
                <p>Bienvenue dans votre espace étudiant, {userData.first_name}.</p>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '1rem', marginTop: '1.5rem' }}>
                  <div style={{ padding: '1rem', backgroundColor: '#e3f2fd', borderRadius: '8px' }}>
                    <h3>Mes Cours</h3>
                    <p>Accédez à vos cours et ressources pédagogiques.</p>
                    <button 
                      onClick={() => router.push('/student')}
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
                </div>
                
                <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#e8f5e9', borderRadius: '8px' }}>
                  <h3>Ma Classe</h3>
                  <p>Vous êtes inscrit en <strong>{userData.classe}</strong>.</p>
                  <p>Consultez les informations relatives à votre classe et votre filière.</p>
                </div>
              </div>
            </ProtectedRoute>
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