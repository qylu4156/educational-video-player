'use client'

import { getComments } from "../lib/api.js";

import { useState, useEffect } from 'react';

export function Comment(params) {
    const createdAt = new Date(params.created_at);
    return (
        <>
            <p><i>{params.user_id}</i></p>
            <p><i>{createdAt.toLocaleString("en-US")}</i></p>
            <p>{params.content}</p>
        </>
    )
}

export default function CommentList({ commentList }) {
    const listItems = commentList.map(comment => {
        return (
            <li key={comment.id}>
                <Comment {...comment} />
            </li>
        )
    })

    return (
        <>
            <ul style={{listStyleType: "none"}}>{listItems}</ul>
        </>
    )
}