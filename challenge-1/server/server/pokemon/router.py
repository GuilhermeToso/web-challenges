from fastapi import APIRouter, Depends
from .service import PokemonService
from .interfaces import PokemonPayload, PokemonsResponse

router = APIRouter(
    prefix="/pokemon"
)


@router.get("/list")
async def get_pokemons(
    page: int | None = 1,
    pokemon_service: PokemonService = Depends(PokemonService)) -> PokemonsResponse:

    return await pokemon_service.get_pokemons(page)

@router.get("/{query}")
async def get_pokemons(
    query: str,
    pokemon_service: PokemonService = Depends(PokemonService)) -> PokemonPayload:

    print(query)

    data = await pokemon_service.get_pokemon(query)

    print(data)

    return data[0]

