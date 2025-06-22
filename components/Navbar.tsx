import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import "../app/globals.css";
import ConnectButton from "./ConnectButton";

const Navbar = () => {
  return (
    <header className="border-b border-border/50 bg-background">
      <div className="container mx-auto px-8 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-sm">
              <div className="w-5 h-5 bg-primary-foreground rounded-sm" />
            </div>
            <h1 className="text-2xl font-medium text-foreground">
              BoxOfficeBets
            </h1>
          </div>
          <nav className="hidden md:flex items-center space-x-16">
            <Link
              href="/movie-bets"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Movie Bets
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
          <div className="flex items-center space-x-6">
            <ConnectButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
