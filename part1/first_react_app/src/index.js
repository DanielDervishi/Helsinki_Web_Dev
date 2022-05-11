import React, { useState } from 'react'
import ReactDOM from 'react-dom/client';
import App from './App';

let counter = 1
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App counter={counter} />);

const refresh = () => {
    root.render(<App counter={counter} />)
}

setInterval(() => {
    counter += 1
    refresh()
}, 1000)
