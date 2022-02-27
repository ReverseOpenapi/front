import { useState } from 'react';
import './Form.css';
import Stepper from '../components/Stepper'

function Form() {
  const [info, setInfo] = useState();
  const handleCallback = (info) => {
    setInfo(info)
    console.log(info)
  }

  return (
    <div className="">
        <Stepper dataOpenApi={handleCallback}/>
    </div>
  );
}

export default Form;