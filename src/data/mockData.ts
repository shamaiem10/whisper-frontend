import memory1 from "@/assets/memory-1.jpg";
import memory2 from "@/assets/memory-2.jpg";
import memory3 from "@/assets/memory-3.jpg";
import memory4 from "@/assets/memory-4.jpg";
import destination1 from "@/assets/destination-1.jpg";
import destination2 from "@/assets/destination-2.jpg";
import destination3 from "@/assets/destination-3.jpg";

export interface Memory {
  id: string;
  image: string;
  location: string;
  country: string;
  feeling: string;
  mood: string;
  vibe: string;
  likes: number;
  date: string;
}

export interface Recommendation {
  id: string;
  city: string;
  country: string;
  image: string;
  reason: string;
  matchScore: number;
}

export const mockMemories: Memory[] = [
  {
    id: "1",
    image: memory1,
    location: "Santorini",
    country: "Greece",
    feeling: "Watching the sunset painted the sky in colors I've never seen before. Time stood still, and for a moment, everything felt perfect.",
    mood: "Peaceful",
    vibe: "Romantic",
    likes: 234,
    date: "2024-08-15"
  },
  {
    id: "2",
    image: memory2,
    location: "Tokyo",
    country: "Japan",
    feeling: "Cherry blossoms falling like snow. The beauty was so overwhelming, I couldn't help but cry happy tears.",
    mood: "Joyful",
    vibe: "Serene",
    likes: 567,
    date: "2024-04-10"
  },
  {
    id: "3",
    image: memory3,
    location: "Maldives",
    country: "Maldives",
    feeling: "Crystal clear water, white sand between my toes. This is what paradise feels like. Pure bliss and freedom.",
    mood: "Blissful",
    vibe: "Tropical",
    likes: 892,
    date: "2024-07-22"
  },
  {
    id: "4",
    image: memory4,
    location: "Reykjavik",
    country: "Iceland",
    feeling: "The aurora danced across the sky like magic. I felt so small yet so connected to the universe.",
    mood: "Awestruck",
    vibe: "Mystical",
    likes: 1234,
    date: "2024-02-28"
  }
];

export const mockRecommendations: Recommendation[] = [
  {
    id: "1",
    city: "Paris",
    country: "France",
    image: destination1,
    reason: "Your romantic and peaceful vibes match perfectly with Paris's charming streets and intimate cafes. The City of Light will embrace your contemplative soul.",
    matchScore: 92
  },
  {
    id: "2",
    city: "Bali",
    country: "Indonesia",
    image: destination2,
    reason: "Based on your serene and blissful memories, Bali's spiritual energy and lush landscapes will resonate deeply with your inner peace seeker.",
    matchScore: 88
  },
  {
    id: "3",
    city: "Cartagena",
    country: "Colombia",
    image: destination3,
    reason: "Your joyful and vibrant emotions align with Cartagena's colorful streets and warm Caribbean spirit. Perfect for your adventurous heart.",
    matchScore: 85
  }
];

export const mockPersonality = {
  type: "The Serene Explorer",
  description: "You are a traveler who seeks beauty in stillness and finds profound joy in quiet moments. Your journey is about emotional connection rather than checking off destinations. You're drawn to places that touch your soul and allow deep reflection.",
  topMoods: [
    { mood: "Peaceful", percentage: 35 },
    { mood: "Joyful", percentage: 28 },
    { mood: "Awestruck", percentage: 22 },
    { mood: "Blissful", percentage: 15 }
  ],
  topVibes: ["Romantic", "Serene", "Mystical", "Tropical"]
};
