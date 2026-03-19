import { useState } from "react";

export default function StarReview({ rating, setRating }) {
  const [hover, setHover] = useState(0);

  return (
    <div className="mb-5">
      <label className="block mb-2 text-sm font-medium text-text-primary">
        Leave a Review: {rating}
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
              <svg
                class="w-7 h-7 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
              </svg>
            </span>
          );
        })}
      </div>
    </div>
  );
}
