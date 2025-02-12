from pydantic import BaseModel, Field
import datetime

class Weather(BaseModel):

    main: str = Field(default="", description="The weather")
    description: str = Field(default="", description="The weather description")

class CurrentWeather(BaseModel):

    temperature: float = Field(default=0, description="Current temperature"),
    humidity: float = Field(default=0, description="Current humidity")
    weather: Weather = Field(Weather(), description="The weather information")


class Forecast(BaseModel):

    time: datetime.datetime= Field(default=datetime.datetime.now(), description="Current time")
    temperature: float = Field(default=0, description="The temperature at the time")

class WeatherResponse(BaseModel):

    city: str = Field(default="", description="The city's name")
    current: CurrentWeather = Field(default=CurrentWeather(), description="The current weather")
    forecast: list[Forecast] = Field(default=[], description="The forecast weather")