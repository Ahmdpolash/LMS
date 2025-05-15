import { Star } from "lucide-react";

export const renderStars = (rating: number, size: "sm" | "md" = "sm") => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  const starSize = size === "sm" ? "h-4 w-4" : "h-5 w-5";

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Star
        key={`full-${i}`}
        className={`${starSize} fill-yellow-400 text-yellow-400`}
      />
    );
  }

  if (hasHalfStar) {
    stars.push(
      <div key="half" className="relative">
        <Star className={`${starSize} text-gray-300`} />
        <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
          <Star className={`${starSize} fill-yellow-400 text-yellow-400`} />
        </div>
      </div>
    );
  }

  const emptyStars = 5 - stars.length;
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <Star key={`empty-${i}`} className={`${starSize} text-gray-300`} />
    );
  }

  return stars;
};
