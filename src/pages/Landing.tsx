import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Camera, Sparkles, Map } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/80" />

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fadeIn">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
            Whisper
          </h1>
          <p className="text-xl md:text-3xl mb-8 text-foreground/90 font-light">
            Your Travel Memories. Your Emotions. Your Story.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" className="text-lg px-8 py-6">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                Signup
              </Button>
            </Link>
            <Link to="/feed">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                Explore Memories
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-foreground/30 rounded-full" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-foreground">
            Capture Your Journey
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="text-center space-y-4 animate-slideUp">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <Camera className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Upload Memories</h3>
              <p className="text-muted-foreground">
                Share your travel photos and feelings with the world
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center space-y-4 animate-slideUp" style={{ animationDelay: "0.1s" }}>
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">AI Insights</h3>
              <p className="text-muted-foreground">
                Discover the mood and vibe of your travel experiences
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center space-y-4 animate-slideUp" style={{ animationDelay: "0.2s" }}>
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <Map className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Get Recommendations</h3>
              <p className="text-muted-foreground">
                Find destinations that match your emotional travel history
              </p>
            </div>

            {/* Feature 4 */}
            <div className="text-center space-y-4 animate-slideUp" style={{ animationDelay: "0.3s" }}>
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Connect Emotionally</h3>
              <p className="text-muted-foreground">
                Share and discover stories that touch your heart
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
