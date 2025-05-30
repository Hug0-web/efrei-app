import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import CreateNotes from './componentTeacher/CreateNotes';
import styles from '../app/page.module.css';
import ProtectedRoute from '../components/ProtectedRoute';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link'


export default function Teacher() {
  const router = useRouter();
  const [cours, setCours] = useState([]);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const role = localStorage.getItem('userRole');
    
    

    if (role !== "teacher") {
      
      router.push('/');
      return;
    }

    console.log({token, email, role});

    fetch(`/api/login/teacher/notes`, {
        method: 'GET',
        headers: {
          'email' : email,
          'role' : role,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setNotes(data.notes || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Erreur lors de la récupération des notes :", err);
          setLoading(false);
        });
   
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const role = localStorage.getItem('userRole');

    if (role !== "teacher") {
      
        router.push('/');
        return;
      }

    const headers = {
      'Content-Type': 'application/json',
    };

    fetch(`/api/login/teacher/cours`, {
      method: 'GET',
      headers: {
        'email' : email,
        'role' : role,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCours(data.cours);
        console.log(data.cours);
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération des cours :", err);
      });

  }, []);

  

  if (loading) return <p>Loading users...</p>;

  return (
    
    <div>
      <ProtectedRoute>
        <div>
          <Navbar />
        </div>
        <div>
          <CreateNotes />
        </div>
        <h1>Bienvenue sur l'espace étudiant</h1>

        <h2>Cours</h2>
        <table>
          <thead>
            <tr>
              <th>INTITULÉ</th>
              <th>DESCRIPTION</th>
            </tr>
          </thead>
          <tbody>
            {cours.map((cours) => (
              <tr key={cours._id}>
                <td>{cours.name}</td>
                <td>{cours.description}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Notes</h2>
        <table>
          <thead>
            <tr>
              <th>COURS</th>
              <th>NOTE</th>
              <th>ÉLEVE</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note) => (
              <tr key={note._id}>
                <td>{note.cours.map((c) => (
                  <p>{ c.name }</p>
                ))}</td>
                <td>{note.note}</td>
                <td>
                  {note.user.filter((u) => u.role === "student").map((u) => (
                    <p>{u.first_name} {u.last_name}</p>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ProtectedRoute>
    </div>
  );
}