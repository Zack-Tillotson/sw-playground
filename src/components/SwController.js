import React from 'react';
import utils from './utils';

function Controls() {
  return (
    <>
      <button onClick={() => utils.registerSw('cache-only')}>Register Cache Only</button>
      <button onClick={() => utils.registerSw('cache-first')}>Register Cache First</button>
      <button onClick={() => utils.registerSw('network-first')}>Register Network First</button>
      <button onClick={() => utils.registerSw('network-first-with-cache')}>Register Network First With Cache</button>
      <button onClick={() => utils.preloadAssets()}>Preload Cache</button>
    </>
  );
}

export default Controls;