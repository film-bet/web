import type { PrivyClientConfig } from "@privy-io/react-auth";
import {
  base,
  polygon,
  arbitrum,
  storyOdyssey,
  mantle,
  baseSepolia,
} from "viem/chains";

export const privyConfig: PrivyClientConfig = {
  embeddedWallets: {
    createOnLogin: "users-without-wallets",
    requireUserPasswordOnCreate: true,
    showWalletUIs: true,
  },
  loginMethods: [
    "wallet",
    "email",
    "sms",
    "apple",
    "discord",
    "farcaster",
    "github",
    "google",
    "spotify",
    "linkedin",
    "telegram",
    "tiktok",
  ],
  appearance: {
    showWalletLoginFirst: true,
  },
  defaultChain: baseSepolia,
};
