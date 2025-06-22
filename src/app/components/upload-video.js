import { useState } from 'react';

import dynamic from "next/dynamic";

import { postVideo } from "../lib/api.js";

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })


function VideoPreview({ videoURL }) {
    return (
        <>
            <p>Video preview</p>
            <ReactPlayer url={videoURL} light={true}/>
        </>
    )
}

export default function VideoUploader() {
    const [statusMessage, setStatusMessage] = useState(null);
    const [currentURL, setCurrentURL] = useState(null);

    async function submit(formData) {
        setStatusMessage(null);

        const userID = sessionStorage.getItem("userID");
        const title = formData.get("title");
        const videoURL = formData.get("url");
        const description = formData.get("description");

        try {
            await postVideo({ user_id: userID, description: description, video_url: videoURL, title: title});
            setStatusMessage("Success!");
        } catch (error) {
            setStatusMessage(error.message);
            console.error(error.message);
        }
    }

    return (
        <>
            <h1>Upload new video</h1>
            <form action={submit}>
                <input type="text" placeholder="URL" name="url" onChange={(e) => setCurrentURL(e.target.value)}/>
                <br />
                <input type="text" placeholder="Title" name="title" />
                <br />
                <textarea defaultValue="Description" name="description" />
                <br />
                <button>Submit</button>
            </form>
            {statusMessage ? (
                <p>{statusMessage}</p>
            ) : null}
            {currentURL ?
                <VideoPreview videoURL={currentURL}/>
                : null
            }
        </>
    )
}