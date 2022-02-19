import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import { useDrag } from "@use-gesture/react";
import { useSpring, animated } from "react-spring";

const speed = 300;
const range = 30;
const offset = 30;

function Drag_Child({ sx, sy }) {
    const ref = useRef();
    // const props = useSpring({ opacity: 0, from: { opacity: 1 } });
    const [style, api] = useSpring(() => ({ x: 0, y: 0, onRest() {
        console.log('Stopped')
      } }));
    console.log("rerender1");

    useEffect(() => {
        function animate() {
          // const x = Math.cos(Date.now() / speed) * range;
          const x = 0;
          const y = Math.sin(Date.now() / speed) * range;
          // const z = Math.sin(Date.now() / speed) * range + offset;
    
          ref.current.style = `position: absolute; transform: translate3d(${x}px,${y}px,0)`;
          requestAnimationFrame(animate);
        }
        animate();
      }, [ref]);

    useEffect(() => {
        api.start({config: {friction:26, tension:360}});
    }, [])

    useEffect(() => {
        api.start({x:sx, y:sy});
    }, [sx, sy])

    console.log(style.x);
    
    return (<animated.div style={style}>
                <h1 ref = {ref}>
                    asdf
                </h1>
            </animated.div>);
    // return <h1 style={{ transform: `translate3d(${x}px,${y}px,0)` }}>asdf</h1>;
}

export default function Drag() {
    const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
    console.log("rerender");
    
    useEffect(() => {
        api.start({config: {friction:26, tension:160} });
        console.log("setting done");
    }, [])

    const bind = useDrag(({ offset: [x, y] }) => {
        console.log("dragging");
        api.start({ x, y });
    });
    return (
        <div>
            <animated.div className="face" a {...bind()} style={{ x, y }}/>
            <Drag_Child sx={x} sy={y}/>
        </div>
    );
}