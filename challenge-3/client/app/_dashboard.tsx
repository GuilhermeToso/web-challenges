"use client";

import { WeatherInterface } from "@/interfaces/weather";
import { ChangeEvent, useState } from "react";
import { CiSearch } from "react-icons/ci";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

const chartConfig = {
  temperature: {
    label: "Temperature",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function Dashboard() {
  const [weather, setWeather] = useState<WeatherInterface | null>(null);
  const [city, setCity] = useState<string>("");

  console.log(`Weather: ${weather}`);
  const fetchWeather = () => {
    fetch(`http://localhost:8000/api/v1/weather?city=${city}`)
      .then((response) => response.json())
      .then((data) => setWeather(data))
      .catch((error) => console.log(error));
  };
  return (
    <div className="w-full flex flex-col justify-start items-center">
      <div className="w-full flex flex-row justify-center items-center h-16 border-b-[1px] border-slate-600">
        <input
          type="text"
          placeholder="City name"
          className="input input-bordered text-white my-2"
          value={city}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            e.preventDefault();
            setCity(e.target.value);
          }}
        ></input>
        <button onClick={fetchWeather}>
          <CiSearch className="text-slate-400 ml-2 my-2" size={32}></CiSearch>
        </button>
      </div>
      <div
        className={`w-full flex flex-col ${
          weather === null ? "justficy-center" : "justify-start"
        } items-center`}
      >
        {weather === null ? (
          <div className="w-full h-[500px] flex flex-row justify-center items-center">
            <h1 className="text-lg text-white font-bold">
              Search for a valid city
            </h1>
          </div>
        ) : (
          <>
            <div className="w-full h-24 flex flex-row px-2 justify-center items-start">
              <div className="w-1/4 h-full flex flex-col justify-center items-center">
                <h1 className="text-2xl text-white font-bold text-center align-middle">
                  {weather.city}
                </h1>
              </div>

              <div className="w-1/4 h-full flex flex-col justify-center items-center">
                <h1 className="text-2xl text-white font-bold">Temperature</h1>
                <h2 className="text-xl text-slate-400 font-semibold">
                  {weather.current.temperature} ºF
                </h2>
              </div>
              <div className="w-1/4 h-full flex flex-col justify-center items-center">
                <h1 className="text-2xl text-white font-bold">Humidity</h1>
                <h2 className="text-xl text-slate-400 font-semibold">
                  {weather.current.humidity}
                </h2>
              </div>
              <div className="w-1/4 h-full flex flex-col justify-center items-center">
                <h1 className="text-2xl text-white font-bold">
                  {weather.current.weather.main}
                </h1>
                <h2 className="text-xl text-slate-400 font-semibold">
                  {weather.current.weather.description}
                </h2>
              </div>
            </div>
            <div className="w-full h-full flex flex-row justify-center items-center">
              <Card className="w-[800px]">
                <CardHeader>
                  <CardTitle>Temperature</CardTitle>
                  <CardDescription>5 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig}>
                    <LineChart
                      accessibilityLayer
                      data={weather.forecast}
                      margin={{
                        left: 12,
                        right: 12,
                      }}
                    >
                      <CartesianGrid vertical={false}></CartesianGrid>
                      <XAxis
                        dataKey="time"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => value.split("T")[0]}
                      ></XAxis>
                      <ChartTooltip
                        cursor={false}
                        content={
                          <ChartTooltipContent hideLabel></ChartTooltipContent>
                        }
                      ></ChartTooltip>
                      <Line
                        dataKey="temperature"
                        type="natural"
                        strokeWidth={2}
                        dot={false}
                      ></Line>
                    </LineChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
