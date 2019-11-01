import React from 'react';
import './pageStyles.scss';

function Home() {
  return (
    <>
      <header className="page-header page-header--lesson">
        <p>Lesson 1</p>
        <h1>Service Worker Lifecycle</h1>
      </header>
      <div />
      <section className="page-section">
        <h3 id="sw-context">Service Workers run apart from website code</h3>
        <p>Typically when we think of code running in a web browser we think of that code running on a website - ie within the context of a website tab. In this view the HTML page is loaded into the DOM, which references our script, then our script is running with access to the DOM and other APIs related to that tab.</p>
        <p>Service Workers are different - they are run in a seperate sandboxed context from website code, they don't have access to the DOM or many other web APIs. In otherwords they can't interact directly with normal web apps, they are a new breed of thing.</p>
      </section>
      <div />
      <section className="page-section">
        <h3 id="sw-registration">Service Worker Registration</h3>
        <p>To start a Service Worker must be <strong>registered</strong>. This registration is done within website application code, the web app will register the URL of a service worker file. When this happens the browser adds that URL to the list of Service Workers it knows about.</p>
        <p>With each registration the browser will download and save the script file. It then waits for the user to open a normal website tab and go to a URL that matches one of it's Service Worker <a href="#scope">*</a> URLs. When that happens the browser finds the Service Worker which matches that URL and gets ready to run it.</p>
        <p>Starting a Service Worker happens in a three steps - installation, activation, and then finally running it.</p>
      </section>
      <div />
      <section className="page-section">
        <h3 id="sw-installation">Installation</h3>
        <p></p>
        <p></p>
      </section>
      <div />
      <section className="page-section">
        <h3 id="sw-activation">Activation</h3>
        <p></p>
        <p></p>
      </section>
      <div />
      <section className="page-section">
        <h3 id="sw-waiting">Waiting</h3>
        <p></p>
        <p></p>
      </section>
      <div />
      <section className="page-section">
        <h3 id="sw-running">Running</h3>
        <p></p>
        <p></p>
      </section>
      <section className="page-section">
        <h3 id="sw-updating">Updating</h3>
        <p></p>
        <p></p>
      </section>
    </>
  );
}

export default Home;