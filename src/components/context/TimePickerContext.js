import React, {useState} from 'react'

import moment from 'moment'

export const TimePickerContext = React.createContext(true)

export const TimePickerConsumer = TimePickerContext.Consumer

export function TimePickerProvider({children}){

  const [time, setTime] = useState(moment());

  const resetTime = ()=> setTime(moment());

  return(
    <TimePickerContext.Provider value={{time, setTime, resetTime}}>
      {children}
    </TimePickerContext.Provider>
  )
}
