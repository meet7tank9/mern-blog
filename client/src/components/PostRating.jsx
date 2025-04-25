import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { UserContext } from '../context/userContext';

const PostRating = ({ postId, ratings = [] }) => {
    const [rating, setRating] = useState(0);
    const [averageRating, setAverageRating] = useState(0);
    const { currentUser } = useContext(UserContext);
    const [ratingLength, setRatingLength] = useState(0)

    useEffect(() => {
        const getRating = async () => {
            const avg = ratings.length
                ? ratings.reduce((a, r) => a + r.value, 0) / ratings.length
                : 0;
            setAverageRating(avg.toFixed(1));

            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${postId}/totalRatings`);
            setRatingLength(response.data.ratingLength);

            if (currentUser) {
                const userRating = ratings.find(r => r.userId === currentUser.id);
                if (userRating) {
                    setRating(userRating.value);
                }
            }
        };

        getRating();
    }, [ratings, currentUser, postId]);


    const handleRate = async (value) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/posts/${postId}/rate`, { value }, {
                headers: { Authorization: `Bearer ${currentUser.token}` }
            });
            setAverageRating(res.data.averageRating.toFixed(1));
            setRating(value);
            
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${postId}/totalRatings`);
            setRatingLength(response.data.ratingLength);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="rating-section">
            <p>Rating : {averageRating} ⭐ {`( ${ratingLength} )`}</p>
            <div className="rate-post" style={{ fontSize: '30px' }}>
                {[1, 2, 3, 4, 5].map((num) => (
                    <span
                        key={num}
                        onClick={() => handleRate(num)}
                        style={{ cursor: 'pointer', color: rating >= num ? 'gold' : 'gray' }}
                    >
                        ★
                    </span>
                ))}
            </div>
        </div>
    );
};

export default PostRating;
