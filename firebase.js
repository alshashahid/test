// Import the necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

// Your Firebase config (Replace with your Firebase project details)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Sign Up Function
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("Sign Up Successful: ", user);
    return user;
  } catch (error) {
    console.error("Error signing up: ", error.message);
    alert(error.message);
  }
};

// Login Function
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("Login Successful: ", user);
    return user;
  } catch (error) {
    console.error("Error logging in: ", error.message);
    alert(error.message);
  }
};

// Auth State Change Listener (detects if user is logged in or not)
export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback);
};




import React, { useState } from "react";
import { signUp, login, onAuthStateChangedListener } from "./firebase";

// App Component
function App() {
  const [email, setEmail] = useState("user@gmail.com");
  const [password, setPassword] = useState("user123");
  const [error, setError] = useState("error");
  const [user, setUser] = useState(null);

  // Handle Sign-Up form submission
  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const user = await signUp(email, password);
      setUser(user); // Set user if sign-up is successful
      alert("Sign-up successful!");
    } catch (error) {
      setError(error.message); // Set error message if sign-up fails
    }
  };

  // Handle Login form submission
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await login(email, password);
      setUser(user); // Set user if login is successful
      alert("Login successful!");
    } catch (error) {
      setError(error.message); // Set error message if login fails
    }
  };

  // Listen to authentication state changes (if the user is logged in)
  onAuthStateChangedListener((currentUser) => {
    if (currentUser) {
      setUser(currentUser); // Set the current user when logged in
    } else {
      setUser(null); // Set user to null if not logged in
    }
  });

  // Handle Logout
  const handleLogout = () => {
    setUser(null);
    alert("You have been logged out.");
  };

  return (
    <div className="App">
      <h1>Firebase Authentication Demo</h1>
      
      {user ? (
        <div>
          <h2>Welcome, {user.email}</h2>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      ) : (
        <div>
          <h2>Sign Up</h2>
          <form onSubmit={handleSignUp}>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <br />
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <br />
            <button type="submit">Sign Up</button>
          </form>

          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <br />
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <br />
            <button type="submit">Login</button>
          </form>
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default App;








