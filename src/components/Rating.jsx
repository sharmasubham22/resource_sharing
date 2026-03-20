import { Star } from "lucide-react";

export default function Rating({ rating = 0 }) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      // full star
      stars.push(
        <Star
          key={i}
          size={18}
          fill="currentColor"
          className="text-yellow-500"
        />,
      );
    } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
      // half star (approx)
      stars.push(
        <Star key={i} size={18} className="text-yellow-500 opacity-50" />,
      );
    } else {
      // empty star
      stars.push(<Star key={i} size={18} className="text-gray-300" />);
    }
  }

  return <div className="flex gap-1">{stars}</div>;
}
