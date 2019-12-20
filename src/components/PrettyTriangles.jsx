import React, {useRef, useEffect, useState} from 'react';

const polyHeight = 75;
const polyWidth = 75;

const c1 = location.pathname === '/intro/' ? [205, 25, 0] : [0, 134, 205];
const c2 = location.pathname === '/intro/' ? [255, 215, 0] : [45, 179, 74];
const colorWiggle = 25;

function singleColor(initial, final, frac, randomness) {
  return initial + (final - initial) * frac + (Math.random() - .5) * randomness;
}

function color(xFrac, yFrac) {
  const dist = Math.sqrt(xFrac * xFrac + yFrac * yFrac);
  const r = singleColor(c1[0], c2[0], dist, colorWiggle);
  const g = singleColor(c1[1], c2[1], dist, colorWiggle);
  const b = singleColor(c1[2], c2[2], dist, colorWiggle);
  return `rgb(${r},${g},${b},${Math.min(-10*yFrac+10-xFrac/2+Math.random()*.1, 1)})`;
}

function polies(maxHeight, maxWidth, x, y) {
  return [
    <polygon
      key={`${x}${y}${0}`}
      fill={color((maxWidth - x) / maxWidth, y / maxHeight)}
      points={`${x},${y} ${x+polyWidth/2},${y+polyHeight} ${x-polyWidth/2},${y+polyHeight}`}
    />,
    <polygon
      key={`${x}${y}${1}`}
      fill={color((maxWidth - x) / maxWidth, y / maxHeight)}
      points={`${x},${y} ${x+polyWidth/2},${y+polyHeight} ${x+polyWidth},${y}`}
    />,
    <polygon
      key={`${x}${y}${2}`}
      fill={color((maxWidth - x) / maxWidth, y / maxHeight)}
      points={`${x-polyWidth/2},${y+polyHeight} ${x+polyWidth/2},${y+polyHeight} ${x},${y+2*polyHeight}`}
    />,
    <polygon
      key={`${x}${y}${3}`}
      fill={color((maxWidth - x) / maxWidth, y / maxHeight)}
      points={`${x},${y+polyHeight*2} ${x+polyWidth/2},${y+polyHeight} ${x+polyWidth},${y+polyHeight*2}`}
    />,
  ];
}

function polygons(maxHeight, maxWidth) {
  const polys = [];

  for(let y = 0; y < maxHeight; y += polyHeight * 2) {
    for(let x = maxWidth + (y % 2 * polyWidth / 2); x > polyWidth; x -= polyWidth) {
      polys.push(...polies(maxHeight, maxWidth, x, y));
    }
  }

  return polys;
}

function PrettyTriangles({className}) {
  const [maxHeight, setHeight] = useState(900);
  const [maxWidth, setWidth] = useState(500);

  const ref = useRef();
  useEffect(() => {
    if(!ref.current) {
      return;
    }

    setHeight(ref.current.getBoundingClientRect().height);
    setWidth(ref.current.getBoundingClientRect().width);
  }, [ref.current]);

  return (
    <svg
      ref={ref}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={`pretty-triangles ${className}`}>
      {polygons(maxHeight, maxWidth)}
    </svg>
  );
}

export default PrettyTriangles;