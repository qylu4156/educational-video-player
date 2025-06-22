'use client'

import { useState, useEffect } from 'react';
import Link from "next/link";
import dynamic from "next/dynamic";

import { getVideos } from "../lib/api.js";

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })


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

// TODO: make the design less slapdash
// TODO: make videos cards that are clickable
// TODO: have some state to set the current user
// TODO: add search, ordering
export default function VideoList({ userID }) {
    const [videoList, setVideoList] = useState(null);

    useEffect(() => {
        async function fetchVideos() {
            try {
                const videos = await getVideos(userID);
                setVideoList(videos.videos);
            } catch (error) {
                console.error(error.message);
            }
        }
        fetchVideos();
    }, []);

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