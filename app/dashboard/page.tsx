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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Target,
  TrendingUp,
  Trophy,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { activeBets, recentBets } from "@/data/movieData";

const userStats = {
  totalBets: 24,
  winRate: 68,
  totalWinnings: 1250,
  currentStreak: 5,
  rank: 42,
  points: 8750,
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-light text-foreground mb-4">
            Welcome back, John
          </h2>
          <p className="text-lg text-muted-foreground">
            Here's your prediction performance overview
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <Card className="bg-card border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Total Predictions
                  </p>
                  <p className="text-2xl font-light text-foreground">
                    {userStats.totalBets}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Win Rate</p>
                  <p className="text-2xl font-light text-foreground">
                    {userStats.winRate}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Points</p>
                  <p className="text-2xl font-light text-foreground">
                    {userStats.points}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Rank</p>
                  <p className="text-2xl font-light text-foreground">
                    #{userStats.rank}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-8"
        >
          <TabsList className="bg-muted/50 border border-border/50">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-card"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger value="active" className="data-[state=active]:bg-card">
              Active Predictions
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="data-[state=active]:bg-card"
            >
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Performance Chart */}
              <Card className="bg-card border-border/50">
                <CardHeader>
                  <CardTitle className="text-xl font-medium text-foreground">
                    Performance Overview
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Your prediction accuracy metrics
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-3">
                      <span className="text-muted-foreground">Win Rate</span>
                      <span className="text-foreground font-medium">
                        {userStats.winRate}%
                      </span>
                    </div>
                    <Progress value={userStats.winRate} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-3">
                      <span className="text-muted-foreground">
                        Current Streak
                      </span>
                      <span className="text-primary font-medium">
                        {userStats.currentStreak} wins
                      </span>
                    </div>
                    <Progress
                      value={(userStats.currentStreak / 10) * 100}
                      className="h-2"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-3">
                      <span className="text-muted-foreground">
                        Points Progress
                      </span>
                      <span className="text-primary font-medium">
                        {userStats.points}
                      </span>
                    </div>
                    <Progress
                      value={(userStats.points / 10000) * 100}
                      className="h-2"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="bg-card border-border/50">
                <CardHeader>
                  <CardTitle className="text-xl font-medium text-foreground">
                    Recent Activity
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Your latest prediction results
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentBets.slice(0, 3).map((bet) => (
                      <div
                        key={bet.id}
                        className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/30"
                      >
                        <div className="flex items-center space-x-3">
                          {bet.status === "won" ? (
                            <CheckCircle className="w-5 h-5 text-primary" />
                          ) : (
                            <XCircle className="w-5 h-5 text-accent-foreground" />
                          )}
                          <div>
                            <p className="text-foreground font-medium">
                              {bet.movie}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {bet.type}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={`font-medium ${
                              bet.status === "won"
                                ? "text-primary"
                                : "text-accent-foreground"
                            }`}
                          >
                            {bet.status === "won"
                              ? `+${bet.winnings}`
                              : `-${bet.amount}`}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {bet.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="active" className="space-y-8">
            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle className="text-xl font-medium text-foreground">
                  Active Predictions
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Your current pending predictions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {activeBets.map((bet) => (
                    <div
                      key={bet.id}
                      className="p-6 bg-muted/30 rounded-lg border border-border/30"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="text-foreground font-medium text-lg">
                            {bet.movie}
                          </h4>
                          <p className="text-muted-foreground">
                            {bet.type} Prediction
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className="border-primary text-primary"
                        >
                          <Clock className="w-3 h-3 mr-1" />
                          Pending
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                        <div>
                          <p className="text-muted-foreground mb-1">
                            Prediction
                          </p>
                          <p className="text-foreground font-medium">
                            {bet.prediction}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-1">Amount</p>
                          <p className="text-foreground font-medium">
                            {bet.amount}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-1">
                            Potential Win
                          </p>
                          <p className="text-primary font-medium">
                            {Math.round(
                              bet.amount * Number.parseFloat(bet.odds)
                            )}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-1">Deadline</p>
                          <p className="text-foreground font-medium">
                            {bet.deadline}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-8">
            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle className="text-xl font-medium text-foreground">
                  Prediction History
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  All your completed predictions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {recentBets.map((bet) => (
                    <div
                      key={bet.id}
                      className="p-6 bg-muted/30 rounded-lg border border-border/30"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="text-foreground font-medium text-lg">
                            {bet.movie}
                          </h4>
                          <p className="text-muted-foreground">
                            {bet.type} Prediction
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            bet.status === "won"
                              ? "border-primary text-primary"
                              : "border-accent text-accent-foreground"
                          }
                        >
                          {bet.status === "won" ? (
                            <CheckCircle className="w-3 h-3 mr-1" />
                          ) : (
                            <XCircle className="w-3 h-3 mr-1" />
                          )}
                          {bet.status === "won" ? "Won" : "Lost"}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-sm">
                        <div>
                          <p className="text-muted-foreground mb-1">
                            Prediction
                          </p>
                          <p className="text-foreground font-medium">
                            {bet.prediction}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-1">Actual</p>
                          <p className="text-foreground font-medium">
                            {bet.actual}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-1">Amount</p>
                          <p className="text-foreground font-medium">
                            {bet.amount}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-1">Result</p>
                          <p
                            className={`font-medium ${
                              bet.status === "won"
                                ? "text-primary"
                                : "text-accent-foreground"
                            }`}
                          >
                            {bet.status === "won"
                              ? `+${bet.winnings}`
                              : `-${bet.amount}`}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-1">Date</p>
                          <p className="text-foreground font-medium">
                            {bet.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
