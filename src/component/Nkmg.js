import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useDrag } from "@use-gesture/react";
import { useSpring, animated } from "react-spring";
import react from "react";

const speed = 500;
const range = 100;
const offset = 30;

function Drag_Child({ sx, sy }) {
    const ref = useRef();
    const lasty = useRef(0);
    const [props0, api0] = useSpring(() => ({ x: 0, y: 0 }));

    const [toCheck, SettoCheck] = useState(false);

    var SineReq;
    const [style, api] = useSpring(() => ({ x: 0, y: 0,
    onStart() {
        cancelAnimationFrame(SineReq);
        console.log(lasty.current);
        api0.start({x: 0, y: 0, from: {x: 0, y: lasty.current}, config:{tension:100}});
        console.log('Started');
    }, onRest() {
        console.log('Stopped')
    } }));
    console.log("rerender1");

    useEffect(() => {
        function animate() {
          // const x = Math.cos(Date.now() / speed) * range;s
          const x = 0;
          const y = Math.sin(Date.now() / speed) * range;
          // const z = Math.sin(Date.now() / speed) * range + offset;
          api0.start({x, y, config:{tension:0}});
          // ref.current.style = `position: absolute; transform: translate3d(${x}px,${y}px,0)`;
          lasty.current = y;
          
          SineReq = requestAnimationFrame(animate);
        }
        animate();
      }, [ref]);

    useEffect(() => {
        api.start({config: {friction:26, tension:360}});
        console.log(props0)
    }, [])

    useEffect(() => {
        api.start({x:sx, y:sy});
    }, [sx, sy])

    console.log(style.x);
    
    return (<animated.div style={style}>
                <animated.h1 style={props0}>
                    asdf
                </animated.h1>
            </animated.div>);
    // return <h1 style={{ transform: `translate3d(${x}px,${y}px,0)` }}>asdf</h1>;
}

export default function Drag() {
    const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
    const [props, api0] = useSpring(() => ({ x: 0, y: 0 }));
    
    console.log("rerender");
    
    useEffect(() => {
        api0.start({ x: 0, y: 40, from: { x: 0, y: 0 } });
        api({config: {friction:26, tension:160} });
        console.log("setting done");
    }, [])

    const bind = useDrag(({ offset: [x, y] }) => {
        // console.log("dragging");
        api.start({ x, y });
    });

    return (
        <div>
            <animated.h1 style={props}>{props.y}</animated.h1>
            <animated.div className="face" a {...bind()} style={{ x, y }}/>
            <Drag_Child sx={x} sy={y}/>
        </div>
    );
}