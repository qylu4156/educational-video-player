'use client'
// import Image from "next/image";
import { useState, useEffect } from 'react';
import styles from "./page.module.css";
// import Link from "next/link";

import VideoList from "/src/app/components/video-list.js";
import HeaderBar from "/src/app/components/header.js";

export default function Home() {
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const storedUserID = sessionStorage.getItem("userID");
    setUserID(storedUserID);
  }, []);

  function login(formData) {
    const userID = formData.get("userID")
    sessionStorage.setItem("userID", userID)
    setUserID(userID);
}

  if (!userID) {
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
