import {useState, useEffect} from 'react';
import contentful from './contentful';

function useContentAsset(prop, attr = 'asset') {
  const [item, updateItem] = useState(null);
  const [isLoading, updateIsLoading] = useState(false);
  const [isErorr, updateIsError] = useState(false);

  useEffect(() => {
    if(!item && !!prop[attr].fields) {
      updateItem(prop);
      return;
    }

    if(prop[attr].sys.type !== 'Link') {
      if(__DEBUG__) console.log('Asset needs loading but is not of type "Link"', error);
      updateIsError(true);
      return;
    }

    updateIsLoading(true);
    contentful.getAsset(prop[attr].sys.id)
      .then(value => {
        updateItem({...prop, [attr]: value});
      })
      .catch(error => {
        if(__DEBUG__) console.log(error);
        updateIsError(true);
      })
      .then(() => updateIsLoading(false));
  }, []);

  return {
    item,
    isLoading,
    isErorr,
  }
}

export default useContentAsset;