'use client'

import styles from "/src/app/page.module.css";
import HeaderBar from "/src/app/components/header.js";
import VideoUploader from "../components/upload-video.js";

export default function UploadPage() {
    return (
        <div className={styles.page}>
            <HeaderBar />
            <main className={styles.main}>
                <VideoUploader />
            </main>
        </div>
    )
}