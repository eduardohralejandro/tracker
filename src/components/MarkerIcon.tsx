import React, {FC} from 'react';

import '../styles/index.scss';


interface typeProps {
  qualityIndex: number,
  displayInfo: (info: any) => void,
  info: any
}

const MarkerIcon: FC<typeProps> = ({ qualityIndex, displayInfo, info}) => {

  const colorsIndex = {
    good: '#57cc99',
    modarate: "#ffee88",
    sensitive: "#e3843b",
    unhealthy: "#FF0035",
    veryUnhealthy: "#4D2D76",
    hazardous: "#6F1A07"
  }
  
  const colorLogic = 
  (qualityIndex <= 50 ? colorsIndex.good : qualityIndex  > 50  ? colorsIndex.modarate : null) ||  
  (qualityIndex > 100 ? colorsIndex.sensitive : qualityIndex  > 150  ? colorsIndex.unhealthy : null) ||
  (qualityIndex > 200 ? colorsIndex.veryUnhealthy : qualityIndex  > 300 ? colorsIndex.hazardous : null);

  return (
    <div>
      <button onClick={() => displayInfo(info)} className='points' style={{backgroundColor: `${colorLogic}`}} />
    </div>
  );
}


export default MarkerIcon;