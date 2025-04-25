import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import styles from '../../styles/login.module.css';

export default function CreateSessionsForm() {
    const [cours, setCours] = useState([]); 
    const [users, setUsers] = useState([]);

    const [formData, setFormData] = useState({
        cours: '',
        days: '',
        months: '',
        years: '',
    });


    const [message, setMessage] = useState('');

    const [loading, setLoading] = useState(true);
    

    


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
        console.log("Données des cours :", data);
        setUsers(data.users);
        console.log(data.users);
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

        fetch('/api/login/admin/cours', {
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
        console.log(data.cours);
        })
        .catch((err) => {
        console.error("Erreur :", err);
        setLoading(false);
        });
    }, [])
    


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
                const token = localStorage.getItem('token');
                const email = localStorage.getItem('email');
                const role = localStorage.getItem('userRole');

                const res = await fetch('/api/login/admin/sessions', {
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
                cours: '',
                days: '',
                months: '',
                years: '',
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
            <select name="cours" value={formData.cours} onChange={handleChange} required>
                <option value="">Sélectionnez un cours</option>
                {cours.map((c) => (
                    <option key={c._id} value={c._id}>  
                        {c.name}
                    </option>
                ))}
            </select>
            <input name="days" value={formData.days} onChange={handleChange} placeholder="jours" type='number' min={1} max={31} required/>
            <input name="months" value={formData.months} onChange={handleChange} placeholder="mois" type='number' min={1} max={12} required/>
            <input name="years" value={formData.years} onChange={handleChange} placeholder="année" required/>
            <button className={styles.submitButton} type="submit" >Créer Cours</button>
        </form>
        </div>
    )
}