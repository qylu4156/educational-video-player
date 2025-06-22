// Code to display a list of comments.
'use client'

// Component to display a single comment.
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

// Component to display a list of comments.
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