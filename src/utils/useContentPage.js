import {useState, useEffect} from 'react';
import contentful from './contentful';

function useContentPage() {
  const [content, contentLoaded] = useState(null);
  const [isLoading, updateIsLoading] = useState(true);
  const [isErorr, updateIsError] = useState(false);

  useEffect(() => {
    contentful.getPageContent(window.location.pathname)
      .then(content => {
        contentLoaded(content);
      })
      .catch(error => {
        if(__DEBUG__) console.log(error);
        updateIsError(true);
      })
      .then(() => updateIsLoading(false));
  }, []);

  return {
    content,
    isLoading,
    isErorr,
  }
}

export default useContentPage;