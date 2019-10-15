import React from 'react';
import './pageStyles.scss';

function Home() {
  return (
    <>
      <img src="/images/triangles.svg" aria-role="presentation" className="full-height-2nd-column" />
      <header>
        <h1>Learn to code Service Workers</h1>
      </header>
      <section className="page-subtitle">
        <h2>Welcome to the SW Playground</h2>
        <p>The SW Playground has one goal - to teach people how to use the most powerful new tool available in browsers today - Service Workers. Move past the misinformation and learn how and why this tool will change the way we make websites. This step by step guide covers a variety of use cases ranging from beginner to advanced, so jump in and have fun!</p>
      </section>
      <section className="page-section">
        <a href="/introduction/">
          <h2>Introduction</h2>
        </a>
        <p>If a website was a superhero, the Service Worker would be its sidekick! They aren't the same thing and operative separately, but when they coordinate their work they really kick ass!</p>
      </section>
      <section className="page-section">
        <a href="/networking/">
          <h2>Handling network requests</h2>
        </a>
        <p>Lets get to real world use cases!</p>
      </section>
    </>
  );
}

export default Home;