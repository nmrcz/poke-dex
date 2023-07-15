import React from 'react'
import Loader from './Loader'
import PokemonList from './PokemonList'


const PokemonHelper = ({ pokemonList , loading }) => {
    if (loading || pokemonList.length === 0){
        return <Loader/>
    } else {
        return <PokemonList pokemonList={pokemonList} loading={loading}/>
    }
}

export default PokemonHelper