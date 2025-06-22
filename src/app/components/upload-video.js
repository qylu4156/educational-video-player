// Code to upload a video.
import { useState } from 'react';

import dynamic from "next/dynamic";

import { postVideo } from "../lib/api.js";

// Import ReactPlayer without SSR to avoid hydration errors when using external class component.
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })


// Component to show a preview of the video which will be uploaded.
// Uses ReactPlayer in light mode (show only a thumbnail until user interacts with the component).
function VideoPreview({ videoURL }) {
    return (
        <>
            <p>Video preview</p>
            <ReactPlayer url={videoURL} light={true}/>
        </>
    )
}

// Component to upload a video.
// This component posts a video under the userID set in session storage.
export default function VideoUploader() {
    const [statusMessage, setStatusMessage] = useState(null);
    const [currentURL, setCurrentURL] = useState(null);

    // Try to post a video. Sets the status message to "Success!" or an error message if there is an error.
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
            // TODO: with more time, I would parse this into a more user-friendly error message instead of
            // passing on the exact error from JS.
            setStatusMessage(error.message);
            console.error(error.message);
        }
    }

    // Show the status message only if it has any content.
    // Show a preview of the video when a URL is entered into the form.
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