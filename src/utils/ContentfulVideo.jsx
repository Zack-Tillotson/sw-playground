import React, {useRef} from 'react';

import useContentAssets from './useContentAssets';

function ContentfulVideo(props) {
  const items = useContentAssets(props.item);

  const webp = items.find(obj => obj.item && obj.item.asset.fields.file.contentType === 'image/webp');
  const gif = items.find(obj => obj.item && obj.item.asset.fields.file.contentType === 'image/gif');

  if(!webp && !gif) return (
    <figure className={props.className}>
      ...
    </figure>
  );

  return (
    <figure className={props.className}>
      <picture>
        {!!webp && (
          <source
            type="image/webp"
            srcSet={`${webp.item.asset.fields.file.url} 700w`}
             />
        )}
        {!!gif && (
          <img src={gif.item.asset.fields.file.url} alt={gif.item.asset.fields.description} />
        )}
      </picture>
      {!!gif && (
        <figcaption><span className="caption-title">Fig:</span> {gif.item.asset.fields.description}</figcaption>
      )}
    </figure>
  );
}

export default ContentfulVideo;