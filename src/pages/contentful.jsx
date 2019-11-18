import React from 'react';
import Markdown from 'react-markdown';

import './pageStyles.scss';
import './contentStyles.scss';

import useContentPage from 'utils/useContentPage';
import ContentfulImage from 'utils/ContentfulImage';
import Skeleton from 'components/Skeleton';

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
        id={item.slug}
        className="page-content__header"
        source={item.title}
        renderers={{root: props => <h2 {...props} />}} />
    }
    case 'topicText': {
      return (
        <div key={index} className="page-content__item">
          <Markdown source={item.content} />
        </div>
      );
    }
    case 'topicImage': {
      return (
        <ContentfulImage key={index} className="page-content__item page-content__image" item={item} />
      );
    }
    case 'empty': {
      return <div key={index} className="page-content__item" />
    }
    default:
      return <div key={index}>{item.type}</div>;
  }
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
      <Markdown
        source={introduction}
        className="page-introduction"
        renderers={{root: props => <section {...props} />}} />
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
      {renderItems(items)}
    </>
  );
}

export default Contentful;