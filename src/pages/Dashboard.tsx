import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Heart, MapPin } from "lucide-react";
import { toast } from "sonner";

interface Memory {
  location: string;
  feeling: string;
  mood: string;
  vibe: string;
  date: string;
  image_url: string;
}

interface Personality {
  type: string;
  description: string;
  topVibes: string[];
}

interface TopMood {
  mood: string;
  percentage: number;
}

const Dashboard = () => {
  const [personality, setPersonality] = useState<Personality | null>(null);
  const [topMoods, setTopMoods] = useState<TopMood[]>([]);
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        toast.error("You must be logged in to view the dashboard.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://127.0.0.1:5000/dashboard-full", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setPersonality(data.personality);
          setTopMoods(data.topMoods);
          setMemories(data.memories);
        } else {
          toast.error(data.error || "Failed to fetch dashboard data");
        }
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong while fetching dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <p className="text-center mt-20">Loading dashboard...</p>;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Personality Section */}
          {personality && (
            <div className="grid lg:grid-cols-3 gap-6 mb-6">
              {/* Personality Card */}
              <div className="lg:col-span-2">
                <Card className="animate-slideUp shadow-[var(--shadow-soft)] h-full">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <User className="w-6 h-6 text-primary" />
                      <CardTitle className="text-2xl">{personality.type}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-foreground/80 leading-relaxed">{personality.description}</p>
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <Heart className="w-5 h-5 text-primary" />
                        Your Top Vibes
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {personality.topVibes.map((vibe) => (
                          <Badge
                            key={vibe}
                            variant="outline"
                            className="text-base px-4 py-2 border-primary/30 text-primary"
                          >
                            {vibe}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Top Moods Card */}
              <div className="lg:col-span-1">
                <Card className="animate-slideUp shadow-[var(--shadow-soft)] h-full">
                  <CardHeader>
                    <CardTitle>Top Moods</CardTitle>
                    <CardDescription>Your emotional distribution</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {topMoods.map((item) => (
                      <div key={item.mood} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium text-foreground">{item.mood}</span>
                          <span className="text-muted-foreground">{item.percentage}%</span>
                        </div>
                        <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-1000"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Memory Journey */}
          <Card className="mt-6 animate-slideUp shadow-[var(--shadow-soft)]">
            <CardHeader>
              <div className="flex items-center gap-2">
                <MapPin className="w-6 h-6 text-primary" />
                <CardTitle>Your Memory Journey</CardTitle>
              </div>
              <CardDescription>Places you've been and the emotions they sparked</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {memories.length > 0 ? (
                  memories.map((memory) => (
                    <div
                      key={memory.location + memory.date}
                      className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-primary/30 transition-colors"
                    >
                      <img
                        src={`http://127.0.0.1:5000${memory.image_url}`}
                        alt={memory.location}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">
                          {memory.location}
                        </h4>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {memory.feeling}
                        </p>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="secondary" className="text-xs">
                            {memory.mood}
                          </Badge>
                          <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                            {memory.vibe}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">{memory.date}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground">No memories yet.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
