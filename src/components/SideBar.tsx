import React, { FC } from "react";
//@ts-ignore
import '../styles/index.scss';


interface typeProps {
  card: any,
  addCity: (city: string) => void;
}

const SideBar: FC<typeProps> = ({ card, addCity }) => {
 if (card) {
  return(
    <div>
      <div className='city-box'>
        <h2 className='city-name'>{card?.data.city.name}</h2>
        <img  className='save-icon' onClick={() => addCity(card?.data.city.name)} src="https://www.linkpicture.com/q/star_1.svg" alt="" />
      </div>
      <p className='sub-title'>Air quality index:  {card?.data.aqi}</p>
      <span>
        <h5 className="sub-title">pm10: {card?.data.iaqi.pm10?.v}</h5>
        <p className='para'>PM10 is any particulate matter in the air with a diameter of 10 micrometers or less, including smoke, dust, soot, salts, acids, and metals. Particulate matter can also be formed indirectly when gases emitted from motor vehicles and industries undergo chemical reactions in the atmosphere</p>
      </span>
    </div>
  )
 } else {
   return (
     <div className="element-empty">
       <img className='search-icon' src="https://www.linkpicture.com/q/search.svg" alt="" />
       <p style={{fontSize:'20px', textAlign: 'center', color:'#0000004D'}}className="sub-title">You don't have any recent search yet</p>
     </div>
   )
 }
}


export default SideBar;
