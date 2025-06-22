"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { movies } from "@/data/movieData";

export default function MoviesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedMovie, setSelectedMovie] = useState<(typeof movies)[0] | null>(
    null
  );
  const [betType, setBetType] = useState("");
  const [betAmount, setBetAmount] = useState("");
  const [prediction, setPrediction] = useState("");

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch =
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.director.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.genre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre =
      selectedGenre === "all" || movie.genre.toLowerCase() === selectedGenre;
    const matchesStatus =
      selectedStatus === "all" || movie.status === selectedStatus;

    return matchesSearch && matchesGenre && matchesStatus;
  });

  const upcomingMovies = filteredMovies.filter(
    (movie) => movie.status === "upcoming"
  );
  const releasedMovies = filteredMovies.filter(
    (movie) => movie.status === "released"
  );

  const handlePlaceBet = () => {
    console.log("Placing prediction:", {
      movie: selectedMovie?.title,
      betType,
      betAmount,
      prediction,
    });
    setSelectedMovie(null);
    setBetType("");
    setBetAmount("");
    setPrediction("");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-primary-foreground rounded-sm" />
              </div>
              <h1 className="text-2xl font-medium text-foreground">
                BoxOfficeBets
              </h1>
            </Link>
            <nav className="hidden md:flex items-center space-x-12">
              <Link href="/movies" className="text-foreground font-medium">
                Movies
              </Link>
              <Link
                href="/leaderboard"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Leaderboard
              </Link>
              <Link
                href="/dashboard"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Dashboard
              </Link>
            </nav>
            <Button variant="outline" className="border-border hover:bg-muted">
              Profile
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="mb-16">
          <h2 className="text-4xl font-light text-foreground mb-4">Movies</h2>
          <p className="text-lg text-muted-foreground">
            Browse and predict the latest Hollywood releases
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search movies, directors, genres..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 bg-background border-border text-foreground placeholder:text-muted-foreground h-12"
              />
            </div>
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger className="w-full md:w-48 bg-background border-border text-foreground h-12">
                <SelectValue placeholder="Genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genres</SelectItem>
                <SelectItem value="action">Action</SelectItem>
                <SelectItem value="comedy">Comedy</SelectItem>
                <SelectItem value="sci-fi">Sci-Fi</SelectItem>
                <SelectItem value="thriller">Thriller</SelectItem>
                <SelectItem value="romance">Romance</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-48 bg-background border-border text-foreground h-12">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Movies</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="released">Released</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Movies Tabs */}
        <Tabs defaultValue="upcoming" className="space-y-8">
          <TabsList className="bg-muted/50 border border-border/50">
            <TabsTrigger
              value="upcoming"
              className="data-[state=active]:bg-card"
            >
              Upcoming ({upcomingMovies.length})
            </TabsTrigger>
            <TabsTrigger
              value="released"
              className="data-[state=active]:bg-card"
            >
              Released ({releasedMovies.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingMovies.map((movie) => (
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
                      {movie.genre} •{" "}
                      {new Date(movie.releaseDate).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Director</span>
                        <span className="text-foreground font-medium">
                          {movie.director}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Studio</span>
                        <span className="text-foreground font-medium">
                          {movie.studio}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Budget</span>
                        <span className="text-foreground font-medium">
                          {movie.budget}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Predicted Opening
                        </span>
                        <span className="text-primary font-medium text-lg">
                          {movie.prediction}
                        </span>
                      </div>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                          onClick={() => setSelectedMovie(movie)}
                        >
                          Place Prediction
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-card border-border text-foreground max-w-md">
                        <DialogHeader>
                          <DialogTitle className="text-xl font-medium">
                            Place Prediction
                          </DialogTitle>
                          <DialogDescription className="text-muted-foreground">
                            Make your prediction for {selectedMovie?.title}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-6 pt-4">
                          <div>
                            <Label
                              htmlFor="betType"
                              className="text-foreground font-medium"
                            >
                              Prediction Type
                            </Label>
                            <Select value={betType} onValueChange={setBetType}>
                              <SelectTrigger className="bg-background border-border text-foreground mt-2">
                                <SelectValue placeholder="Select prediction type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="first-day">
                                  First Day Box Office
                                </SelectItem>
                                <SelectItem value="weekend">
                                  Weekend Champion
                                </SelectItem>
                                <SelectItem value="total">
                                  Total Revenue (30 days)
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label
                              htmlFor="prediction"
                              className="text-foreground font-medium"
                            >
                              Your Prediction
                            </Label>
                            <Input
                              id="prediction"
                              placeholder="e.g., $15M, #1 position, $100M"
                              value={prediction}
                              onChange={(e) => setPrediction(e.target.value)}
                              className="bg-background border-border text-foreground placeholder:text-muted-foreground mt-2"
                            />
                          </div>
                          <div>
                            <Label
                              htmlFor="betAmount"
                              className="text-foreground font-medium"
                            >
                              Points to Wager
                            </Label>
                            <Input
                              id="betAmount"
                              type="number"
                              placeholder="50"
                              value={betAmount}
                              onChange={(e) => setBetAmount(e.target.value)}
                              className="bg-background border-border text-foreground placeholder:text-muted-foreground mt-2"
                            />
                          </div>
                          <Button
                            onClick={handlePlaceBet}
                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                            disabled={!betType || !prediction || !betAmount}
                          >
                            Confirm Prediction
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="released">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {releasedMovies.map((movie) => (
                <Card
                  key={movie.id}
                  className="bg-card border-border/50 overflow-hidden"
                >
                  <div className="relative">
                    <Image
                      src={movie.poster || "/placeholder.svg"}
                      alt={movie.title}
                      width={300}
                      height={400}
                      className="w-full h-80 object-cover"
                    />
                    <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
                      Released
                    </Badge>
                  </div>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-medium text-foreground">
                      {movie.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {movie.genre} •{" "}
                      {new Date(movie.releaseDate).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Director</span>
                        <span className="text-foreground font-medium">
                          {movie.director}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Studio</span>
                        <span className="text-foreground font-medium">
                          {movie.studio}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Budget</span>
                        <span className="text-foreground font-medium">
                          {movie.budget}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Predicted</span>
                        <span className="text-muted-foreground">
                          {movie.prediction}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Actual Opening
                        </span>
                        <span className="text-primary font-medium text-lg">
                          {movie.actual}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full border-border hover:bg-muted"
                    >
                      View Results
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
