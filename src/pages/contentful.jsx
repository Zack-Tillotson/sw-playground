import React from 'react';
import Markdown from 'react-markdown';

import './pageStyles.scss';
import './contentStyles.scss';

import useContentPage from 'utils/useContentPage';
import ContentfulImage from 'utils/ContentfulImage';
import ContentfulVideo from 'utils/ContentfulVideo';
import ContentfulCode from 'utils/ContentfulCode';
import Skeleton from 'components/Skeleton';
import PrettyTriangles from 'components/PrettyTriangles';

function renderItems(items = []) {
  const itemsToRender = [];

  for(let index = 0 ; index < items.length ; index++) {
    const {[index]: item} = items;
    itemsToRender.push(item);

    if(item.type === 'topicTextBlock') continue;

    if(index + 1 < items.length) {
      const {[index+1]: nextItem} = items;
      if(nextItem.path === 'aside') {
        itemsToRender.push(nextItem);
        index++;
      } else {
        itemsToRender.push({type: 'empty'});
      }
    }
  }

  return itemsToRender.map(renderItem);
}

function renderItem(item, index) {
  switch(item.type) {
    case 'topicTextBlock': {
      return <Markdown
        key={index}
        className="page-content__header"
        source={item.title}
        renderers={{root: props => <h2 {...props} id={item.slug} />}} />
    }
    case 'topicText': {
      return (
        <div key={index} className="page-content__item">
          <Markdown source={item.content} renderers={{code: item => <ContentfulCode {...item} /> }} />
        </div>
      );
    }
    case 'topicImage': {
      return (
        <ContentfulImage key={index} className="page-content__item page-content__image" item={item} />
      );
    }
    case 'blockVideo': {
      return (
        <ContentfulVideo key={index} className="page-content__item page-content__video" item={item} />
      );
    }
    case 'empty': {
      return <div key={index} className="page-content__item" />
    }
    default:
      return <div key={index}>{item.type}</div>;
  }
}

function renderLessonNav(lessonNum, content) {
  const {routes} = content;

  return (
    <section className="page-content__footer">
      {lessonNum > 1 && (
        <div className="page-footer page-footer--left">
          <h4>Lesson {lessonNum - 1}</h4>
          <a href={`/${routes[lessonNum - 1].fields.slug}/`}>{routes[lessonNum - 1].fields.title}</a>
        </div>
      )}
      {lessonNum + 1 < content.routes.length && (
        <div className="page-footer page-footer--right">
          <h4>Lesson {lessonNum + 1}</h4>
          <a href={`/${routes[lessonNum + 1].fields.slug}/`}>{routes[lessonNum + 1].fields.title}</a>
        </div>
      )}
    </section>
  );
}

function Contentful({lessonNum}) {
  const {content, isLoading, isError} = useContentPage();

  if(isLoading) return <Skeleton />;
  if(isError) return 'Error';

  const {
    title,
    description,
    introduction,
    content: items,
  } = content;

  return (
    <>
      <header className="page-header page-header--lesson">
        <h1>{title}</h1>
      </header>
      <nav className="page-overview">
        <h4>In This Lesson</h4>
        <h6>Service Workers</h6>
        <ul>
          {(items || []).filter(item => item.type === 'topicTextBlock').map(item => (
            <li key={item.slug}>
              <a href={`#${item.slug}`}>{item.title}</a>
            </li>
          ))}
        </ul>
        <span className="page-overview__lesson_num">{lessonNum}</span>
      </nav>
      <Markdown
        source={introduction}
        className="page-introduction"
        renderers={{root: props => <section {...props} />}} />
      {renderItems(items)}
      {renderLessonNav(lessonNum, content)}
      <PrettyTriangles className="full-height-2nd-column" />
    </>
  );
}

export default Contentful;