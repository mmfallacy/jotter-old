import React from 'react'

import Style from './styles/Jot.module.scss'

import {ReactComponent as Add} from './assets/Jot/add.svg'

import {ButtonGroup, Secondary} from './RadiallyPositionedButton';

export default function Jot(){
    return(
        <div className={Style.Jot}>
            <div className={Style.Header}>
                <div className={Style.Row}>
                    <h4 className={Style.Weekday}>Monday</h4> &nbsp;&nbsp; 
                    <h4 className={Style.Day}>14th</h4>
                </div>
                <h6>June</h6>

                
                <ButtonGroup className={Style.ButtonGroup} 
                    primary={{
                        className: Style.Primary,
                        content:
                            <Add />
                    }}
                >
                    <Secondary className={Style.Secondary} angle={190} distance="50px">
                        <Add />
                    </Secondary>
                    <Secondary className={Style.Secondary} angle={135} distance="50px">
                        <Add />
                    </Secondary>
                    <Secondary className={Style.Secondary} angle={80} distance="50px">
                        <Add />
                    </Secondary>
                </ButtonGroup>
            </div>
        </div>
    )
}