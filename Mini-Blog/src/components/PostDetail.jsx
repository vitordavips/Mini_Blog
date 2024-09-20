import styles from './PostDetail.module.css';

import React from 'react'

export const PostDetail = () => {
  return (
    <div>
        <img src={post.image} alt={post.tile} />
        <h2>{post.title}</h2>
        <p>{post.createdBy}</p>
        <div>
            {post.tags.map((tag) => (
                <p key={tag}>
                    <span>#</span>
                    {tag}
                </p>
            ))}
        </div>
        <Link to={`/post/${post.id}`} className="btn btn-outline">Ler</Link>
    </div>
  )
}

export default PostDetail
