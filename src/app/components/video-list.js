// Code to display a list of all videos posted by the logged in user on the home page.
'use client'

import { useState, useEffect } from 'react';
import Link from "next/link";
import dynamic from "next/dynamic";

import { getVideos } from "../lib/api.js";

// Import ReactPlayer without SSR to avoid hydration errors when using external class component.
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })


// Component for one entry in a list of videos.
// Contains a thumbnail preview using ReactPlayer in light mode.
export function VideoListItem(params) {
    const createdAt = new Date(params.created_at);

    return (
        <>
            <h2>
                <Link href={`/video/${params.id}`}>{params.title}</Link>
            </h2>
            <ReactPlayer url={params.video_url} light={true}/>
            <p><i>{params.user_id}</i></p>
            <p><i>{createdAt.toLocaleString("en-US")}</i></p>
            <p>{params.num_comments + " comments"}</p>
            <br />
        </>
    )
}

// Component for a list of videos.
export default function VideoList({ userID }) {
    const [isLoading, setLoading] = useState(true);
    const [videoList, setVideoList] = useState(null);

    // Asynchronously fetch all videos for the logged in user.
    useEffect(() => {
        async function fetchVideos() {
            setLoading(true);
            try {
                const videos = await getVideos(userID);
                setVideoList(videos.videos);
            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        }
        fetchVideos();
    }, [userID]);

    // Return a loading message during the asynchronous fetchVideo call.
    // This prevents the 'No videos found' message from flashing up while the video is loading.
    if (isLoading) {
        return (
            <p>Loading videos...</p>
        )
    }

    // Display the video list component only if fetchVideos succeeds.
    // Uses the ReactPlayer component to embed thumbnails.
    if (videoList && videoList.length > 0) {
        const listItems = videoList.map(video => {
            return (
                <li key={video.id}>
                    <VideoListItem {...video} />
                </li>
            );
        });
    
        return (
            <>
                <ul style={{listStyleType: "none"}}>{listItems}</ul>
            </>
        )
    } else {
        return <p>{`No videos found for user ${userID}.`}</p>
    }
    
}