import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PostAuthor from './PostAuthor'
import axios from 'axios'

const PostItem = ({ postId, thumbnail, category, title, description, authorId, ratings, createdAt }) => {
    const shortDescription = description.length > 145 ? description.substr(0, 145) + "..." : description
    const shortTitle = title.length > 30 ? title.substr(0, 30) + "..." : title
    const [averageRating, setAverageRating] = useState(0);
    const [ratingLength, setRatingLength] = useState(0)

    useEffect(() => {
        const getRating = async () => {

            const avg = await ratings?.length
                ? ratings.reduce((a, r) => a + r.value, 0) / ratings?.length
                : 0;
            setAverageRating(avg.toFixed(1));

            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${postId}/totalRatings`);
            // console.log(response);
            setRatingLength(response.data.ratingLength)
        }

        getRating()
        // console.log("running")
    }, []);

    return (
        <article className="post">
            <div className="post_thumbnail">
                <Link to={`/posts/${postId}`}>
                    <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${thumbnail}`} alt={title} />
                </Link>
            </div>
            <div>
                <p className='' style={{ textAlign: 'left', width: '100' }}>Rating : ⭐ {averageRating} {`( ${ratingLength} )`}</p>
            </div>
            <div className="post_content">
                <Link to={`/posts/${postId}`}>
                    <h4>{shortTitle}</h4>
                    <p dangerouslySetInnerHTML={{ __html: shortDescription }} />
                </Link>
                <div className="post_footer">
                    <PostAuthor authorId={authorId} createdAt={createdAt} />
                    <Link to={`/posts/categories/${category}`} className='btn primary'>{category}</Link>
                </div>
            </div>
        </article >
    )
}

export default PostItem