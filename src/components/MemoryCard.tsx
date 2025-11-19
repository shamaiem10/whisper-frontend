import { Heart } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { useState } from "react";

interface MemoryCardProps {
  memory: {
    id: number;
    photo_url: string; // /uploads/filename.jpg
    location: string;
    feeling: string;
    mood: string;
    vibe: string;
    like_count: number;
    username: string;
  };
}

const BASE_URL = "http://127.0.0.1:5000"; // Flask backend URL

export const MemoryCard = ({ memory }: MemoryCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(memory.like_count);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes((prev) => prev + (isLiked ? -1 : 1));
  };

  return (
    <Card className="overflow-hidden group hover:shadow-[var(--shadow-hover)] transition-all duration-300 animate-fadeIn">
      
      {/* Image */}
      <div className="relative overflow-hidden aspect-square">
        <img
          src={`${BASE_URL}${memory.photo_url}`} // ✅ full URL
          alt={memory.location}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">

        <h3 className="text-lg font-semibold text-foreground">
          {memory.location}
        </h3>

        <p className="text-sm text-foreground/80 line-clamp-3">
          {memory.feeling}
        </p>

        <div className="flex gap-2 flex-wrap">
          <Badge variant="secondary">{memory.mood}</Badge>
          <Badge variant="outline">{memory.vibe}</Badge>
        </div>

        {/* Like Button */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handleLike}
            className="flex items-center gap-2"
          >
            <Heart
              className={`w-5 h-5 transition-all ${
                isLiked ? "fill-primary text-primary" : "text-muted-foreground"
              }`}
            />
            <span className="text-sm text-muted-foreground">{likes}</span>
          </button>
        </div>
      </div>
    </Card>
  );
};
