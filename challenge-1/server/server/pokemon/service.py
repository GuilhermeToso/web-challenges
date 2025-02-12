import os
import requests
from dotenv import load_dotenv
from fastapi import HTTPException
from .interfaces import ResourceReference, ResourcesReferenceResponse, PokemonPayload, PokemonsResponse
from typing import Any
import httpx
import time
import asyncio

class PokemonService:

    def __init__(self):
        load_dotenv()
        self._base_url: str = os.getenv("POKEMON_API_URL")
        self._limit: int = 20

    def _get_pokemon_references(self, page: int | None = None):

        if not page:
            page = 1

        offset = int((page-1)*self._limit)

        try:
            url = f"{self._base_url}/pokemon?offset={offset}&limit={self._limit}"
            response = requests.get(url=url)

            response.raise_for_status()

            data = response.json()

            return ResourcesReferenceResponse(**data)

        except requests.exceptions.HTTPError as error:
            raise HTTPException(
                status_code=error.response.status_code,
                detail=error.response.status_code,
            )
        
    async def _get_resource(self, url: str, client: httpx.AsyncClient):

        try:
            response = await client.get(url=url)

            response.raise_for_status()

            data = response.json()

            return data
        
        except requests.exceptions.HTTPError as error:
            
            raise HTTPException(
                status_code=error.response.status_code,
                detail=error.response.reason
            )
        
    def _postprocess(self, resources: list[any]) -> list[PokemonPayload]:

        pokemons = []
        for pokemon in resources:

            data = {
                'id': pokemon['id'],
                'name': pokemon['name'],
                'sprites': {
                    'image': pokemon['sprites']['front_default'],
                    'gif': pokemon['sprites']['other']['showdown']['front_default']
                },
                'types': list(map(lambda x: x['type']['name'], pokemon['types'])),
                'abilities': list(map(lambda x: x['ability']['name'], pokemon['abilities'])),
                'height': pokemon['height'],
                'weight': pokemon['weight'],
                'stats': list(map(lambda x: (x['stat']['name'],x['base_stat']), pokemon['stats']))
            }

            pokemons.append(PokemonPayload(**data))
        
        return pokemons

        
    async def _get_resources(self, references: list[ResourceReference]) -> list[PokemonPayload]:
        resources = []
        batch_size = 10
        for i in range(0, len(references), batch_size):
            async with httpx.AsyncClient() as client:
                tasks = [
                    self._get_resource(reference.url, client) for reference in references[i:i+batch_size]
                ]
                results = await asyncio.gather(*tasks)
            resources.extend(results)

        return self._postprocess(resources)

    async def get_pokemons(self, page: int | None = None):

        resources_list = self._get_pokemon_references(page)

        pokemons = await self._get_resources(resources_list.results)

        return PokemonsResponse(
            count=resources_list.count,
            next=resources_list.next,
            previous=resources_list.previous,
            pokemons = pokemons
        )


    async def get_pokemon(self, q: str):

        try:
            url = f"{self._base_url}/pokemon/{q}"
            response = requests.get(url=url)

            response.raise_for_status()

            data = response.json()

            print(data)

            return self._postprocess([data])

        except requests.exceptions.HTTPError as error:
            raise HTTPException(
                status_code=error.response.status_code,
                detail=error.response.status_code,
            )




    
        
    


    

