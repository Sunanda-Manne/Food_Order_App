import {useState,useEffect} from 'react'
import MealItems from './MealItems.jsx';
import useHttp from '../hooks/useHttp.js'
import Error from "./Error.jsx"

const requestConfig={};

function Meals(){

  const{data:loadMeals,loading,error}=useHttp('http://localhost:3000/meals',requestConfig,[]);


  console.log(loading);
  if(loading==true){
    return <p className='center'>Fetching meals....</p>

  }

  if(error){
    return <Error title="Failed to fetch Error" message={error}/>
  }

  
  if (loadMeals && loadMeals.length > 0) {
  return (
    <div>
      {console.log(loadMeals)}
        <ul id="meals">
            {loadMeals.map((meal)=>
            <MealItems key={meal.id} meal={meal}/>)}
        </ul>
    </div>
  )
}
}

export default Meals 
