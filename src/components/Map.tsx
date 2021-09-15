import React, {useState, SetStateAction, useEffect, useRef, useCallback} from 'react';
import ReactMapGL, { Marker, GeolocateControl, NavigationControl } from 'react-map-gl'; // GeolocateControl
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
// @ts-ignore
import Geocoder from 'react-map-gl-geocoder'
import axios from 'axios';
import 'mapbox-gl/dist/mapbox-gl.css';
// @ts-ignore
import  cities  from './utils/data.ts'
// @ts-ignore
import MarkerIcon from './MarkerIcon.tsx';
// @ts-ignore
import SideBar from './SideBar.tsx';
import '../styles/index.scss';


interface initialStateMap {
  latitude:  number,
  longitude: number,
  width?: string,
  height?: string,
  zoom?: number,
  placeholder?: string
}

const geolocateStyle = {
  float: 'left',
  margin: '50px',
  padding: '10px'
};
const mapboxApiAccessToken = "pk.eyJ1IjoiZWR1YXJkb2hlcm5hbmRleiIsImEiOiJja3RoNmhlbWcwaWppMnpwYW5wNGV5MTZzIn0.VppCQEFpblrOgnCpYWG5Gg"
const Map = () => {
  const [viewport, setViewport] = useState<initialStateMap>({
    latitude: 50.85628104510911,
    longitude: 4.343033412604632,
    zoom: 13,
  });

  const [airData, setAirData] = useState<[]>([]);
  const [card, setCardData] = useState<[]>();

  const element = useRef<any>();
  
  const handleViewportChange = useCallback((newViewport) => setViewport(newViewport),[]);
  
  const displayInformation = (data: any) =>  setCardData(data);

  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides
      });
    },
    [handleViewportChange]
  );


  useEffect(() => {
    const fetchData = async () => {
    const PromiseArr: [] = [];

      for (const city of cities) {
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
                      ref={element}
                      {...viewport}
                      width="130vh"
                      height="100vh"
                      mapStyle="mapbox://styles/mapbox/outdoors-v11"
                      mapboxApiAccessToken={mapboxApiAccessToken} // test, no compromising info, free key
                      onViewportChange={(view: SetStateAction<any>) => handleViewportChange(view)}>
              <Geocoder 
                        onViewportChange={handleGeocoderViewportChange}
                        mapRef={element}
                        mapboxApiAccessToken={mapboxApiAccessToken} />
              <GeolocateControl
                                style={geolocateStyle}
                                positionOptions={{enableHighAccuracy: true}}
                                trackUserLocation={true} />
              <NavigationControl />
          {airData?.map((e: any, index: number) => {
            return (
              <div key={index}>
                <Marker longitude={e.data.data.city.geo[1]} latitude={e.data.data.city.geo[0]}> 
                  <MarkerIcon
                              info={e.data} 
                              displayInfo={displayInformation}
                              qualityIndex={e.data.data.aqi} />
                </Marker>
              </div>
            );
          })}
        </ReactMapGL>
       </div>
       <div className='card-container'>
        <SideBar card={card} />
       </div>
     </div>
    </div>
  );
}


export default Map;