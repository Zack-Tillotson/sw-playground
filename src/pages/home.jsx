import React from 'react';
import './pageStyles.scss';

function Home() {
  return (
    <>
      <img src="/images/triangles.svg" aria-role="presentation" className="full-height-2nd-column" />
      <header className="page-header">
        <h1>Learn to code Service Workers</h1>
      </header>
      <section className="page-subtitle">
        <h2>Welcome to the SW Playground</h2>
        <p>Have you heard the hype around Service Workers but are confused by how they work? Does it seem like they have a really complex implementation? It's not just you! Service Workers really are the most powerful new tool available in web browsers today, but they are also a totally new paradigm. Move past the misinformation and get started using Service Workers today. This step by step will help you understand Service Workers in no time!</p>
      </section>
      <section className="page-section">
        <a href="/lifecycle/">
          <h2>Service Worker Lifecycle</h2>
        </a>
        <p>A Service Worker works differently than any other web client code. Start by understanding the basics - what actually is a Service Worker? How does it get installed? How does it run? When does it update?</p>
        <a href="/lifecycle/" className="cta cta--right">Learn about the SW lifecycle</a>
      </section>
      <section className="page-section">
        <a href="/networking/">
          <h2>Handling network requests</h2>
        </a>
        <p>In this lesson we cover how a Service Worker handles network requests. This is one of the most exciting features of a Service Worker and is ready for use in many production environments today.</p>
        <a href="/networking/" className="cta cta--right">Learn about handling network requests</a>
      </section>
    </>
  );
}

export default Home;