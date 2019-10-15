import React from 'react';
import './pageStyles.scss';

function Introduction() {
  return (
    <>
      <img src="/images/triangles.svg" aria-role="presentation" className="full-height-2nd-column" />
      <header>
        <h1>A Simple Introduction to Service Workers</h1>
      </header>
      <section className="page-subtitle">
        <h2>Web continues to muddle backend and front-end technology</h2>
        <p>The SW Playground has one goal - to teach people how to use the most powerful new tool available in browsers today - Service Workers. Move past the misinformation and learn how and why this tool will change the way we make websites. This step by step guide covers a variety of use cases ranging from beginner to advanced, so jump in and have fun!</p>
      </section>
      <section className="page-section">
        <a href="/networking/">
          <h2>Handling network requests</h2>
        </a>
      </section>
    </>
  );
}

export default Introduction;