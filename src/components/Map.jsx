import { useState } from "react"

const Map = () => {
  const [number, setNumber] = useState(0);

  const plusNum = () => {
    setNumber(number + 1);
  }

  return (
    <div>
      <button onClick={plusNum}>plus one</button>
      {number}
    </div>
  )
}


export default Map;
