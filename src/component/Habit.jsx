import React, { useState } from 'react';
import Store from '../Store'
import Reducer from '../Reducers';
import '../App.css'

const Habit = ({itemIndex, name, duration, status, date, list ,setList}) => {

    const [state,setState] =useState(Store.getState())
    const states = ['none', 'done', 'not done'];
    const [stateIndex, setStateIndex] = useState(0);
    const [buttonColor,setButton] = useState('null')
    

    //-------------------Function to handle status update of the habit using redux store-----------------//
    const handleClick = () => {
        const newIndex = (stateIndex + 1) % states.length;
        setStateIndex(newIndex);
        setState(states[newIndex])
        if(newIndex===0) 
        setButton('#ffc107');
        else if (newIndex === 1)
        setButton('#28a745');
        else if (newIndex === 2)
        setButton('#dc3545');

        Store.dispatch({type:'UPDATE_DETAILED',payload:{index:itemIndex,status:states[newIndex]}})
setState(Store.getState())
      };

      const handleDelete = (itemIndex)=>{
        
    setList(list.filter((item,index)=>itemIndex !== index))
      }


  return (
    <div style={{display:'flex',flexDirection:'column',justifyContent:'left',padding:'50px',paddingTop:'10px',paddingBottom:'10px'}}>
        <h3 style={{textAlign:'left',margin:'0px'}}> {name}</h3>
    <div className='habitDetails' style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
      
      <p>Duration : {duration} Min</p>
      <p> {date}</p>
      <button onClick={handleClick} style={{backgroundColor:buttonColor}}>
      {state[itemIndex].status}
    </button>
    <button onClick={()=>{handleDelete(itemIndex)}} style={{backgroundColor:'red'}}>
      Delete
    </button>
    </div>
<hr style={{width:'100%',borderColor:'#555555'}}/>
    </div>
  );
};

export default Habit;
