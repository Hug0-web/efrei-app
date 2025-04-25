import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import styles from '../../styles/login.module.css';

export default function CreateSectorForm() {

  const [formData, setFormData] = useState({
    name: '',
  });
  

  const [sector, setSector] = useState([]);


  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(true);
  

 


  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
            const token = localStorage.getItem('token');
            const email = localStorage.getItem('email');
            const role = localStorage.getItem('userRole');

            const res = await fetch('/api/login/admin/sector', {
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
            name: '',
           
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
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Nom de la filière" required/>
        <button className={styles.submitButton} type="submit" >Créer Filière</button>
      </form>
    </div>
  )
}