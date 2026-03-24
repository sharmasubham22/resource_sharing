import React, { useEffect, useState } from 'react';
import { useFirebase } from '../context/Firebase';
import Rating from './Rating';

export default function Comment({ comment, ratings }) {
  const [userData, setUserData] = useState(null);
  const firebase = useFirebase();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!comment.user_id) return;

      try {
        const user = await firebase.getUserById(comment.user_id);
        setUserData(user);
      } catch (err) {
        console.error('Error fetching user data for comment:', err);
        // Fallback to embedded user data if fresh fetch fails
        setUserData(comment.user);
      }
    };

    fetchUserData();
  }, [comment.user_id, firebase, comment.user]);

  // Find rating for this comment - prioritize comment-specific ratings over user-wide ratings
  const commentSpecificRating = ratings.find((r) => r.comment_id === comment.id);
  const userWideRating = ratings.find((r) => r.id === comment.user_id && r.comment_id !== comment.id);

  // Use comment-specific rating if available, otherwise fall back to user-wide rating
  const userRatings = commentSpecificRating ? [commentSpecificRating] :
                     userWideRating ? [userWideRating] : [];

 
  return (
    <div className="border-b border-border p-5 mt-5">
      <div className="flex items-center gap-2 mb-3">
        <img
          src={
            userData?.userPhoto ||
            comment.user?.userPhoto ||
            "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
          }
          className="rounded-full w-8 h-8 border border-brand-medium"
          alt="User avatar"
        />
        <p className="text-text-primary capitalize text-lg">
          {userData?.name || comment.userName || comment.user?.name || 'Anonymous'}
        </p>
        {userRatings.map((rating) => (
          <Rating key={rating.id} rating={rating.rating} />
        ))}
      </div>
      <p className="text-text-secondary text-md">{comment.comment}</p>
    </div>
  );
}