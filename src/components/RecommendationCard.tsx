import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MapPin, Star, Coffee, Activity } from "lucide-react";

interface RecommendationCardProps {
  recommendation: {
    place: string;
    area: string;
    reason: string;
    specialties?: string; // food, landmarks, culture
    fun_activity?: string; // fun thing to do
  };
}

export const RecommendationCard = ({ recommendation }: RecommendationCardProps) => {
  const colors = ["bg-primary/10", "bg-secondary/10", "bg-accent/10"];
  const color = colors[Math.floor(Math.random() * colors.length)];

  return (
    <Card className={`animate-slideUp shadow-[var(--shadow-soft)] ${color} border border-border hover:border-primary/50 transition-all`}>
      <CardHeader className="flex items-center gap-2">
        <MapPin className="w-6 h-6 text-primary" />
        <CardTitle className="text-lg font-bold">{recommendation.place}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <CardDescription>
          <strong>Region:</strong> {recommendation.area} <br />
          <strong>Why you’ll love it:</strong> {recommendation.reason}
        </CardDescription>

        {recommendation.specialties && (
          <div className="mt-2">
            <h4 className="flex items-center gap-1 text-sm font-semibold text-primary">
              <Coffee className="w-4 h-4" /> Local Specialties
            </h4>
            <p className="text-sm text-foreground/80">{recommendation.specialties}</p>
          </div>
        )}

        {recommendation.fun_activity && (
          <div className="mt-2">
            <h4 className="flex items-center gap-1 text-sm font-semibold text-primary">
              <Star className="w-4 h-4" /> Fun Activity
            </h4>
            <p className="text-sm text-foreground/80">{recommendation.fun_activity}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
