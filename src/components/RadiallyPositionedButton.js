import React, {useState, useRef, createRef} from 'react';
import Classes from 'classnames'
import Style from './styles/RadiallyPositionedButton.module.scss'

import GSAP from 'gsap'

export function ButtonGroup({className,primary,children}){
    const [primaryStatus, togglePrimaryStatus] = useState(false)
    let childrenArray = useRef([]);

    childrenArray.current = Array(children.length).fill(useRef(null))

    const onPrimaryClick = () =>{
        let tl = GSAP.timeline()
        console.log(primaryStatus)
        for(const childRef of childrenArray.current){
            tl.from(childRef, {duration:0.8,x:'3px',y:'3px'})
        }
        
        if(primaryStatus)
            tl.reverse()

        togglePrimaryStatus(!primaryStatus)
    }
    
    return(
        <div className={Classes(Style.ButtonGroup,className)}>
            <button className={Classes(Style.Primary, primary.className)} onClick={onPrimaryClick}>{primary.content}</button>
            {React.Children.map(children, (child,i)=>
                React.cloneElement(child, {ref:(ref)=>childrenArray.current[i]=ref})
            )}
        </div>
    )
} 

export const Secondary = React.forwardRef( ({angle,distance,children,className},ref) => 

    // <div ref={ref} className={Classes(Style.Wrapper,'Secondary')} style={{'--distance':distance}}>
        <button ref={ref} className={Classes(Style.Secondary, className)} style={{'--angle':angle,'--distance':distance}}>{children}</button>
    //</div>

)
