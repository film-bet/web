import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Trophy, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { featuredMovies } from "@/data/movieData";

const betTypes = [
  {
    icon: Calendar,
    title: "First Day Prediction",
    description: "Predict opening day box office performance",
    example: "Will 'Galactic Warriors' earn over $15M on day one?",
  },
  {
    icon: Trophy,
    title: "Weekend Champion",
    description: "Choose the weekend box office winner",
    example: "Which film will dominate March 15-17 weekend?",
  },
  {
    icon: TrendingUp,
    title: "Total Revenue",
    description: "Forecast total earnings within timeframe",
    example: "Predict 'Mystery Manor' 30-day total revenue",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-40 px-8">
        <div className="container mx-auto text-center max-w-5xl">
          <h2 className="text-6xl md:text-8xl font-light text-foreground mb-12 leading-tight">
            Predict the Future of
            <span className="block text-primary font-medium">Cinema</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-16 max-w-3xl mx-auto leading-relaxed">
            Test your Hollywood instincts. Compete with fellow film enthusiasts.
            Win by predicting box office performance.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <Link href="/auth/signup">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-28 py-6 text-lg shadow-md"
              >
                Start Predicting
                <ArrowRight className="ml-3 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/movies-bets">
              <Button
                size="lg"
                variant="outline"
                className="px-12 py-6 text-lg text-white border-border hover:bg-muted shadow-sm"
              >
                Browse Movies
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Bet Types */}
      <section className="py-32 px-8 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-24">
            <h3 className="text-5xl font-light text-foreground mb-8">
              Three Ways to Play
            </h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose your prediction style and test your movie industry
              knowledge
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {betTypes.map((bet, index) => (
              <Card
                key={index}
                className="bg-card border-border/50 hover:border-border transition-all duration-300 shadow-card hover:shadow-card-hover"
              >
                <CardHeader className="pb-8 pt-8 px-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-8">
                    <bet.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-medium text-foreground mb-4">
                    {bet.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground leading-relaxed text-lg">
                    {bet.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <div className="bg-muted/50 rounded-xl p-6 border border-border/30">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">
                        Example:
                      </span>{" "}
                      {bet.example}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Movies */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-16">
            <div>
              <h3 className="text-4xl font-light text-foreground mb-4">
                Featured Movies
              </h3>
              <p className="text-lg text-muted-foreground">
                Upcoming releases ready for predictions
              </p>
            </div>
            <Link href="/movies">
              <Button
                variant="outline"
                className="border-border hover:bg-muted"
              >
                View All Movies
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredMovies.map((movie) => (
              <Card
                key={movie.id}
                className="bg-card border-border/50 overflow-hidden hover:border-border transition-all duration-300 group"
              >
                <div className="relative">
                  <Image
                    src={movie.poster || "/placeholder.svg"}
                    alt={movie.title}
                    width={300}
                    height={400}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                    {movie.status}
                  </Badge>
                </div>
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-medium text-foreground">
                    {movie.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {movie.genre} • {movie.releaseDate}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Predicted Opening
                      </p>
                      <p className="text-2xl font-medium text-primary">
                        {movie.prediction}
                      </p>
                    </div>
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    Place Prediction
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-4 gap-12 text-center">
            <div>
              <h4 className="text-4xl font-light text-foreground mb-3">10K+</h4>
              <p className="text-muted-foreground">Active Predictors</p>
            </div>
            <div>
              <h4 className="text-4xl font-light text-foreground mb-3">
                $2.5M
              </h4>
              <p className="text-muted-foreground">Total Predictions</p>
            </div>
            <div>
              <h4 className="text-4xl font-light text-foreground mb-3">500+</h4>
              <p className="text-muted-foreground">Movies Tracked</p>
            </div>
            <div>
              <h4 className="text-4xl font-light text-foreground mb-3">85%</h4>
              <p className="text-muted-foreground">Accuracy Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-border/50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-primary-foreground rounded-sm" />
                </div>
                <h3 className="text-xl font-medium text-foreground">
                  BoxOfficeBets
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                The premier destination for movie box office predictions and
                entertainment.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-6">Platform</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li>
                  <Link
                    href="/movies"
                    className="hover:text-foreground transition-colors"
                  >
                    Movies
                  </Link>
                </li>
                <li>
                  <Link
                    href="/leaderboard"
                    className="hover:text-foreground transition-colors"
                  >
                    Leaderboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard"
                    className="hover:text-foreground transition-colors"
                  >
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-6">Support</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li>
                  <Link
                    href="/help"
                    className="hover:text-foreground transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-foreground transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-foreground transition-colors"
                  >
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-6">Company</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-foreground transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-foreground transition-colors"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="hover:text-foreground transition-colors"
                  >
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/50 mt-12 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 BoxOfficeBets. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
