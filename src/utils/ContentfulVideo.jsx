import React, {useRef} from 'react';

import useContentVideo from './useContentVideo';

function ContentfulVideo(props) {
  const {video, poster, isLoading} = useContentVideo(props.item);

  if(!poster || !video) return (
    <figure className={props.className}>
      ...
    </figure>
  );

  return (
    <figure className={props.className}>
      <video autoplay controls loop muted playsinline poster={poster.poster.fields.file.url}>
        <source
          type="video/mp4"
          src={poster.video.fields.file.url} />
      </video>
      {!!video && (
        <figcaption><span className="caption-title">Video:</span> {video.video.fields.description}</figcaption>
      )}
    </figure>
  );
}

export default ContentfulVideo;