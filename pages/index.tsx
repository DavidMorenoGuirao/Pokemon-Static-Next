
import type { NextPage, GetStaticProps } from 'next'
import { Grid } from '@nextui-org/react';

import { pokeApi } from '../api'
import { Layout } from '../components/layouts'
import { PokemonListResponse, SmallPokemon } from '../interfaces'
import { PokemonCard } from '../components/pokemon';


interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({pokemons}) => {

  return (    
    <Layout title='Listado de Pokemons'>
      
      <Grid.Container gap={ 2 } justify='flex-start'>  
        {
          pokemons.map( (pokemon) => (
            <PokemonCard key={ pokemon.id } pokemon={ pokemon }/>           
          ))
        }
      </Grid.Container>
    </Layout>    
  )
}


export const getStaticProps: GetStaticProps = async (ctx) => { 

  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon/?limit=151')
  
  const pokemons: SmallPokemon[] = data.results.map( (poke,i) => ({
    ...poke,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${i + 1}.png`    
  }) ) 

  // https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/132.png
  
  return {
    props: {
      pokemons
    }
  }
}

export default HomePage;
