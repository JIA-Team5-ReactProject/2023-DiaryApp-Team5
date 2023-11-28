import Mate from '../components/Mate.js'
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Teammate() {
  const [teammates, setTeammates] = useState([]);

  useEffect(()=> {
    axios.get('http://localhost:3001/teammate')
    .then((response)=> {
      setTeammates(response.data);
    })
    .catch()
  },[]);
  return (
    <div class="mt-24 flex flex-col items-center">
      <div className="my-5">
        <h1 className="text-4xl font-thin">조원 소개</h1>
      </div>  
      <div className='flex gap-10 justify-center w-full flex-wrap'>
        {teammates.map((teammate) => 
          <Mate id={teammate.id} name={teammate.name} img={teammate.img} bio={teammate.bio} github={teammate.github} />
        )}
      </div>
    </div>
  )
}
