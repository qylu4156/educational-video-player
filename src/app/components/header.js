'use client'

import { useState, useEffect } from 'react';

import styles from "/src/app/page.module.css";
import Link from "next/link";

export default function HeaderBar() {
    const [isLoading, setLoading] = useState(true);
    const [userID, setUserID] = useState(null);

    useEffect(() => {
        setLoading(true);
        const storedUserID = sessionStorage.getItem("userID");
        setUserID(storedUserID);
        setLoading(false);
    }, []);

    const headerContents = (
        <>
            <Link href={"/"}>Home</Link>
            <Link href={"/upload"}>Post</Link>
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