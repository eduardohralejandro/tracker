import React, {useState, SetStateAction, useEffect} from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import axios from 'axios';
import 'mapbox-gl/dist/mapbox-gl.css';
// @ts-ignore
import  cities  from './utils/data.ts'
// @ts-ignore
import MarkerIcon from './MarkerIcon.tsx';
import '../styles/index.scss';

interface initialStateMap {
  latitude:  number,
  longitude: number,
  width?: string,
  height?: string,
  zoom?: number
}

const Map = () => {
  const [viewport, setViewport] = useState<initialStateMap>({
    latitude: 50.85628104510911,
    longitude: 4.343033412604632,
    zoom: 12,
  });

  const [airData, setAirData] = useState<[]>([]);

  useEffect(() => {
    const fetchData = async () => {
    const PromiseArr: [] = [];
      for(const city of cities) {
        const url = `https://api.waqi.info/feed/${city.name}/?token=22507baa78c5ec1ce73f5ee9e3aa49c4f079f45e`;
        
        PromiseArr.push(await axios.get(url));
        setAirData(PromiseArr);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <div className='map-container'>
        <div className='map'>
          <ReactMapGL 
                    {...viewport}
                    width="130vh"
                    height="100vh"
                    mapStyle="mapbox://styles/mapbox/outdoors-v11"
                    mapboxApiAccessToken={"pk.eyJ1IjoiZWR1YXJkb2hlcm5hbmRleiIsImEiOiJja3RoNmhlbWcwaWppMnpwYW5wNGV5MTZzIn0.VppCQEFpblrOgnCpYWG5Gg"} // test, no compromising info, free key
                    onViewportChange={(viewport: SetStateAction<any>) => setViewport(viewport)} >
          {airData?.map((e: any, index: number) => {
            return (
              <div key={index}>
                <Marker longitude={e.data.data.city.geo[1]} latitude={e.data.data.city.geo[0]}> 
                  <MarkerIcon />
                </Marker>
              </div>
            );
          })}
        </ReactMapGL>
       </div>
     </div>
    </div>
  );
}


export default Map;