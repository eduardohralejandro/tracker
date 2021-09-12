import React from 'react';

import '../styles/index.scss';
import Map from './Map.tsx';
import New from './New.tsx';

const App = () => {
  return (
    <>
      <section className="hero"></section>
      <main>
        <section>
          <h1>react</h1>
          <Map />
          <New />
        </section>
      </main>
    </>
  );
}


export default App;