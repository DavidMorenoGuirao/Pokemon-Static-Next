import { useState } from 'react'

import { GetStaticProps, NextPage, GetStaticPaths } from 'next'
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react'

import confetti from 'canvas-confetti';

import { pokeApi } from '../../api'
import { Layout } from '../../components/layouts'
import { Pokemon } from '../../interfaces'
import { localFavorites } from '../../utils'
import { getPokemonInfo } from '../../utils/getPokemonInfo'


interface Props {
    pokemon: Pokemon;
}


const PokemonPage: NextPage<Props> = ( { pokemon } ) => {

    // const [isInFavorites, setisInFavorites] = useState(localFavorites.existsInFavorite(pokemon.id))
    const [isInFavorites, setIsInFavorites] = useState(localFavorites.existsInFavorites(pokemon.id));

    const onToggleFavorite = () => {
        localFavorites.toggleFavorite(pokemon.id);
        setIsInFavorites(!isInFavorites);

        if ( isInFavorites ) return;

        confetti({
            zIndex: 999,
            particleCount: 100,
            spread: 160,
            angle: -135,
            origin: {
                x: 0.9,
                y: 0.1                
            }
        })
    }

    
    return (
        <Layout title={ pokemon.name }>

           <Grid.Container css={{ marginTop:'5px' }} gap={ 2 }>
            <Grid xs={ 12 } sm={ 4 }>
                <Card hoverable css={{ padding: '30px' }}>
                    <Card.Body>
                        <Card.Image
                            src={ pokemon.sprites.other?.dream_world.front_default || 'no-image.png'}
                            alt={ pokemon.name }
                            width= '100%'
                            height= { 200 }
                        />
                    </Card.Body>
                </Card>
            </Grid>

            <Grid xs={ 12 } sm={ 8 }>
                <Card>
                    <Card.Header css={{ display:'flex', justifyContent: 'space-between' }}>
                        <Text h1 transform='capitalize'>{ pokemon.name }</Text>
                        <Button
                            color='gradient'
                            ghost={ !isInFavorites }
                            onClick={ onToggleFavorite }
                        >
                            { isInFavorites ? 'En favoritos' : 'Añadir a Favoritos' }                            
                        </Button>
                    </Card.Header>

                    <Card.Body>
                        <Text size={30}>Sprites:</Text>
                        <Container direction='row' display='flex' gap={ 0 }>
                            <Image
                                src={ pokemon.sprites.front_default }
                                alt={ pokemon.name }
                                width= { 100 }
                                height= { 100 }
                            />
                            <Image
                                src={ pokemon.sprites.back_default }
                                alt={ pokemon.name }
                                width= { 100 }
                                height= { 100 }
                            />
                            <Image
                                src={ pokemon.sprites.front_shiny }
                                alt={ pokemon.name }
                                width= { 100 }
                                height= { 100 }
                            />
                            <Image
                                src={ pokemon.sprites.back_shiny }
                                alt={ pokemon.name }
                                width= { 100 }
                                height= { 100 }
                            /> 
                        </Container>

                    </Card.Body>                   
                </Card>
            </Grid>
            
            
            </Grid.Container> 



        </Layout>
    )
}


export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const pokemon151 = [...Array(151)].map( (value, index) => `${index + 1}` );
       
    return {
        paths: pokemon151.map( id => ({
            params: { id }
         }) ),
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => { 

    const { id } = params as { id: string };
    
    return {
      props: {
        pokemon: await getPokemonInfo( id )
      }
    }
  }


export default PokemonPage;