export type AppUnit = "si" | "imperial"

export interface AppUnits {
  temperature: AppUnit,
  speed: AppUnit,
  precipitation: AppUnit
}

export interface WeatherData {
  current: {
    temperature: string
    apparent_temperature: string;
    humidity: string,
    is_day: number,
    precipitation: string,
    wind: string,
    icon: string,
  },
  daily: {
    weather_codes: number[],
    temperature_max: string[],
    temperature_min: string[],
    timezone: string
  },
  hourly: {
    time: Date[],
    weather_codes: number[],
    temperature: string[]
    timezone: string
  },
};

export interface LocationData {
  name: string,
  latitude: number,
  longitude: number,
  timezone: string,
  country?: string,
  state?: string,
}