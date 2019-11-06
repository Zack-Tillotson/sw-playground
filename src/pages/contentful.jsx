import React from 'react';
import './pageStyles.scss';



function Home() {
  return (
    <>
      <header className="page-header page-header--lesson">
        <div>Lesson 1</div>
        <h1>Introduction to Service Workers</h1>
      </header>
      <nav className="page-overview">
        <h4>In this lesson</h4>
        <h6>Service Workers</h6>
        <ul>
          <li><a href="#new-paradigm">Running separately</a></li>
        </ul>
      </nav>
      <section className="page-section">
        <h3 id="new-paradigm">Service Workers run separately from websites</h3>
        <p>Typically when we think of code running in a web browser we think of that code running on a website - ie within the context of a website tab. In this view the HTML page is loaded into the DOM, which references our script, then our script is running with access to the DOM and other APIs related to that tab.</p>
        <figure>
          <img src="https://placekitten.com/600/300" />
          <figcaption>Web browsers are getting complicated</figcaption>
        </figure>
        <p>Service Workers are different - they are run in a seperate sandboxed context from website code, they don't have access to the DOM or many other web APIs. In otherwords they can't interact directly with normal web apps. This is a new paradigm for web browsers.</p>
        <p>This means two things. One, a Service Worker can be added to any type of web application - a traditional server rendered site, a client-only SPA, or anything in between. Second, a Service Worker doesn't have the same lifecycle we're used to. A web app starts being downloaded and run when the user navigates to a certain URL but a service worker is different. Next we'll discuss how so.</p>
      </section>
      <div />
    </>
  );
}

export default Home;