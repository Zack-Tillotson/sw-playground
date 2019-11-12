import {useState, useEffect} from 'react';
import contentful from './contentful';

function useContentAsset(prop) {
  const [item, updateItem] = useState(null);
  const [isLoading, updateIsLoading] = useState(false);
  const [isErorr, updateIsError] = useState(false);

  useEffect(() => {
    if(!item && !!prop.asset.fields) {
      updateItem(prop);
      return;
    }

    if(prop.asset.sys.type !== 'Link') {
      if(__DEBUG__) console.log('Asset needs loading but is not of type "Link"', error);
      updateIsError(true);
      return;
    }

    updateIsLoading(true);
    contentful.getAsset(prop.asset.sys.id)
      .then(asset => {
        updateItem({...prop, asset});
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