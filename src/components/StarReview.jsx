import { useState } from "react";
import { Star } from "lucide-react";

export default function StarReview({ rating, setRating }) {
  const [hover, setHover] = useState(0);

  return (
    <div className="mb-5">
      <label className="block mb-2 font-medium text-text-primary">
        Leave a Review:
      </label>

      <div className="flex gap-1 text-3xl cursor-pointer">
        {[1, 2, 3, 4, 5].map((star) => {
          return (
            <span
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              className={`${
                star <= (hover || rating) ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              <Star fill="currentColor"/>
            </span>
          );
        })}
      </div>
    </div>
  );
}
