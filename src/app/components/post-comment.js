'use client'

import { useState } from 'react';
import { postComment } from "/src/app/lib/api.js";

// TODO: this form is broken figure it out later
export default function PostCommentForm({ videoID, onSubmit }) {
    const [statusMessage, setStatusMessage] = useState(null);

    async function submit(formData) {
        setStatusMessage(null);

        const userID = formData.get("userID");
        const content = formData.get("content");

        try {
            await postComment({ user_id: userID, video_id: videoID, content: content });
            setStatusMessage("Success!");
            onSubmit();
        } catch (error) {
            setStatusMessage(error.message);
            console.error(error.message);
        }
    };

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