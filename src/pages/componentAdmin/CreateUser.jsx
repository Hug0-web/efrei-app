import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import styles from '../../styles/login.module.css';

export default function CreateUserForm() {

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    role: '',
    classe_id: [],
  });
  

  const [classes, setClasses] = useState([]);


  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const role = localStorage.getItem('userRole');

    console.log({token, email, role});

    fetch('/api/login/admin/classes', {
      method: 'GET',
      headers: {
        'email' : email,
        'role' : role,
      },
    })
    .then((res) => res.json())
    .then((data) => {
      console.log("Données des classes :", data);
      setClasses(data.classes);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Erreur :", err);
      setLoading(false);
    });
  }, [])

  if (loading) return <p>Loading classes...</p>;
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
            const token = localStorage.getItem('token');
            const email = localStorage.getItem('email');
            const role = localStorage.getItem('userRole');

            const res = await fetch('/api/login/admin/users', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'email' : email,
                  'role' : role,
                },
                body: JSON.stringify(formData),
            });

         const data = await res.json();

        if (res.ok) {
            setMessage("L'utilisateur a été créé avec succès.");
            setFormData({
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            role: '',
            classe_id: [],
        });
        } else {
        setMessage(data.error || 'Une erreur est survenue.');
        }
    } catch (error) {
      console.error('Erreur lors de la requête POST:', error);
      setMessage('Une erreur est survenue lors de la création de l’utilisateur.');
    }
  };

    

  return (
    <div>
      <form onSubmit={handleSubmit}>  
          <input name="first_name" value={formData.first_name} onChange={handleChange} placeholder="Prénom" required/>
          <input name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Nom de famille" required/>
          <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" required/>
          <input name="password" value={formData.password} onChange={handleChange} placeholder="Mot de Passe" required/>
          <select name="role" onChange={handleChange} value={formData.role} required>
            <option value="">-- Choisir un rôle --</option>
            <option value="student">Étudiant</option>
            <option value="teacher">Professeur</option>
            <option value="admin">Administrateur</option>
          </select>
          <select name="classe_id" value={formData.classe_id} onChange={handleChange}>
            <option value="">Sélectionnez une classe</option>
            {classes.map((c) => (
              <option key={c.name} value={c._id}>
              {c.name}
            </option>
            ))}
        </select>
        <button className={styles.submitButton} type="submit" disabled={loading}>Créer utilisateur</button>
      </form>
    </div>
  )
}