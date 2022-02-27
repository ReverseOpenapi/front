import React, { useState, useEffect } from 'react'
import "./style.css"
import AddField from './AddField'

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


export default function Info({ dataInfo }) {

    const [info, setInfo] = useState([{ key: "title", value: "" }, { key: "description", value: "" }, { key: "version", value: "" }]);

    useEffect(() => {
        console.log(info)
    })

    const handleChange = (event, index) => {
        info[index].value = event.target.value 
    }

    //Get Data from AddField
    const handleCallback = (childData) => {
        console.log(childData)
        for (let i = 0; i < childData.length; i++) {
            console.log('Push info')
            //set current data info in Info
            setInfo(currentDataInfo => [
                ...currentDataInfo,
                {
                     key: childData[i], value: "" 
                }
            ])
        }
    }

    return (
        <div>
            {info.map((item, index) => {
                    return (
                        <TextField
                            className="text-field"
                            name={item.key}
                            required
                            id="filled-required"
                            label={item.key}
                            onChange={(e) => handleChange(e, index)}
                            value={info.value}
                        />
                    )
                })
            }
            <AddField addField={handleCallback} dataParentToChild={info} />
            <Button primary onClick={() => dataInfo(info)}>Add Info</Button>
        </div>
    )
}