//-------------initiaal dummy habits as a state---------------//
const initialState =  [{
    name:'Running',
    date:'22 November 2023, 1:43 AM',
    status:'none',
    history:["none","none","none","none","none","none"],
    duration:'45'
  },{
    name:'Swimming',
    date:'22 November 2023, 1:43 AM',
    status:'none',
    history:["none","none","none","none","none","none"],
    duration:'15'
  },{
    name:'Crunches',
    date:'22 November 2023, 1:43 AM',
    status:'none',
    history:["none","none","none","none","none","none"],
    duration:'4'
  }]



  //-----------------main reducer function------------------//
const reducer = (state=initialState ,action) =>{

if(action.type === "ADD_HABIT")
{
    return [...state,{name:action.payload.name,date:action.payload.date,duration:action.payload.duration,history:action.payload.history,status:'None'}]
}
else if(action.type==='DELETE_ALL'){
    return []
}
else if(action.type=== "UPDATE_DETAILED"){

    let index = action.payload.index 
    let status = action.payload.status
    state[index].status = status;
    return {...state}
}
 return state
}

export default reducer