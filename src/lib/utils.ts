import type { ClassValue } from "clsx"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { AppUnits } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function GetIconFromWeatherCode(code: number) {  
  switch (code) {
    case 0:
    case 1: return "icon-sunny.webp";

    case 2: return "icon-partly-cloudy.webp";
    case 3: return "icon-overcast.webp";

    case 45:
    case 48: return "icon-fog.webp";

    case 51: 
    case 53:
    case 55:
    case 56:
    case 57: return "icon-drizzle.webp";

    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
    case 80:
    case 81:
    case 82: return "icon-rain.webp";

    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86: return "icon-snow.webp";

    case 95:
    case 96:
    case 99: return "icon-storm.webp";

    default: return "icon-sunny.webp";
  }
}

export class AppLocalStorage {
  constructor() {}

  public static InitLocalStorage() {
    if (!localStorage.getItem("units")) {
      localStorage.setItem("units", 
        JSON.stringify({
        temperature: "si",
        speed: "si",
        precipitation: "si"
      } as AppUnits));  
    };
  }

  public static SetLocalStorage(value: AppUnits) {
    const entry = JSON.stringify(value);
    localStorage.setItem("units", entry);
  }

  public static GetLocalStorage(): AppUnits {
    const units = localStorage.getItem("units");
    if (units) {
      return JSON.parse(units);
    }
    
    return {
      temperature: "si",
      speed: "si",
      precipitation: "si"
    };
  }
}
