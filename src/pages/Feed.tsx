import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { MemoryCard } from "@/components/MemoryCard";

interface Memory {
  id: number;
  photo: string;
  photo_url: string;
  location: string;
  feeling: string;
  mood: string;
  vibe: string;
  username: string;
  like_count: number;
}

const Feed = () => {
  const [memories, setMemories] = useState<Memory[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("access_token"); // JWT stored in localStorage

    if (!token) return;

    fetch("http://127.0.0.1:5000/feed", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setMemories(data);
      })
      .catch(err => console.error("Error fetching feed:", err));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fadeIn">
            <h1 className="text-4xl font-bold text-foreground mb-3">Travel Memories</h1>
            <p className="text-muted-foreground text-lg">
              Explore emotional journeys from around the world
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {memories.length === 0 ? (
              <p className="text-center col-span-full text-muted-foreground">
                No memories to show yet.
              </p>
            ) : (
              memories.map((memory) => <MemoryCard key={memory.id} memory={memory} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
