import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { RecommendationCard } from "@/components/RecommendationCard";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

interface Recommendation {
  place: string;
  area: string;
  reason: string;
  image_url: string;
}

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        toast.error("You must be logged in to see recommendations.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://127.0.0.1:5000/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setRecommendations(data.recommendations || []);
        } else {
          toast.error(data.error || "Failed to fetch recommendations");
        }
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong while fetching recommendations");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-12 animate-fadeIn">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">WhisperAI Recommendations</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Based on your emotional travel history, these destinations are calling to you
          </p>
        </div>

        {loading ? (
          <p className="text-center text-muted-foreground">Loading recommendations...</p>
        ) : (
          <div className="space-y-6">
            {recommendations.length > 0 ? (
              recommendations.map((rec, idx) => (
                <RecommendationCard key={idx} recommendation={rec} />
              ))
            ) : (
              <p className="text-center text-muted-foreground">No recommendations available yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Recommendations;
