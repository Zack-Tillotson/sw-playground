import React from 'react';
import Markdown from 'react-markdown';

import './pageStyles.scss';
import './contentStyles.scss';

import useContentPage from 'utils/useContentPage';

function renderItems(items) {
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
      return <h2 key={index} id={item.slug} className="page-content__header">{item.title}</h2>
    }
    case 'topicText': {
      return (
        <div key={index}>
          <Markdown source={item.content} />
        </div>
      );
    }
    case 'empty': {
      return <div key={index} />
    }
    default:
      return <div key={index}>{item.type}</div>;
  }
}

function Contentful() {
  const {content, isLoading, isError} = useContentPage();

  if(isLoading) return 'loading ...';
  if(isError) return 'Error';

  const {
    title,
    description,
    introduction,
    content: items,
  } = content;

  const lessonNum = 1;

  return (
    <>
      <header className="page-header page-header--lesson">
        <div>Lesson {lessonNum}</div>
        <h1>{title}</h1>
      </header>
      <section className="page-introduction">
        {introduction}
      </section>
      <nav className="page-overview">
        <h4>In This Lesson</h4>
        <h6>Service Workers</h6>
        <ul>
          {items.filter(item => item.type === 'topicTextBlock').map(item => (
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