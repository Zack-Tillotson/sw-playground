import React from 'react';
import './pageStyles.scss';

function Introduction() {
  return (
    <>
      <aside className="full-height-2nd-column">
      </aside>
      <header>
        <h1>A Simple Introduction to Service Workers</h1>
      </header>
      <section className="page-subtitle">
        <h2>Web continues to muddle backend and front-end technology</h2>
        <p>There is a lot of hype around Service Workers (SW) but there seems to be a lot of hype around every new web technology. What makes Service Workers good? In what situations would I use them? How do they work? Are there any drawbacks to using them? The SW Playground aims to answer all those questions in a simple, interactive, and fun guide.</p>
      </section>
    </>
  );
}

export default Introduction;