from pydantic import BaseModel, Field
from typing import Tuple

class ResourceReference(BaseModel):

    name: str | None = None
    url: str | None = None

class ResourcesReferenceResponse(BaseModel):

    count: int | None = None
    next: str | None = None
    previous: str | None = None
    results: list[ResourceReference] = []

class Sprites(BaseModel):

    image: str = Field(default="", description="The resource image")
    gif: str = Field(default="",description="The resource gif")

class PokemonPayload(BaseModel):

    id: int = Field(default=0,description="Poekmon Id")
    name: str = Field(default="",description="The Pokemon's name")
    sprites: Sprites = Field(default=Sprites(), description="The Pokemon's sprites")
    types: list[str] = Field(default=[], description="Thepokemon's types")
    abilities: list[str] = Field(default=[], description="The pokemon's abilities")
    height: int = Field(default=0, description="The pokemon's height in decimeters")
    weight: int = Field(default=0, description="The pokemon's weights in hectograms")
    stats: list[Tuple[str,int]] = Field(default=[], description="The pokemon's stats")

class PokemonsResponse(BaseModel):

    count: int = Field(default=0, description="The total amount of pokemons")
    next: str | None = Field(default="", description="The next url to fetch")
    previous: str | None = Field(default="", description="The previous url to fetch")
    pokemons: list[PokemonPayload] = Field(default=[], description="The list of pokemons")