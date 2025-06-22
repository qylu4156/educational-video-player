// Code for the home page.
'use client'
import { useState, useEffect } from 'react';

import styles from "./page.module.css";
import VideoList from "/src/app/components/video-list.js";
import HeaderBar from "/src/app/components/header.js";

// Component for a login page. Saves userID to session storage.
function LoginPage({ onSubmit }) {
  function login(formData) {
    const userID = formData.get("userID")
    sessionStorage.setItem("userID", userID)
    onSubmit(userID);
  };
  
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Log in</h1>
        <form action={login}>
          <input type="text" name="userID" placeholder="User ID" />
          <br />
          <button type="submit">Log in</button>
        </form>
      </main>
    </div>
  )
}

// Component for the home page. Displays a login page if userID is not set,
// otherwise displays a list of videos posted by the logged in user.
export default function Home() {
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const storedUserID = sessionStorage.getItem("userID");
    setUserID(storedUserID);
  }, []);

  if (!userID) {
    return (
      <LoginPage onSubmit={(x) => setUserID(x)}/>
    )
  } else {
    return (
      <div className={styles.page}>
        <HeaderBar />
        <main className={styles.main}>
          <VideoList userID={userID}/>
        </main>
      </div>
    );
  }
}
