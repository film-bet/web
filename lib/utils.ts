import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const shortenAddress = (address: string): string => {
  return address.slice(0, 6) + "..." + address.slice(-4);
};

export function handleOnDragStart(
  e: React.DragEvent<HTMLDivElement>,
  selectedBet: any
) {
  if (e.dataTransfer) {
    e.dataTransfer.setData("bet", JSON.stringify(selectedBet));
  }
} 

export function handleOnDrop(
  e: React.DragEvent<HTMLDivElement>,
  setBetData: React.Dispatch<React.SetStateAction<any[]>>
) {
  e.preventDefault();
  if (e.dataTransfer) {
    const bet = JSON.parse(e.dataTransfer.getData("bet"));
    setBetData((prev) => [...prev, bet]);
  }
}

export function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
  e.preventDefault();
}
