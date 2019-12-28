import React from 'react';
import Markdown from 'react-markdown';

import './pageStyles.scss';
import './contentStyles.scss';

import useContentPage from 'utils/useContentPage';
import ContentfulImage from 'utils/ContentfulImage';
import Skeleton from 'components/Skeleton';

function Contentful({lessonNum}) {
  const {content, isLoading, isError} = useContentPage();

  if(isLoading) return <Skeleton />;
  if(isError) return 'Error';

  const {
    title,
    description,
    introduction,
    content: items,
    routes,
  } = content;

  const lessons = routes
    .filter(route => route.fields.slug)
    .map(route => route.fields);

  return (
    <>
      <header className="page-header page-content__item">
        <h1>{title}</h1>
      </header>
      <section className="page-subtitle page-content__item">
        <Markdown source={introduction} className="page-introduction" />
      </section>
      <section className="page-content__item">
        <h2>Lessons</h2>
        <ol className="lessons">
          {lessons.map((lesson, index) => (
            <li key={lesson.slug}>
              <a className="lesson page-overview" href={`/${lesson.slug}/`}>
                <span className="lesson-num page-overview__lesson_num">{index+1}</span>
                <h3>{lesson.title}</h3>
                <p>{lesson.description}</p>
              </a>
            </li>
          ))}
        </ol>
      </section>
      <img src="/images/triangle-field-home.svg" role="presentation" className="full-height-2nd-column" />
    </>
  );
}

export default Contentful;