import styles from "/src/app/page.module.css";
import VideoDisplay from "/src/app/components/video-display.js";
import HeaderBar from "/src/app/components/header.js";
import CommentDisplay from "/src/app/components/comment-display.js";


function getVideo(slug) {
    return slug
}

// TODO: remove comment display from invalid video URLs
// otherwise you can post comments on nonexistent videos

export default async function VideoPage({ params }) {
    const { slug } = await params;
    const videoID = await getVideo(slug);

    return (
        <>
            <div className={styles.page}>
                <HeaderBar />
                <main className={styles.main}>
                    <VideoDisplay videoID={videoID}/>
                    <CommentDisplay videoID={videoID}/>
                </main>
            </div>
        </>
    )
}