import { useState } from 'react';
import './Form.css';
import Editor from '../components/Editor';
import DataForm from '../components/DataForm';

function Form() {
  const [info, setInfo] = useState();
  const handleCallback = (info) => {
    setInfo(info)
    console.log(info)
  }

  return (
    <div className="Page_form">
      <div className="gauche">
        <DataForm dataParentToChild={handleCallback} />
      </div>
      <div className="droite">
        < Editor dataFromForm={info} />
      </div>
    </div>
  );
}

export default Form;