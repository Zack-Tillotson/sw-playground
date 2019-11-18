import React, {useRef} from 'react';

import useContentAsset from './useContentAsset';

function getImageWidth(width) {
  return parseInt((width + 100) / 100) * 100;
}

function ContentfulImage(props) {
  const {item} = useContentAsset(props.item);
  const containerRef = useRef();

  if(!item) return (
    <figure className={props.className} ref={containerRef}>
      ...
    </figure>
  );

  const {url} = item.asset.fields.file;
  let widthParam = !containerRef.current ? '' : 'w=' + getImageWidth(containerRef.current.offsetWidth);

  return (
    <figure className={props.className} ref={containerRef}>
      <picture>
        <source
          type="image/webp"
          srcSet={`${url}?fm=webp&w=700 700w`}
           />
        <img src={url} alt={item.alt} />
      </picture>
      <figcaption><span className="caption-title">Fig:</span> {item.caption}</figcaption>
    </figure>
  );
}

export default ContentfulImage;