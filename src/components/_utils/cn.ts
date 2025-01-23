import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import "../../tailwind-styles.css"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
