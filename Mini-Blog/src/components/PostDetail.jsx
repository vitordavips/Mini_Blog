import styles from './PostDetail.module.css';

import React from 'react'

export const PostDetail = () => {
  return (
    <div className={styles.post_detail}>
        <img src={post.image} alt={post.tile} />
        <h2>{post.title}</h2>
        <p className={styles.createdby}>{post.createdBy}</p>
        <div className={styles.tags}>
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
