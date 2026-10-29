import { useEffect } from 'react';
import { useAuth } from './components/AuthContext';
import axios from 'axios';
import Login from './components/Login';
import Protected from './components/Protected';
import './App.css';

let hasFetched = false; // Prevents unnecessary duplicate requests.

function App() {
  const { user, setUser } = useAuth();

  async function fetchProfile() {
    if (hasFetched) return;
    hasFetched = true;

    try {
      const response = await axios.get('https://login-system-lgg3.onrender.com/profile', { withCredentials: true });

      if (response.data && response.data.email) {
        setUser(response.data);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('There has been an Error', error);
      setUser(null);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, [setUser]);

  return (
    <>
      {user ? <Protected /> : <Login />}
      
      <footer>
        <p style={{ textAlign: "center", marginTop: "2rem", padding: "1rem", color: "#666" }}>
          Developed by Mulungi Favour Priscilla | M25D14/024, Musana Jimmy Tibiita | M25D14/005, Ssekisambu Reagan | M25D14/009
        </p>
      </footer>
    </>
  );
}

export default App;