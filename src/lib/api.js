import axios from 'axios'

const API_URL = process.env.REACT_APP_DOG_API_URL
const API_KEY = process.env.REACT_APP_DOG_API_KEY

const callApi = async (url, params = null) => {
  const requestConfig = {
    baseURL: API_URL,
    headers: {
      'x-api-key': API_KEY,
    },
    url,
  }

  if (params) {
    requestConfig.params = params
  }

  try {
    return await axios(requestConfig)
  } catch (error) {
    console.log('API error', error)
  }
}

export const fetchBreeds = async (page, count = 10) => {
  const breeds = await callApi('breeds', {
    limit: count,
    page,
  })

  return {
    breeds: breeds.data,
    totalBreeds: breeds.headers['pagination-count'],
  }
}

export const fetchPictures = async (breed = '', count = 20) => {
  if (!breed) {
    return []
  }

  const pictures = await callApi('images/search', {
    breed_id: breed,
    limit: count,
  })

  return pictures.data
}
