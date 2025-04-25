import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../../components/Navbar';

import ProtectedRoute from '../../../components/ProtectedRoute';

import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link'


export default function AdminShowUsers() {
  const router = useRouter(); 
  const { id } = router.query;

  console.log(id);


  const [users, setUsers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  //console.log(users);
  
  useEffect(() => {
    if (!id) return;

    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const role = localStorage.getItem('userRole');

    fetch(`/api/login/admin/users/${id}`,
        {
            method: 'GET',
            headers: {
              'email' : email,
              'role' : role,
            },
            
          })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
        console.log(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch users:', err);
        setLoading(false);
      });
  }, [id]);
  

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
            </tr>
          </thead>
          <tbody>
          
            <tr>
              <td>{users._id}</td>
              <td>{users.first_name}</td>
              <td>{users.last_name}</td>
              <td>{users.email}</td>
              <td>{users.password}</td>
              <td>{users.role}</td>
            </tr>
          
          </tbody>
        </table>
      </div>
    </div>
  );
}