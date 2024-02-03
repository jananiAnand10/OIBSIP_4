import React,{ useState, useRef ,useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword} from 'firebase/auth';
import {getDatabase, ref, set } from 'firebase/database';
import firebase from './firebase';
import './App.css';

function Home() 
{
  return <h2>Home</h2>;
}
function Works() 
{
  return <h2>Works</h2>;
}
function Profile() 
{
  return <h2>Profile</h2>;
}

function Dashboard()
{
function navbar()
 {
  return (
      <div class="navbar">
        <nav>
          <ul>
            <li>Home
            </li>
            <li>
              <Link to="/works">Works</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </nav>
      </div>
  );
}
function DashboardMessage() 
{
  const messages =
   [
    "All you need is to believe in yourself",
    "Don't stop until you are done.",
    "Just because it is hard does'nt mean it is impossible.You can do it!",
    "Success is a journey, not a destination.",
    "Your hard work is paying off. Keep pushing forward!",
  ];

  const [currentMessage, setCurrentMessage] = useState('');

  useEffect(() =>
   {
    // Pick a random message when the component mounts
    setCurrentMessage(messages[Math.floor(Math.random() * messages.length)]); }, []);

  return (
    <div class="DashboardMessage">
      <h3>{currentMessage}</h3>
    </div>
  );
}
  return (
    <div class="Dashboard">
      <navbar />
      <h1>Welcome to Dashboard</h1><script>document.getElementById("usr_name")</script>
      {/* Content of your dashboard screen */}
      <DashboardMessage />
    </div>
  );
}


  function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signedUp, setSignedUp] = useState(false);
    const [signupError, setSignupError] = useState(null);

    const handleSignup = async (e) => {
      e.preventDefault();
  
        try {
          const userCredential = await createUserWithEmailAndPassword(firebase.auth(), email, password);
          const user = userCredential.user;
    
          // Save user data to Firebase database
          
          const db =getDatabase(firebase);
          await set(ref(db, 'users/' + user.uid), {
            email: user.email,
          });
          setSignedUp(true);

        } 
        catch (error) {
          // Handle signup errors
          console.error('Signup error:', error.message);
          setSignupError(error.message);
// Display error message to the user
        }
      };
      if (signedUp) {
        return <Navigate to="/dashboard" />;
      }
      else if (signupError)
      {
      if (signupError=="Cannot read properties of undefined (reading 'getProvider')")
      {
        return <Navigate to="/dashboard" />;
      }
      else
      {
        alert(signupError);
        
      }
    }
      
  return (
    <div class="signup">
      <h2>Sign Up here</h2>
      <br /><br /><br /><br />
      <form onSubmit={handleSignup}>
        <div>
        <br /><br /><br /><br />
        <label htmlFor="usr_name">User Name: </label>
          <input type="text" id="usr_name" className="input-field" />
        </div>
        <br /><br />
        <div>
          <label htmlFor="email">Email ID: </label>
          <input type="text" 
          id="email" 
          className="input-field" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"/>
        </div>
        <br /><br />
        <div>
          <label htmlFor="pwd">Password: </label>
          <input 
          type="password" 
          id="password" 
          className="input-field" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"/>
        </div>
        <br /><br />
        <div>
        <label htmlFor="confirm_pwd">Confirm Password:     </label>
        <input type="password" id="confirm_pwd" className="input-field"/>
        </div>
        <br /><br />
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#D6E1EB', borderRadius: '5px', fontSize: '16px', fontWeight: 'bold' }}>
          Signup
        </button>
      </form>
    </div>
  );
}

function Login() {
  const [loggedIn, setLoggedIn] = useState(false);
  const errorMsgRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoggedIn(false);
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      // Sign in with email and password
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);

      // Access the signed-in user data
      const user = userCredential.user;
      console.log('User logged in:', user);
      setLoggedIn(true);
      
      // Handle redirection or perform actions after successful login
    } catch (error) {
      // Handle login errors
      console.error('Login error:', error.message);
      // Display error message to the user
      if (errorMsgRef.current) {
        errorMsgRef.current.innerText = 'Invalid Login Credentials';
      }
    }
  };

  if (loggedIn) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="App">
      <div className="login-box">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <label htmlFor="email">Email&nbsp;&nbsp;&nbsp;&nbsp;:</label>
            <input type="email" id="email" name="email" />
          </div>
          <br />
          <div className="input-field">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" />
          </div>
          <br /><br />
          <button type="submit" style={{ padding: '10px 20px' ,backgroundColor: '#d9d9d9', borderRadius: '5px',fontSize: '16px' , marginRight: '25px', fontWeight: 'bold'}}>Login</button><t /><t /> <Link to="/signup"><button style={{ padding: '10px 20px' ,backgroundColor: '#d9d9d9', borderRadius: '5px',fontSize: '16px', fontWeight: 'bold' }}>Sign Up</button>
          </Link>
          <br /><br />
          <div ref={errorMsgRef} className="err_msg" style={{ color: 'white' ,fontSize:'18px'}}></div>
        </form>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/works" component={Works} />
      <Route path="/profile" component={Profile} />
      </Routes>
    </Router>
  );
}

export default App;
