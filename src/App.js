import React from 'react'

import Jot from './components/Jot'

export default function App(){
    return(
        <React.Fragment>
            <header className='Drag-Region'></header>
            <Jot type="timely">
            </Jot>
        </React.Fragment>
    )
}