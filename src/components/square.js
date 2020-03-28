import React from 'react';

import '../index.css';

export default function Square(props) {
    return <button className={"square " + props.shade}
                   style={props.style}
                   onClick={props.onClick}/>
}
