import React from 'react';
import './pageStyles.scss';

import useContentPage from 'utils/useContentPage';

function Contentful() {
  const {content, isLoading, isError} = useContentPage();
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
      Page Data yo
    </>
  );
}

export default Contentful;