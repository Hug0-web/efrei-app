import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import styles from '../app/page.module.css';
import ProtectedRoute from '../components/ProtectedRoute';

export default function Admin() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Formulaire pour ajouter un utilisateur
  const [newUser, setNewUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    role: 'student',
    classe_id: []
  });

  // Formulaire pour ajouter une note
  const [newNote, setNewNote] = useState({
    user: '',
    cours: '',
    note: ''
  });

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté et est un admin
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    
    if (!token) {
      router.push('/login');
      return;
    }
    
    if (role !== 'admin') {
      router.push('/');
      return;
    }
    
    // Vérifier si un onglet est spécifié dans l'URL
    if (router.query.tab) {
      setActiveTab(router.query.tab);
      if (router.query.tab === 'courses') {
        fetchCourses();
      } else if (router.query.tab === 'sectors') {
        // Ici, vous pourriez ajouter une fonction pour charger les filières
      } else {
        fetchUsers();
      }
    } else {
      // Charger les données initiales
      fetchUsers();
    }
  }, [router, router.query]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');
      
      const email = localStorage.getItem('email'); // Supposons que l'email est stocké lors de la connexion
      
      const response = await fetch('/api/login/admin/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des utilisateurs');
      }

      const data = await response.json();
      setUsers(data.users);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError('');
      
      const email = localStorage.getItem('email');
      
      const response = await fetch('/api/login/admin/cours', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des cours');
      }

      const data = await response.json();
      setCourses(data.notes);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      
      const email = localStorage.getItem('email');
      
      const response = await fetch('/api/login/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...newUser, email })
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'ajout de l\'utilisateur');
      }

      // Réinitialiser le formulaire et rafraîchir la liste
      setNewUser({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        role: 'student',
        classe_id: []
      });
      fetchUsers();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      
      const email = localStorage.getItem('email');
      
      const response = await fetch('/api/login/admin/cours', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...newNote, email })
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'ajout de la note');
      }

      // Réinitialiser le formulaire et rafraîchir la liste
      setNewNote({
        user: '',
        cours: '',
        note: ''
      });
      fetchCourses();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'users':
        return (
          <div>
            <h2>Gestion des Utilisateurs</h2>
            
            {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
            
            <form onSubmit={handleAddUser} style={{ marginBottom: '2rem' }}>
              <h3>Ajouter un utilisateur</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label htmlFor="first_name">Prénom:</label>
                  <input 
                    type="text" 
                    id="first_name"
                    value={newUser.first_name}
                    onChange={(e) => setNewUser({...newUser, first_name: e.target.value})}
                    required
                    style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                  />
                </div>
                <div>
                  <label htmlFor="last_name">Nom:</label>
                  <input 
                    type="text" 
                    id="last_name"
                    value={newUser.last_name}
                    onChange={(e) => setNewUser({...newUser, last_name: e.target.value})}
                    required
                    style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                  />
                </div>
                <div>
                  <label htmlFor="email">Email:</label>
                  <input 
                    type="email" 
                    id="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    required
                    style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                  />
                </div>
                <div>
                  <label htmlFor="password">Mot de passe:</label>
                  <input 
                    type="password" 
                    id="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                    required
                    style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                  />
                </div>
                <div>
                  <label htmlFor="role">Rôle:</label>
                  <select 
                    id="role"
                    value={newUser.role}
                    onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                    style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                  >
                    <option value="student">Étudiant</option>
                    <option value="teacher">Professeur</option>
                    <option value="admin">Administrateur</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="classe_id">Classe:</label>
                  <select 
                    id="classe_id"
                    value={newUser.classe_id[0] || ''}
                    onChange={(e) => setNewUser({...newUser, classe_id: [e.target.value]})}
                    style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                  >
                    <option value="">Sélectionner une classe</option>
                    {/* Ici, vous pourriez charger dynamiquement les classes disponibles */}
                  </select>
                </div>
              </div>
              <button 
                type="submit" 
                disabled={loading}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? 'Chargement...' : 'Ajouter l\'utilisateur'}
              </button>
            </form>
            
            <h3>Liste des utilisateurs</h3>
            {loading ? (
              <p>Chargement des utilisateurs...</p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid #ddd' }}>Nom</th>
                    <th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid #ddd' }}>Email</th>
                    <th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid #ddd' }}>Rôle</th>
                    <th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid #ddd' }}>Classe</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td style={{ padding: '0.5rem', borderBottom: '1px solid #ddd' }}>{user.first_name} {user.last_name}</td>
                      <td style={{ padding: '0.5rem', borderBottom: '1px solid #ddd' }}>{user.email}</td>
                      <td style={{ padding: '0.5rem', borderBottom: '1px solid #ddd' }}>{user.role}</td>
                      <td style={{ padding: '0.5rem', borderBottom: '1px solid #ddd' }}>
                        {user.classe_id.map(classe => classe.name).join(', ')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        );
      case 'courses':
        return (
          <div>
            <h2>Gestion des Cours et Notes</h2>
            
            {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
            
            <form onSubmit={handleAddNote} style={{ marginBottom: '2rem' }}>
              <h3>Ajouter une note</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label htmlFor="user">Étudiant:</label>
                  <select 
                    id="user"
                    value={newNote.user}
                    onChange={(e) => setNewNote({...newNote, user: e.target.value})}
                    required
                    style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                  >
                    <option value="">Sélectionner un étudiant</option>
                    {users.filter(user => user.role === 'student').map(user => (
                      <option key={user._id} value={user._id}>
                        {user.first_name} {user.last_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="cours">Cours:</label>
                  <select 
                    id="cours"
                    value={newNote.cours}
                    onChange={(e) => setNewNote({...newNote, cours: e.target.value})}
                    required
                    style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                  >
                    <option value="">Sélectionner un cours</option>
                    {/* Ici, vous pourriez charger dynamiquement les cours disponibles */}
                  </select>
                </div>
                <div>
                  <label htmlFor="note">Note:</label>
                  <input 
                    type="number" 
                    id="note"
                    min="0"
                    max="20"
                    step="0.5"
                    value={newNote.note}
                    onChange={(e) => setNewNote({...newNote, note: e.target.value})}
                    required
                    style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                  />
                </div>
              </div>
              <button 
                type="submit" 
                disabled={loading}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? 'Chargement...' : 'Ajouter la note'}
              </button>
            </form>
            
            <h3>Liste des notes</h3>
            {loading ? (
              <p>Chargement des notes...</p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid #ddd' }}>Étudiant</th>
                    <th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid #ddd' }}>Cours</th>
                    <th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid #ddd' }}>Note</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course._id}>
                      <td style={{ padding: '0.5rem', borderBottom: '1px solid #ddd' }}>
                        {course.user ? `${course.user.first_name} ${course.user.last_name}` : 'N/A'}
                      </td>
                      <td style={{ padding: '0.5rem', borderBottom: '1px solid #ddd' }}>
                        {course.cours ? course.cours.name : 'N/A'}
                      </td>
                      <td style={{ padding: '0.5rem', borderBottom: '1px solid #ddd' }}>{course.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        );
      case 'sectors':
        return (
          <div>
            <h2>Gestion des Filières</h2>
            <p>Fonctionnalité en cours de développement...</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <ProtectedRoute>
      <div className={styles.page} style={{ padding: '0' }}>
        <Navbar />
        <main className={styles.main} style={{ padding: '0 2rem', width: '100%' }}>
          <h1>Tableau de Bord Administrateur</h1>
          
          <div style={{ display: 'flex', marginBottom: '2rem' }}>
            <button 
              onClick={() => {
                setActiveTab('users');
                fetchUsers();
              }}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: activeTab === 'users' ? '#0070f3' : '#f0f0f0',
                color: activeTab === 'users' ? 'white' : 'black',
                border: 'none',
                borderRadius: '4px 0 0 4px',
                cursor: 'pointer'
              }}
            >
              Utilisateurs
            </button>
            <button 
              onClick={() => {
                setActiveTab('courses');
                fetchCourses();
              }}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: activeTab === 'courses' ? '#0070f3' : '#f0f0f0',
                color: activeTab === 'courses' ? 'white' : 'black',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Cours et Notes
            </button>
            <button 
              onClick={() => setActiveTab('sectors')}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: activeTab === 'sectors' ? '#0070f3' : '#f0f0f0',
                color: activeTab === 'sectors' ? 'white' : 'black',
                border: 'none',
                borderRadius: '0 4px 4px 0',
                cursor: 'pointer'
              }}
            >
              Filières
            </button>
          </div>
          
          {renderTabContent()}
        </main>
      </div>
    </ProtectedRoute>
  );
}