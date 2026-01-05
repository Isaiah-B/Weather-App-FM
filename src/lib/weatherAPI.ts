import { fetchWeatherApi } from "openmeteo";

import { GetIconFromWeatherCode } from "./utils";
import type { AppUnits } from "./types";

export const baseParams = {
  latitude: 30.3674,
  longitude: -89.0928,
  timezone: "auto",
  hourly: ["temperature_2m", "weather_code"],
  daily: ["weather_code", "temperature_2m_max", "temperature_2m_min"],
  current: ["temperature_2m", "apparent_temperature", "relative_humidity_2m", "is_day", "precipitation", "wind_speed_10m", "weather_code"],
}

export const fetchWeatherData = async (url: string, units: AppUnits, params: any) => {
  const responses = await fetchWeatherApi(url, params);

  const current = responses[0]!.current()!;
  const daily = responses[0]!.daily()!;
  const hourly = responses[0]!.hourly()!;
  const utcOffsetSeconds = responses[0]!.utcOffsetSeconds()!;

  const daily_weather_codes = daily.variables(0);
  const daily_temp_max = daily.variables(1);
  const daily_temp_min = daily.variables(2);

  const hourly_temp = hourly.variables(0);
  const hourly_weather_codes = hourly.variables(1);

  return {
    current: {
      temperature: current.variables(0)!.value().toFixed(0),
      apparent_temperature: current.variables(1)!.value().toFixed(0),
      humidity: current.variables(2)!.value().toFixed(0),
      is_day: current.variables(3)!.value(),
      precipitation: current.variables(4)!.value().toFixed(0) + (units.precipitation === "si" ? " mm" : " in"),
      wind: current.variables(5)!.value().toFixed(0) + (units.speed === "si" ? " km/h" : " mph"),
      icon: GetIconFromWeatherCode(current.variables(6)!.value())
    },
    daily: {
      weather_codes: Array.from(daily_weather_codes!.valuesArray()?.values()!, (_, i) => daily_weather_codes!.values(i)!),
      temperature_max: Array.from(daily_temp_max!.valuesArray()?.values()!, (_, i) => daily_temp_max!.values(i)!.toFixed(0)),
      temperature_min: Array.from(daily_temp_min!.valuesArray()?.values()!, (_, i) => daily_temp_min!.values(i)!.toFixed(0)),
    },
    hourly: {
      time: Array.from(
        { length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval() },
        (_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000 )
      ),
      weather_codes: Array.from(hourly_weather_codes?.valuesArray()?.values()!, (_, i) => hourly_weather_codes!.values(i)!),
      temperature: Array.from(hourly_temp?.valuesArray()?.values()!, (_, i) => hourly_temp!.values(i)!.toFixed(0)),
    }
  }
}