// Code to display a video on a video page.
'use client'

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic'

import { getSingleVideo } from "../lib/api.js";

// Import ReactPlayer without SSR to avoid hydration errors when using external class component.
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })


// Component to display a video on a video page.
export default function VideoDisplay({ videoID }) {
    const [isLoading, setLoading] = useState(true);
    const [video, setVideo] = useState(null);

    // Asynchronously fetch the video at videoID.
    useEffect(() => {
        async function fetchVideo() {
            setLoading(true);
            try {
                const video = await getSingleVideo(videoID);
                setVideo(video.video);
            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        }
        fetchVideo();
    }, [videoID]);

    // Return a loading message during the asynchronous fetchVideo call.
    // This prevents the 'No video found' message from flashing up while the video is loading.
    if (isLoading) {
        return (
            <p>Loading video...</p>
        )
    }

    // Display the video player component only if fetchVideo succeeds.
    // Uses the ReactPlayer component to embed with controls from the source.
    if (video) {
        const createdAt = new Date(video.created_at);

        return (
            <>
                <h1>{video.title}</h1>
                <ReactPlayer url={video.video_url} controls={true}/>
                <p><i>{video.user_id}</i></p>
                <p><i>{createdAt.toLocaleString("en-US")}</i></p>
                <p>{video.description}</p>
            </>
        )
    } else {
        return <p>{`No video found with video ID ${videoID}.`}</p>
    }
    
}