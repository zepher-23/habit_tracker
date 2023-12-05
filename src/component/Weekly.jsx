import React, { useState } from 'react';
import Store from '../Store'
const Weekly = ({itemIndex, name, duration, status, date, list ,setList}) => {
  
const [state, setState] = useState(Store.getState())
const [pastState, setPastState] = useState(state[itemIndex].history);
  //---------------function to handle changes in habit status-----------------//
  const handleStateChange = (index, event) => {
    const newState = [...pastState];
    newState[index] = event.target.value;
    setPastState(newState);
    Store.dispatch({type:'WEEKLY_UPDATE',payload:{habitIndex:itemIndex,historyIndex:index,status:newState[index]}})
setState(Store.getState());
  };

  //----------------------function to get the past 6 dates of the habit-------------------//
  const getPreviousDates = () => {
    const dates = [];
    for (let i = 0; i < 6; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().slice(0, 10));
    }
    return dates;
  };

  return (
    <div style={{display:'flex',flexDirection:'column'}}>
    
    <h3>{name}</h3>
    <div style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly'}}>
      {getPreviousDates().map((date, index) => (
        <div  key={date}>
          <span style={{marginRight:'10px'}}>{date}</span>
          <select value={pastState[index]} onChange={(event) => handleStateChange(index, event)}>
            <option value="none">None</option>
            <option value="done">Done</option>
            <option value="not done">Not Done</option>
          </select>
        </div>
      ))}
      
    </div>
    <hr style={{width:'95%',marginTop:'20px',borderColor:'#555555'}} />
    </div>
  );
};

export default Weekly;
