import React from 'react';

function Skeleton() {
  return [
    <section key="1" className="skeleton__container">
      {new Array(5).fill().map((_, index) => (
        <div key={index} className="skeleton" />
      ))}
    </section>
  ]
}

export default Skeleton;