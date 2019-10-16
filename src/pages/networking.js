import React, {useState, useEffect} from 'react';
import './pageStyles.scss';
import './networkPage.scss';
import SwController from 'components/SwController'


function refreshPics(url, callback) {
  return fetch(url)
    .then(resp => resp.json())
    .then(callback);
}

function Networking() {
  const [pics, setPics] = useState([]);
  useEffect(() => {
    refreshPics('/data/kittens.json', setPics);
  }, []);
  const handleClick = () => refreshPics('/data/kittens-v2.json', setPics);

  return (
    <>
      <header>
        <h1>Networking</h1>
      </header>
      <div />
      <section className="page-subtitle demo-app">
        <button onClick={handleClick}>Click me</button>
        <ul>
          {pics.map(pic => (
            <li key={pic}>
              <img src={pic} />
            </li>
          ))}
        </ul>
      </section>
      <aside className="sw-status">
        <h2>Service Workers</h2>
        <SwController />
      </aside>
    </>
  );
}

export default Networking;