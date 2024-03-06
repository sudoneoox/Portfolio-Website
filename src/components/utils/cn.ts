import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import "../../index.css"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}