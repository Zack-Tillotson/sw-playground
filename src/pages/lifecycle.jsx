import React from 'react';
import './pageStyles.scss';

function Home() {
  return (
    <>
      <header className="page-header page-header--lesson">
        <div>Lesson 1</div>
        <h1>Service Worker Lifecycle</h1>
      </header>
      <div />
      <section className="page-section">
        <h3 id="sw-context">Service Workers run separately from websites</h3>
        <p>Typically when we think of code running in a web browser we think of that code running on a website - ie within the context of a website tab. In this view the HTML page is loaded into the DOM, which references our script, then our script is running with access to the DOM and other APIs related to that tab.</p>
        <p>Service Workers are different - they are run in a seperate sandboxed context from website code, they don't have access to the DOM or many other web APIs. In otherwords they can't interact directly with normal web apps. This is a new paradigm for web browsers.</p>
        <p>This means two things. One, a Service Worker can be added to any type of web application - a traditional server rendered site, a client-only SPA, or anything in between. Second, a Service Worker doesn't have the same lifecycle we're used to. A web app starts being downloaded and run when the user navigates to a certain URL but a service worker is different. Next we'll discuss how so.</p>
      </section>
      <div />
      <section className="page-section">
        <h3 id="sw-registration">Service Worker Registration</h3>
        <p>A Service Worker must be <strong>registered</strong>. This registration is done within website application code, the web app will register the URL of a service worker file. When this happens the browser adds that URL to the list of Service Workers it knows about.</p>
        <p>With each registration the browser will download and save the script file. It then waits for the user to open a normal website tab and go to a URL that matches one of it's Service Worker <a href="#scope">*</a> URLs. When that happens the browser finds the Service Worker which matches that URL and gets ready to run it.</p>
        <p>Executing a Service Worker happens in a three steps - installation, activation, and then finally running it.</p>
      </section>
      <div />
      <section className="page-section">
        <h3 id="sw-installation">Installation</h3>
        <p>Installation is triggered the first time a page is loaded which has a Service Worker registered to it. The installation event is triggered on the Service Worker and completes when that event resolves.</p>
        <p>This step is used to prepare the client to run the service worker by setting up any resources that it requires. One example would be to pre-download assets the Service Worker will use.</p>
        <p>When this step is complete the Service Worker waits until it can be <strong>Activated</strong>.</p>
      </section>
      <div />
      <section className="page-section">
        <h3 id="sw-activation">Activation</h3>
        <p>Activation is triggered when a new Service Worker has finished Installation and no other Service Worker is running. In other words if a Service Worker is running when a new Service Worker goes through Installation, the new Service Worker wont Activate until the user closes all existing pages.</p>
        <p>This step is used to clean up assets the client no longer needs. For example a Service Worker could remove cached assets which were used by the previous version of the Service Worker.</p>
        <p>When this step is complete the Service Worker waits until it can be <strong>Run</strong>.</p>
      </section>
      <div />
      <section className="page-section">
        <h3 id="sw-waiting">Waiting</h3>
        <p>When a Service Worker has finished installation and activation but isn't yet running it goes in to a Waiting step. A Service Worker can start and stop many times.</p>
      </section>
      <div />
      <section className="page-section">
        <h3 id="sw-running">Running</h3>
        <p>This phase is when the Service Worker is actually being run.</p>
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