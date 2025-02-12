import os
import requests
from dotenv import load_dotenv
from fastapi import HTTPException
from exceptions import CustomException
from typing import Any
from datetime import datetime
from interfaces import WeatherResponse

class WeatherService:

    def __init__(self):
        load_dotenv()
        self.__base_url = "https://api.openweathermap.org/data/2.5"


    async def get_current(self, city: str):

        try:

            url = f"{self.__base_url}/weather?q={city}&appid={os.getenv("OPENWEATHER_API_KEY")}&units=imperial"
            response = requests.get(url=url)

            response.raise_for_status()

            data = response.json()

            return data

        except requests.exceptions.HTTPError as error:
            return CustomException(self.__class__.__name__ + f".get_current", error.response.reason, error.response.status_code)
    

    async def get_forecast(self, city:str, cnt:int):

        try:

            url = f"{self.__base_url}/forecast?q={city}&cnt={cnt}&appid={os.getenv("OPENWEATHER_API_KEY")}&units=imperial"
            response = requests.get(url=url)

            response.raise_for_status()

            data = response.json()

            print(data)

            return data

        except requests.exceptions.HTTPError as error:
            print(error)
            return CustomException(self.__class__.__name__ + ".get_forecast", error.response.reason, error.response.status_code)
        
    async def postprocess(self, current_weather: Any, forecast_weather: Any):

        try:

            data = {
                'city': current_weather['name'],
                'current': {
                    'temperature': current_weather['main']['temp'],
                    'humidity': current_weather['main']['humidity'],
                    'weather': {
                        'main': current_weather['weather'][0]['main'],
                        'description': current_weather['weather'][0]['description']
                    }
                },
                'forecast': list(map(lambda x: {'time': datetime.fromtimestamp(x["dt"]).strftime("%Y-%m-%d"), 'temperature':x['main']['temp']}, forecast_weather['list']))
            }
            print(data)
            return WeatherResponse(**data)
        
        except Exception as e:

            return CustomException(self.__class__.__name__ + ".postprocess", e, 404)