import React from 'react';

function Skeleton() {
  return (
    <section className="skeleton__container">
      <div className="skeleton" />
      <div className="page-overview">
        <div className="skeleton" />
        <div className="skeleton" />
      </div>
      <div className="skeleton" />
      <div className="skeleton" />
      <div className="skeleton" />
    </section>
  );
}

export default Skeleton;