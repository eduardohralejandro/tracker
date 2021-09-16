import React, {FC} from "react"


interface typeProps  {
  setDisplayContent: (state: string) => void;
}
const Tabs: FC<typeProps> = ({ setDisplayContent }) => {
  return (
    <div className="tabs">
      <button onClick={() => setDisplayContent('saved')} className={'btn-tabs'}>Saved</button> 
      <button onClick={() => setDisplayContent('current')} className={'btn-tabs'}>Current</button>
    </div>
  )
}


export default Tabs;