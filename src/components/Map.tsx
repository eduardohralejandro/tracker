import React, {useState, SetStateAction, useEffect} from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import axios from 'axios';
import 'mapbox-gl/dist/mapbox-gl.css';
// @ts-ignore
import  cities  from './utils/data.ts'

const Map = () => {
  const [viewport, setViewport] = useState({
    latitude: 50.85628104510911,
    longitude: 4.343033412604632,
    width: "100vw",
    height: "100vh",
    zoom: 8
  });

  const [airData, setAirData] = useState<[]>([]);

  useEffect(() => {
    const fetchData = async () => {
    const PromiseArr: any = [];
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
      <ReactMapGL 
                {...viewport}
                width="100vw"
                height="100vh"
                mapStyle="mapbox://styles/mapbox/dark-v9"
                mapboxApiAccessToken={"pk.eyJ1IjoiZWR1YXJkb2hlcm5hbmRleiIsImEiOiJja3RoNmhlbWcwaWppMnpwYW5wNGV5MTZzIn0.VppCQEFpblrOgnCpYWG5Gg"} // test, no compromising info, free key
                onViewportChange={(viewport: SetStateAction<any>) => setViewport(viewport)} >
        {airData?.map((e: any, index: number) => {
          return (
            <div key={index}>
              <Marker longitude={e.data.data.city.geo[1]} latitude={e.data.data.city.geo[0]}> 
                <div>country and data here</div>
              </Marker>
            </div>
          );
        })}
     </ReactMapGL>
    </div>
  );
}


export default Map;