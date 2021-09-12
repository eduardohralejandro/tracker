import React, {useState, SetStateAction} from 'react';
import ReactMapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


const Map = () => {
  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    width: "100vw",
    height: "100vh",
    zoom: 8
  });

  return (
    <div>
      <ReactMapGL 
                {...viewport}
                width="100vw"
                height="100vh"
                mapStyle="mapbox://styles/mapbox/dark-v9"
                mapboxApiAccessToken={"pk.eyJ1IjoiZWR1YXJkb2hlcm5hbmRleiIsImEiOiJja3RoNmhlbWcwaWppMnpwYW5wNGV5MTZzIn0.VppCQEFpblrOgnCpYWG5Gg"} // test, no compromising info, free key
                onViewportChange={(viewport: SetStateAction<any>) => setViewport(viewport)} />
    </div>
  )
}


export default Map;
