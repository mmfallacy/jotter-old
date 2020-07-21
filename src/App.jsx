import React from 'react'

import Jot from './components/Jot';

export default function App(){
    return(
        <div className='App-root'>
            <header className='Drag-Region'></header>
            <Jot type="timely">
            </Jot>
        </div>
    )
}