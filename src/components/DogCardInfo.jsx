import React from 'react'

const DogInfoCard = ({ pictureId, imgUrl }) => {
  return (
    <div className='card dog-card'>
      <div className='card-image'>
        <figure className='image' style={{ backgroundImage: `url(${imgUrl})` }}>
          <img src={imgUrl} alt={`A cute dog!`} className='is-sr-only' />
        </figure>
      </div>
    </div>
  )
}

export default DogInfoCard
