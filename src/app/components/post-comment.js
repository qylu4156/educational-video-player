// Code to post a new comment on a video.
'use client'

import { useState } from 'react';

import { postComment } from "../lib/api.js";

// Component for a form to post a new comment on a video.
// This component posts a new comment to the current video, allowing the user to specify user_id and content.
// Takes a function onSubmit as a prop. This function updates the list of comments
// so the new comment displays right away.
export default function PostCommentForm({ videoID, onSubmit }) {
    const [statusMessage, setStatusMessage] = useState(null);

    // Try to submit a comment. Sets the status message to "Success!" or an error message if there is an error.
    async function submit(formData) {
        setStatusMessage(null);

        const userID = formData.get("userID");
        const content = formData.get("content");

        try {
            await postComment({ user_id: userID, video_id: videoID, content: content });
            setStatusMessage("Success!");
            onSubmit();
        } catch (error) {
            // TODO: with more time, I would parse this into a more user-friendly error message instead of
            // passing on the exact error from JS.
            setStatusMessage(error.message);
            console.error(error.message);
        }
    };

    // Show the status message only if it has any content.
    return (
        <>
            <h2>Post comment</h2>
            <form action={submit}>
                <input type="text" name="userID" placeholder="user ID" />
                <br />
                <textarea defaultValue="Comment text" name="content" />
                <br />
                <button type="submit">Submit</button>
            </form>
            {statusMessage ? (
                <p>{statusMessage}</p>
            ) : null
            }
        </>
    )
}