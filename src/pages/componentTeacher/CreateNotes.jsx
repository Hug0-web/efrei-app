import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import styles from '../../styles/login.module.css';

export default function CreateNotes() {

  const [users, setUsers] = useState([]);
  const [cours, setCours] = useState([]);
  const [notes, setNotes] = useState([]);

  const [formData, setFormData] = useState({
    user: '',
    cour: '',
    note: '',
  });
  
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const role = localStorage.getItem('userRole');

    console.log({token, email, role});

    fetch('/api/login/teacher/cours', {
      method: 'GET',
      headers: {
        'email' : email,
        'role' : role,
      },
    })
    .then((res) => res.json())
    .then((data) => {
      console.log("Données des cours :", data);
      setCours(data.cours);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Erreur :", err);
      setLoading(false);
    });
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const role = localStorage.getItem('userRole');

    console.log({token, email, role});

    fetch('/api/login/teacher/notes', {
      method: 'GET',
      headers: {
        'email' : email,
        'role' : role,
      },
    })
    .then((res) => res.json())
    .then((data) => {
      console.log("Données des notes :", data);
      setNotes(data.notes);
    })
    .catch((err) => {
      console.error("Erreur :", err);
      setLoading(false);
    });
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const role = localStorage.getItem('userRole');

    console.log({token, email, role});

    fetch('/api/login/admin/users', {
      method: 'GET',
      headers: {
        'email' : email,
        'role' : role,
      },
    })
    .then((res) => res.json())
    .then((data) => {
      console.log("Données des utilisateurs :", data);
      setUsers(data.users);
    })
    .catch((err) => {
      console.error("Erreur :", err);
      setLoading(false);
    });
  }, [])

  if (loading) return <p>Chargement des cours...</p>;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/login/teacher/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'email': localStorage.getItem('email'),
          'role': localStorage.getItem('userRole'),
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Note créée avec succès");
        setFormData({
          user: '',
          cour: '',
          note: '',
        });
      } else {
        setMessage(data.error || 'Une erreur est survenue.');
      }
    } catch (error) {
      console.error('Erreur lors de la requête POST:', error);
      setMessage('Une erreur est survenue lors de la création de la note.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>  
        <input
          name="note"
          value={formData.note}
          onChange={handleChange}
          placeholder="Note"
          required
        />

        <select name="cour" value={formData.cour} onChange={handleChange} required>
          <option value="">Sélectionnez un cours</option>
          {cours.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <select name="user" value={formData.user} onChange={handleChange} required>
          <option value="">Sélectionnez un élève</option>
          {users
            .filter((u) => u.role === 'student')
            .map((u) => (
              <option key={u._id} value={u._id}>
                {u.first_name} {u.last_name}
              </option>
            ))}
        </select>
        
        <button className={styles.submitButton} type="submit" disabled={loading}>Créer une note</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}