import { pokeApi } from "../api";
import { Pokemon } from "../interfaces";


export const getPokemonInfo = async (nameOrId: string) => {


    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${ nameOrId }`);
    
//esto lo hacemos para que en json que crea el build no incluya toda la info del pokemon, solo la quqe usamos (id, name y los sprites)
    return {
        id: data.id,
        name: data.name,
        sprites: data.sprites
    }

}