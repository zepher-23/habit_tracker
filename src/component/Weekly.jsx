import React, { useState } from 'react';

const Weekly = ({itemIndex, name, duration, status, date, list ,setList}) => {
  const [state, setState] = useState(Array(6).fill('none'));

  //---------------function to handle changes in habit status-----------------//
  const handleStateChange = (index, event) => {
    const newState = [...state];
    newState[index] = event.target.value;
    setState(newState);
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
          <select value={state[index]} onChange={(event) => handleStateChange(index, event)}>
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
