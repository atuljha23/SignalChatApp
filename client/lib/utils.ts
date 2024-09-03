import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { NextComponentType } from "next";
import { useAppStore } from "@/store";
import { redirect } from "next/navigation";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const colors = [
  "bg-red-500 text-white border-[1px] border-red-500",
  "bg-yellow-500 text-white border-[1px] border-yellow-500",
  "bg-green-500 text-white border-[1px] border-green-500",
  "bg-blue-500 text-white border-[1px] border-blue-500",
  "bg-indigo-500 text-white border-[1px] border-indigo-500",
  "bg-purple-500 text-white border-[1px] border-purple-500",
  "bg-pink-500 text-white border-[1px] border-pink-500",
];

export const getColor = (color: number) => {
  if (color >= 0 && color < colors.length) {
    return colors[color];
  }
  return colors[0]; // default color
};
