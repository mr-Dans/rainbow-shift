import {Gradient, Rect, makeScene2D} from '@motion-canvas/2d';
import {all, chain, Color, createRef, createSignal, easeInCubic, easeInOutSine, linear, loop, Signal, SimpleSignal, waitFor} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  // Create your animations here

  const rect = createRef<Rect>();
  const colors = [
    Color.createSignal('#FF0000'), // RED
    Color.createSignal('#FF7F00'), // ORANGE
    Color.createSignal('#FFFF00'), // YELLOW
    Color.createSignal('#00FF00'), // GREEN
    Color.createSignal('#0000FF'), // BLUE
    Color.createSignal('#4B0082'), // INDIGO
    Color.createSignal('#9400D3'), // VIOLET
  ];

  view.add(
    <Rect
      ref={rect}
      size={320}
      fill={
        new Gradient({
          type: 'linear',
          from: [-160, 0],
          to: [160, 0],
          stops: colors.map((color, i) => ({
            offset: i / (colors.length-1),
            color: color
          }))
        })
      }
    />
  );

  let cycles = 3;
  for(let j = 0; j < cycles; j++) {
    for(let i = 0; i < colors.length; i++) {
      yield* all(
        ...colors.map((color, index) => color(colors[index](),0).to(colors[(index+1)%7](), 0.05, linear))
      )
    }
  }
});