  import { useEffect, useState } from 'react';
  import { useRouter } from 'next/router';
  import Navbar from '../components/Navbar';
  import styles from '../app/page.module.css';
  import ProtectedRoute from '../components/ProtectedRoute';
  import CreateUserForm from './componentAdmin/CreateUser';
  import { useSearchParams } from 'next/navigation';
  import Link from 'next/link'
  import CreateSectorForm from './componentAdmin/CreateSector';
  import CreateCoursForm from './componentAdmin/CreateCours';
  import CreateClassesForm from './componentAdmin/CreateClasses';
  import CreateSessionsForm from './componentAdmin/CreateSessions';


  export default function Admin() {

    const [cours, setCours] = useState([]);
    const [sectors, setSector] = useState([]);
    const [users, setUsers] = useState([]);
    const [classes, setClasses] = useState([]);
    const [sessions, setSessions] = useState([]);
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

    useEffect(() => {
      const token = localStorage.getItem('token');
      const email = localStorage.getItem('email');
      const role = localStorage.getItem('userRole');

      console.log({token, email, role});

      fetch('/api/login/admin/sector', {
        method: 'GET',
        headers: {
          'email' : email,
          'role' : role,
        },
      })
      .then((res) => res.json())
      .then((data) => {
        console.log("Données des filière :", data);
        setSector(data.sectors);
        console.log(data.sectors);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur :", err);
        setLoading(false);
      });
    
    }, []);
  
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
        console.log(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur :", err);
        setLoading(false);
      });
    
    }, []);

    useEffect(() => {
      const token = localStorage.getItem('token');
      const email = localStorage.getItem('email');
      const role = localStorage.getItem('userRole');

      console.log({token, email, role});

      fetch('/api/login/admin/sessions', {
        method: 'GET',
        headers: {
          'email' : email,
          'role' : role,
        },
      })
      .then((res) => res.json())
      .then((data) => {
        console.log("Données des cours :", data);
        setSessions(data.sessions);
        console.log(data);
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
        <h1>Admin Panel</h1>
        <div>
          <CreateUserForm />
        </div>

          <div>
            
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>PRÉNOM</th>
                  <th>NOM DE FAMILLE</th>
                  <th>EMAIL</th>
                  <th>MOT DE PASSE</th>
                  <th>RÔLE</th>
                  <th>CLASSE</th>
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
                  <td>{user.classe_id.map((classe) => (
                    <p>{classe.name}</p>
                  ))}</td>
                  <td>
                    <Link href={`/componentAdmin/${user._id}`}>Modifier</Link>
                  </td>
                  <td>
                    <Link href={`/api/login/admin/users/${user._id}`}  method="DELETE">Supprimer</Link>
                    </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <CreateSectorForm />
          </div>
          <div>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NOM DE LA FILIÈRE</th>
                </tr>
                  
              </thead>
              <tbody>
              {sectors.map((sector) => (
                <tr key={sector._id}>
                  <td>{sector._id}</td>
                  <td>{sector.name}</td>
                  <td>
                    <Link href={`/componentAdmin/${sector._id}`}>Modifier</Link>
                  </td>
                  <td>
                    <Link href={`/admin/users/${sector._id}`}  method="DELETE">Supprimer</Link>
                    </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <CreateClassesForm />
          </div>
          <div>
          <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NOM DE LA CLASSE</th>
                  <th>NOM DE LA FILIÈRE</th>
                  <th>NOM DU COURS</th>
                  <th>MODIFICATION</th>
                  <th>SUPPRESSION</th>
                </tr>
              </thead>
              <tbody>
              {classes.map((classe) => (
                <tr key={classe._id}>
                  <td>{classe._id}</td>
                  <td>{classe.name}</td>
                  <td>{classe.sector.map((sectors) => (
                    <p>{sectors.name}</p>
                  ))}</td>
                  <td>{classe.cours.map((cours) => (
                    <p>{cours.name}</p>
                  ))}</td>
                    <td>
                    <Link href={`/componentAdmin/${cours._id}`}>Modifier</Link>
                  </td>
                  <td>
                    <Link href={`/admin/users/${cours._id}`}  method="DELETE">Supprimer</Link>
                  </td>
                </tr>
              ))}
              </tbody>
          </table>
          </div>
          <div>
            <CreateCoursForm />
          </div>
          <div>
          <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NOM DU COURS</th>
                  <th>DESCRIPTION DU COURS</th>
                </tr>
                  
              </thead>
              <tbody>
              {cours.map((cours) => (
                <tr key={cours._id}>
                  <td>{cours._id}</td>
                  <td>{cours.name}</td>
                  <td>{cours.description}</td>
                  <td>
                    <Link href={`/componentAdmin/${cours._id}`}>Modifier</Link>
                  </td>
                  <td>
                    <Link href={`/admin/users/${cours._id}`}  method="DELETE">Supprimer</Link>
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <CreateSessionsForm />
          </div>
          <div>
          <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NOM DE COURS</th>
                  <th>JOURS</th>
                  <th>MOIS</th>
                  <th>YEARS</th>
                  <th>MODIFICATION</th>
                  <th>SUPPRESSION</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((session) => (
                  <tr key={session._id}>
                    <td>{session._id}</td>
                    <td>{session.cours.map((cours) => (
                      <p>{cours.name}</p>
                    ))}</td>
                    <td>{session.days}</td>
                    <td>{session.months}</td>
                    <td>{session.years}</td>
                  
                      <td>
                      <Link href={`/componentAdmin/${session._id}`}>Modifier</Link>
                    </td>
                    <td>
                      <Link href={`/admin/users/${session._id}`}  method="DELETE">Supprimer</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </div>
    );
  }