import React, {useEffect} from 'react';
import Prism from 'prismjs';

function ContentfulCode({value}) {
  useEffect(() => {
    Prism.highlightAll();
  }, [value]);
  return (
    <pre className="line-numbers">
      <code className="language-js">
        {value}
      </code>
    </pre>
  );
}

export default ContentfulCode;