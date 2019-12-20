import React, {useRef, useEffect} from 'react';

const maxHeight = 900;
const maxWidth = 300;

const polyHeight = 50;
const polyWidth = 50;

const c1 = [45, 179, 74];
const c2 = [0, 134, 205];
const colorWiggle = 25;

function singleColor(initial, final, frac, randomness) {
  return initial + (final - initial) * frac + (Math.random() - .5) * randomness;
}

function color(xFrac, yFrac) {
  const dist = Math.sqrt(xFrac * xFrac + yFrac * yFrac);
  const r = singleColor(c1[0], c2[0], dist, colorWiggle);
  const g = singleColor(c1[1], c2[1], dist, colorWiggle);
  const b = singleColor(c1[2], c2[2], dist, colorWiggle);
  return `rgb(${r},${b},${g})`;
}

function polies(x, y) {
  return [
    <polygon
      fill={color((maxWidth - x) / maxWidth, y / maxHeight)}
      points={`${x},${y} ${x+polyWidth/2},${y+polyHeight} ${x-polyWidth/2},${y+polyHeight}`}
    />,
    <polygon
      fill={color((maxWidth - x) / maxWidth, y / maxHeight)}
      points={`${x},${y} ${x+polyWidth/2},${y+polyHeight} ${x+polyWidth},${y}`}
    />,
    <polygon
      fill={color((maxWidth - x) / maxWidth, y / maxHeight)}
      points={`${x-polyWidth/2},${y+polyHeight} ${x+polyWidth/2},${y+polyHeight} ${x},${y+2*polyHeight}`}
    />,
    <polygon
      fill={color((maxWidth - x) / maxWidth, y / maxHeight)}
      points={`${x},${y+polyHeight*2} ${x+polyWidth/2},${y+polyHeight} ${x+polyWidth},${y+polyHeight*2}`}
    />,
  ];
}

function polygons() {
  const polys = [];

  for(let y = 0; y < maxHeight; y += polyHeight * 2) {
    for(let x = maxWidth + (y % 2 * polyWidth / 2); x > polyWidth; x -= polyWidth) {
      polys.push(...polies(x, y));
    }
  }

  return polys;
}

function PrettyTriangles({className}) {

  const ref = useRef();
  useEffect(() => {
    if(!ref.current) {
      return;
    }

    const intervalId = setInterval(() => {
      const polygons = ref.current
        .getElementsByTagName('polygon');
      const item = polygons[parseInt(Math.random() * polygons.length)];
      item.classList.toggle('pretty-triangles--hidden');
      setTimeout(() => {
        try {
          item.classList.toggle('pretty-triangles--hidden');
        } catch(e) {}
      }, 5000);
    }, 200000);

    return () => clearInterval(intervalId);
  }, ref.current);

  return (
    <svg
      ref={ref}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 300 900"
      enableBackground="new -11.066 -24.909 279 699"
      xmlSpace="preserve"
      className={`pretty-triangles ${className}`}>
      {polygons()}
    </svg>
  );
}

export default PrettyTriangles;