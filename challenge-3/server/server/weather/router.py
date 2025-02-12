from fastapi import APIRouter, Depends, HTTPException
from .service import WeatherService
from interfaces import WeatherResponse
from exceptions import CustomException

router = APIRouter(
    prefix="/weather"
)



@router.get("")
async def get_weather(
    city: str,
    weather_service: WeatherService = Depends(WeatherService)
) -> WeatherResponse:
    
    
    current_weather = await weather_service.get_current(city)
    forecast_wether = await weather_service.get_forecast(city, 5)

    print(current_weather)

    print(forecast_wether)

    data = await weather_service.postprocess(current_weather, forecast_wether)

    if isinstance(data, CustomException):
        raise HTTPException(
            status_code=data.status_code,
            detail=f"Context: {data.context} \n Message: {data.message}"
        )
    return data