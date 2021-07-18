import React, { useState, useEffect } from 'react'
import 'normalize.css'
import './App.css'

import { fetchPictures } from './lib/api'

import DogCardInfo from './components/DogCardInfo'
import BreedList from './components/BreedList'

function App() {
  const [pictures, setPictures] = useState([])
  const [selectedBreedId, setSelectedBreedId] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const loadPictures = async () => {
      if (selectedBreedId !== '') {
        setIsLoading((loading) => !loading)
        const fetchedPictures = await fetchPictures(selectedBreedId, 20)
        setPictures(fetchedPictures)
        setIsLoading((loading) => !loading)
      }
    }

    loadPictures()
  }, [selectedBreedId])

  return (
    <div className='container'>
      <header className='section has-text-centered'>
        <h1
          className='title is-size-3 has-text-primary'
          style={{ color: 'ee0979' }}
        >
          Search for pictures of some cute dogs 🐕
        </h1>
        <strong style={{ color: '#fff' }}>
          Select & Filter by breed for more choice!
        </strong>
      </header>
      <hr />
      <div className='columns section is-multiline'>
        <div className='column is-one-quarter'>
          <h2 className='title is-size-4 has-text-info'>Search by Breed 🐶</h2>
          <BreedList
            dispatchBreedChange={(breedId) => setSelectedBreedId(breedId)}
          />
        </div>
        <div className='column'>
          <div className='columns is-multiline'>
            {isLoading && (
              <progress className='progress is-medium is-link' max='100'>
                60%
              </progress>
            )}
            {!isLoading &&
              pictures.map((picture) => (
                <div className='column is-one-quarter' key={picture.id}>
                  <DogCardInfo imgUrl={picture.url} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
