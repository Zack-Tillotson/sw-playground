import React from 'react';
import Markdown from 'react-markdown';

import './pageStyles.scss';
import './contentStyles.scss';

import useContentPage from 'utils/useContentPage';
import ContentfulImage from 'utils/ContentfulImage';

function Contentful({lessonNum}) {
  const {content, isLoading, isError} = useContentPage();

  if(isLoading) return 'loading ...';
  if(isError) return 'Error';

  const {
    title,
    description,
    introduction,
    content: items,
  } = content;

  return (
    <>
      <header className="page-header page-content__item">
        <h1>{title}</h1>
      </header>
      <section className="page-subtitle page-content__item">
        <h2>{description}</h2>
        <Markdown source={introduction} className="page-introduction" />
      </section>
      <img src="/images/triangles.svg" aria-role="image" className="full-height-2nd-column" />
    </>
  );
}

export default Contentful;