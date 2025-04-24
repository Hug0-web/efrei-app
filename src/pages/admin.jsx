import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import styles from '../app/page.module.css';
import ProtectedRoute from '../components/ProtectedRoute';
import CreateUserForm from './componentAdmin/CreateUser';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link'


export default function Admin() {
  const [users, setUsers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(users);
  
  useEffect(() => {
    fetch('/api/login/admin/users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch users:', err);
        setLoading(false);
      });
  }, []);

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
   
  }, []);


 

  

  if (loading) return <p>Loading users...</p>;

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <CreateUserForm />
      </div>
      <div>
        <h1>Admin Panel</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>PRÉNOM</th>
              <th>NOM DE FAMILLE</th>
              <th>EMAIL</th>
              <th>MOT DE PASSE</th>
              <th>RÔLE</th>
              <th>MODIFICATION</th> 
              <th>SUPRESSION</th> 
            </tr>
          </thead>
          <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.role}</td>
              <td>
                <Link href={`/admin/users/${user._id}`}>Modifier</Link>
              </td>
              <td>
                <Link href={`/admin/users/${user._id}`}  method="DELETE">Supprimer</Link>
                </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}