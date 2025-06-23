// Code for the comments section on a video page.
'use client'

import { useState, useEffect } from 'react';

import { getComments } from "../lib/api.js";
import CommentList from "../components/comment-list.js";
import PostCommentForm from "../components/post-comment.js";


// Component for the comments section on a video page.
// Contains a form to post a new comment and a list of existing comments.
export default function CommentDisplay({ videoID }) {
    const [isLoading, setLoading] = useState(true);
    const [commentList, setCommentList] = useState(null);

    // Asynchronously load comments for the current video.
    async function fetchComments() {
        console.log("fetching comments");
        setLoading(true);
        try {
            const comments = await getComments(videoID);
            setCommentList(comments.comments);
        } catch (error) {
            console.error(error.message);
        }
        setLoading(false);
    }

    // Call fetchComments in a useEffect hook to synchronize with the external API.
    useEffect(() => {
        fetchComments();
    }, []);

    // TODO: with more time, I would update this component to hide the PostCommentForm
    // if videoID is not valid, to ensure that comments cannot be posted on videos that do not exist.

    // Hide the CommentList until comments load (or if the video has no comments)
    // We pass fetchComments to PostCommentForm as a prop so it can refresh the list of comments
    // and display new comments right away.
    if (!isLoading && commentList && commentList.length > 0) {
        return (
            <>
                <PostCommentForm videoID={videoID} onSubmit={() => {fetchComments()}}/>
                <CommentList commentList={commentList}/>
            </>
        )
    } else {
        return <PostCommentForm videoID={videoID} onSubmit={() => {fetchComments()}}/>
    }
}