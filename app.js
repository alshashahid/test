import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";

// Firebase configuration (Replace with your Firebase project details)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase (if it has not been initialized yet)
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // If already initialized, use that one
}

const auth = firebase.auth();

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  // Sign Up function
  const signUp = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      setUser(userCredential.user);
      console.log("Sign up successful!", userCredential.user);
    } catch (error) {
      setError(error.message);
      console.error("Error signing up:", error.message);
    }
  };

  // Login function
  const login = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      setUser(userCredential.user);
      console.log("Login successful!", userCredential.user);
    } catch (error) {
      setError(error.message);
      console.error("Error logging in:", error.message);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      console.log("Logged out successfully!");
    } catch (error) {
      setError(error.message);
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <div className="App">
      <h1>Firebase Authentication Example</h1>
      
      {user ? (
        <div>
          <h2>Welcome, {user.email}</h2>
          <button onClick={logout}>Log Out</button>
        </div>
      ) : (
        <div>
          <h2>Sign Up</h2>
          <form onSubmit={signUp}>
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
          <form onSubmit={login}>
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


