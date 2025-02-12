export interface WeatherInterface {
  city: string;
  current: {
    temperature: number;
    humidity: number;
    weather: {
      main: string;
      description: string;
    };
  };
  forecast: {
    time: string;
    temperature: number;
  }[];
}
