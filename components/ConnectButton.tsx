"use client";
import { usePrivy, useLogin } from "@privy-io/react-auth";
import { Button } from "./ui/button";

export default function ConnectButton() {
  const { logout, ready, authenticated } = usePrivy();

  const { login } = useLogin();

  return (
    <div className="">
      {!authenticated ? (
        <Button
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 shadow-sm cursor-pointer"
          onClick={login}
        >
          Connect Wallet
        </Button>
      ) : (
        <Button
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 shadow-sm cursor-pointer"
          onClick={logout}
        >
          Disconnect
        </Button>
      )}
    </div>
  );
}
