import { Grid, Card } from "@nextui-org/react";
import { useRouter } from "next/router";


interface Props {
    pokemonId: number;
}


export const FavoriteCardPokemon: React.FC<Props> = ({ pokemonId }) => {


    const router = useRouter();

    const onFavoriteCliked = () => {
        router.push(`/pokemon/${ pokemonId }`);
    }
    

  return (
    <Grid xs={ 6 } sm={ 3 } md={ 2 } xl={ 1 } key={ pokemonId } onClick={ onFavoriteCliked }>
        <Card hoverable clickable css={{ padding: 10 }}>
            <Card.Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ pokemonId }.svg`}
            alt={'hola'}
            width={'100%'}
            height={140}                        
            />        
        </Card>
    </Grid>    
  );
}
