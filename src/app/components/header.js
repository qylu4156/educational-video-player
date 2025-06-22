// Code for a site header.
'use client'

import { useState, useEffect } from 'react';
import Link from "next/link";

import styles from "../page.module.css";

// Component for the header bar for the site.
// Contains links to Home and the Post video page, as well as the logged in user.
export default function HeaderBar() {
    const [isLoading, setLoading] = useState(true);
    const [userID, setUserID] = useState(null);

    // Fetch the currently logged in user from session storage.
    useEffect(() => {
        setLoading(true);
        const storedUserID = sessionStorage.getItem("userID");
        setUserID(storedUserID);
        setLoading(false);
    }, []);

    const headerContents = (
        <>
            <Link href={"/"}>Home</Link>
            <Link href={"/upload"}>Upload</Link>
            {(!isLoading) ? (
                <p>{`Logged in user: ${userID}`}</p>
            ) : null}
        </>
    );

    return (
        <header className={styles.header}>
            {headerContents}
        </header>
    )
}