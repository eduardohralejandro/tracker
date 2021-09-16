import React, { FC } from 'react'
import '../styles/index.scss';

interface typeProps {
  city: []
}

const FavoriteCities: FC<typeProps> = ({ city }) => {
  return (
    <div>
      <div>
        <h5 style={{fontSize:'35px'}} className="fav-title">Cities</h5>
      </div>
      {city?.map((E: string, index: number) => {
        return <p key={index} style={{fontSize:'25px'}}>{E}</p>
      })}
    </div>
  )
}


export default FavoriteCities;