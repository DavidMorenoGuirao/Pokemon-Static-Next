
//Añadimos un pokemon a favoritos
const toggleFavorite = (id: number) => {
        
    let favorites: number[] = JSON.parse( localStorage.getItem('favorites') || '[]' );

    if ( favorites.includes(id) ) {
        favorites = favorites.filter(pokeId => pokeId !== id );
    } else {
        favorites.push( id );
    }

    localStorage.setItem( 'favorites', JSON.stringify( favorites ));
};

// Comprobamos si un pokemon esta en favoritos
const existsInFavorites = ( id: number ): boolean => {

    if ( typeof window === 'undefined' ) return false;

    const favorites: number[] = JSON.parse( localStorage.getItem('favorites') || '[]' );    
    
    return favorites.includes(id);
};

// Obtenemos los pokemon favoritos
const pokemons = (): number[] => {
    return JSON.parse( localStorage.getItem('favorites') || '[]' );
};



export default{
    toggleFavorite,
    existsInFavorites,
    pokemons,
};