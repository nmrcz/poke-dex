import React, { useState, useEffect } from 'react'
import axios from 'axios'

import PokemonHelper from '../components/PokemonHelper'
import Pagination from '../components/Pagination'

const HomePage = () => {
    const [pokemonList, setPokemonList] = useState([])
    const [loading, setLoading] = useState(false)

    const [currentPage, setCurrentPage] = useState(1)
    const [pokePerPage] = useState(12)


    useEffect(() => {
        const fetchPokemons = async () => {
            setLoading(true)
            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=912`)
            setPokemonList(res.data.results.map(p => p.url))
            setLoading(false)
        }

        fetchPokemons()
    },[])

    const indexOfLastPage = currentPage * pokePerPage
    const indexOfFirstPage = indexOfLastPage - pokePerPage
    const currentPokes = pokemonList.slice(indexOfFirstPage, indexOfLastPage)

    const paginate = (pageNumber) => setCurrentPage(pageNumber)
    return (
        <div className='container mb-5'>
            <Pagination 
                pokesPerPage={pokePerPage} 
                totalPokes={pokemonList.length} 
                paginate={paginate}
            />
            <PokemonHelper pokemonList={currentPokes} loading={loading} pokeNums={currentPage}/>
        </div>
    )
}

export default HomePage