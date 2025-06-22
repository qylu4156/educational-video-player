'use client'

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic'

import { getSingleVideo } from "../lib/api.js";

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

// import ReactPlayer from 'react-player'


export default function VideoDisplay({ videoID }) {
    const [isLoading, setLoading] = useState(true);
    const [video, setVideo] = useState(null);

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
    }, []);

    if (isLoading) {
        return (
            <p>Loading video...</p>
        )
    }

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