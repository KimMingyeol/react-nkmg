import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import { useDrag } from "@use-gesture/react";
import { useSpring, animated } from "react-spring";

function Drag_Child({ sx, sy }) {
    // const props = useSpring({ opacity: 0, from: { opacity: 1 } });
    const [style, api] = useSpring(() => ({ x: 0, y: 0 }));

    useEffect(() => {
        api.start({config: {friction:26, tension:400} });
    }, [])

    useEffect(() => {
        api.start({x:sx, y:sy});
        console.log("setting done");
    }, [sx, sy])
    
    return <animated.h1 style={style}>asdf</animated.h1>;
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