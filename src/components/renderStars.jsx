import { Star } from "lucide-react";

const RenderStars = ({rating}) => {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <Star className={`w-5 h-5 ${i < Math.round(rating) ? 'fill-yellow-500' : 'fill-gray-300'}`} />
      ))}
    </>
  );
};

export default RenderStars;
