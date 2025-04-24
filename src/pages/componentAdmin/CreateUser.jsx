import { useState, useEffect } from 'react';

export default function CreateUserForm() {

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    role: '',
    classe_id: '',
  });

  const [classes, setClasses] = useState([])

  console.log(classes);

  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(true);

  useEffect(() => {
      fetch('/api/login/admin/classes')
        .then((res) => res.json())
        .then((data) => {
          setUsers(data.classe_id);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Failed to fetch classes:', err);
          setLoading(false);
        });
    }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
            const res = await fetch('/api/login/admin/users', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
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
            classe_id: '',
        });
        } else {
        setMessage(data.error || 'Une erreur est survenue.');
        }
    } catch (error) {
      console.error('Erreur lors de la requête POST:', error);
      setMessage('Une erreur est survenue lors de la création de l’utilisateur.');
    }
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <form onSubmit={handleSubmit}>  
        <input name="first_name" value={formData.first_name} onChange={handleChange} placeholder="Prénom" required/>
        <input name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Nom de famille" required/>
        <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" required/>
        <input name="password" value={formData.password} onChange={handleChange} placeholder="Mot de Passe" required/>
        <select name="role" onChange={handleChange} placeholder="Choisissez un rôle" >
            <option value={formData.role}>Étudiant</option>
            <option value={formData.role}>Professeur</option>
            <option value={formData.role}>Administrateur</option>
        </select>
    </form>
  )
}