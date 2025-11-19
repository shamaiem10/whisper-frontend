import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const Upload = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [location, setLocation] = useState("");
  const [country, setCountry] = useState("");
  const [feeling, setFeeling] = useState("");
  const [date, setDate] = useState("");
  const [aiInsight, setAiInsight] = useState("AI insight will appear here...");
  const [detectedMood, setDetectedMood] = useState("Peaceful");
  const [detectedVibe, setDetectedVibe] = useState("Romantic");

  const token = localStorage.getItem("access_token");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fileInput = document.getElementById("image-upload") as HTMLInputElement;
    const file = fileInput?.files?.[0];
    if (!file) return toast.error("Please select a photo.");
    if (!token) return toast.error("You must be logged in.");

    const formData = new FormData();
    formData.append("photo", file);
    formData.append("location", location);
    formData.append("feeling", feeling);
    formData.append("mood", detectedMood);
    formData.append("vibe", detectedVibe);

    try {
      const res = await fetch("http://127.0.0.1:5000/memory", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        setPreviewImage(null);
        setLocation("");
        setCountry("");
        setFeeling("");
        setDate("");
        setAiInsight("AI insight will appear here...");
        setDetectedMood("Peaceful");
        setDetectedVibe("Romantic");
      } else {
        toast.error(data.error || "Failed to upload memory");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while uploading memory");
    }
  };

  // Fetch AI Insight whenever location or feeling changes
  useEffect(() => {
    if (!location || !feeling || !token) {
      setAiInsight("Provide location & feelings to see AI insight");
      setDetectedMood("Peaceful");
      setDetectedVibe("Romantic");
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/ai-insight", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ location, feeling }),
        });
        const data = await res.json();
        if (res.ok) {
          setAiInsight(data.insight);

          // Keyword-based mapping
          const text = data.insight.toLowerCase();
          if (text.includes("happy") || text.includes("joy") || text.includes("excited")) setDetectedMood("Happy");
          else if (text.includes("calm") || text.includes("relaxed") || text.includes("peaceful")) setDetectedMood("Peaceful");
          else if (text.includes("sad") || text.includes("lonely")) setDetectedMood("Melancholy");
          else setDetectedMood("Neutral");

          if (text.includes("romantic") || text.includes("love") || text.includes("passion")) setDetectedVibe("Romantic");
          else if (text.includes("nature") || text.includes("mountain") || text.includes("sea")) setDetectedVibe("Nature");
          else if (text.includes("adventure") || text.includes("fun")) setDetectedVibe("Adventurous");
          else setDetectedVibe("Chill");

        } else {
          setAiInsight("AI insight could not be generated.");
          setDetectedMood("Peaceful");
          setDetectedVibe("Romantic");
        }
      } catch (err) {
        console.error(err);
        setAiInsight("AI error");
        setDetectedMood("Peaceful");
        setDetectedVibe("Romantic");
      }
    }, 500); // debounce API calls

    return () => clearTimeout(timeoutId);
  }, [location, feeling, token]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 animate-fadeIn">
            <h1 className="text-4xl font-bold text-foreground mb-3">Create Memory</h1>
            <p className="text-muted-foreground text-lg">Share your travel story with the world</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Upload Form */}
            <div className="lg:col-span-2">
              <Card className="animate-slideUp shadow-[var(--shadow-soft)]">
                <CardHeader>
                  <CardTitle>Upload Your Memory</CardTitle>
                  <CardDescription>Share the moments that touched your heart</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Image Upload */}
                    <div className="space-y-2">
                      <Label>Photo</Label>
                      <div className="relative">
                        <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="image-upload"/>
                        <label htmlFor="image-upload" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors overflow-hidden">
                          {previewImage ? <img src={previewImage} alt="Preview" className="w-full h-full object-cover"/> :
                            <div className="flex flex-col items-center">
                              <Camera className="w-12 h-12 text-muted-foreground mb-2" />
                              <p className="text-sm text-muted-foreground">Click to upload photo</p>
                            </div>
                          }
                        </label>
                      </div>
                    </div>

                    {/* Location & Country */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="location">City</Label>
                        <Input id="location" placeholder="Santorini" value={location} onChange={(e) => setLocation(e.target.value)} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Input id="country" placeholder="Greece" value={country} onChange={(e) => setCountry(e.target.value)} required />
                      </div>
                    </div>

                    {/* Feeling */}
                    <div className="space-y-2">
                      <Label htmlFor="feeling">Your Feeling</Label>
                      <Textarea id="feeling" placeholder="Describe the emotions this place made you feel..." rows={5} value={feeling} onChange={(e) => setFeeling(e.target.value)} required />
                    </div>

                    {/* Date */}
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                    </div>

                    <Button type="submit" className="w-full" size="lg">Share Memory</Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* AI Insights Panel */}
            <div className="lg:col-span-1">
              <Card className="animate-slideUp shadow-[var(--shadow-soft)] sticky top-24">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <CardTitle>AI Insights</CardTitle>
                  </div>
                  <CardDescription>Emotional analysis of your memory</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-sm text-muted-foreground">{aiInsight}</p>
                  <div>
                    <Label className="text-sm mb-2 block">Detected Mood</Label>
                    <Badge variant="secondary" className="text-base px-4 py-2">{detectedMood}</Badge>
                  </div>
                  <div>
                    <Label className="text-sm mb-2 block">Detected Vibe</Label>
                    <Badge variant="outline" className="text-base px-4 py-2 border-primary/30 text-primary">{detectedVibe}</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
