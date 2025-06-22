'use client'

import { useState, useEffect } from 'react';

import { getComments } from "../lib/api.js";
import CommentList from "/src/app/components/comment-list.js";
import PostCommentForm from "/src/app/components/post-comment.js";


export default function CommentDisplay({ videoID }) {
    const [isLoading, setLoading] = useState(true);
    const [commentList, setCommentList] = useState(null);

    async function fetchComments() {
        setLoading(true);
        try {
            const comments = await getComments(videoID);
            setCommentList(comments.comments);
        } catch (error) {
            console.error(error.message);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchComments();
    }, []);

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