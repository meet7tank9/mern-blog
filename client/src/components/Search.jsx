import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PostItem from './PostItem'
import { useNavigate } from 'react-router-dom'

const Search = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Inside submit");
        navigate(`/?search=${searchQuery}`)
    }

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <input type='search' placeholder='Search...' style={{ maxWidth: '290px', border: '3px solid rgba(26, 26, 56, 0.5)', borderRadius: '10px' }} onChange={(e)=> setSearchQuery(e.target.value)} name="search" value={searchQuery} />
                </form>
            </div>

           
        </>
    )
}

export default Search