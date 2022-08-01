import { useEffect, useState } from 'react';

import { Layout } from '../../components/layouts'
import { FavoritePokemon } from '../../components/pokemon';
import { NoFavorites } from '../../components/ui';
import { localFavorites } from '../../utils';

const  FavoritesPage = () => {

  const [favoritePokemons, setfavoritePokemons] = useState<number[]>([]);

  useEffect(() => {    
    setfavoritePokemons( localFavorites.pokemons() );
    
  }, [])  


  return (
    <Layout title='Pokemons - Favoritos'>

      { 
        favoritePokemons.length === 0
          ? ( <NoFavorites /> )
          : ( <FavoritePokemon pokemons={ favoritePokemons } /> )
      }
    </Layout>
  )
}

export default FavoritesPage;