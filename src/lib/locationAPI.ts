import { AppLocalStorage } from "./utils";
import type { LocationData } from "./types";

const locationURL = "https://geocoding-api.open-meteo.com/v1/search";

export const Location = () => ({
  params: {
    name: "Berlin",
    count: 10,
    format: "json"
  },

  async Search (location: string): Promise<LocationData[]> {
    this.params.name = location;

    const paramStr = Object.entries(this.params).map(e => e[0] + '=' + e[1]).join('&');
    const url = locationURL + "?" + paramStr;

    const res = await fetch(url, { method: 'GET' });

    return await res.json()
      .then(({ results }: { results: any[] }) => {
        const result: LocationData[] = results.map(result => ({
          latitude: result.latitude,
          longitude: result.longitude,
          name: result.name,
          timezone: result.timezone,
          country: result.country === result.name ? undefined : result.country,
          state: result.admin1 ? result.admin1 : undefined,
        }));
        
        return result.slice(0, 4);
      });
  }
});