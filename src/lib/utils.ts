import type { ClassValue } from "clsx"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { AppUnits, LocationData } from "./types";

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

export function formatLocation(location: LocationData, state=false) {
  return [
    location.name,
    state ? location.state : null,
    location.country
  ].filter(l => l).join(', ');
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

    if (!localStorage.getItem('location')) {
      localStorage.setItem('location', JSON.stringify({
        name: 'berlin',
        latitude: 52.52437,
        longitude: 13.41053,
        timezone: 'Europe/Berlin',
        country: 'Germany',
        admin1: undefined,
        state: undefined
      }));
    }
  }

  public static SetLocalStorage<T>(key: string, value: T) {
    if (value instanceof Object) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, String(value));
    }
  }

  public static GetLocalStorage(key: string) {
    const value = localStorage.getItem(key);

    if (value) {
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    }
  }
}
