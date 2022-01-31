import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./style.css"
import AddField from './AddField'

export default function DataForm({dataParentToChild}) {

    const [info, setInfo] = useState([{key : 'info'},{ key: "title", value: "" }, { key: "description", value: "" }, { key: "version", value: "" }]);

    //onClick Add To Editor
    const handleSubmit = (event) => {
        console.log(info)
    }

    //onChange textInput
    const handleChange = (i, key, event) => {
        switch (key) {
            case info[i].key:
                info[i].value = event.target.value
                return 
            default:
                return;
        }
    }

    const TxtField = info.map((item, index) => {
        if(item.key !== 'info'){
            return (
                <TextField
                    className="text-field"
                    name={item.key}
                    required
                    id="filled-required"
                    label={item.key}
                    onChange={(e) => handleChange(index, item.key, e)}
                />
            )
        }
    })


    //Get Data from AddField
    const [data, setData] = useState([])
    const handleCallback = (childData) => {
        //Need setData but why ?
        setData(childData)
        for (let i = 0; i < childData.length; i++) {
            info.push({ key: childData[i], value: "" })
        }
        childData.splice(0, childData.length)
    }
  
    return (
        <div >
            <h1>Form</h1>
                {TxtField}
                <Button primary onClick={() => dataParentToChild(info)}>Add To Editor</Button>
                <AddField addField={handleCallback}  dataParentToChild={info}/>
        </div>
    )
}