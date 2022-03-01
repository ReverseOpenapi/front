import React, { useState, useEffect } from 'react'
import "./style.css"
import AddField from './AddField'

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


export default function Info({ dataInfo }) {

    const [info, setInfo] = useState([]);
    const requiredInfo = [{ key: "title", value: "" }, { key: "description", value: "" }, { key: "version", value: "" }]
    const localStorageInfo = JSON.parse(localStorage.getItem("info"))

    if(localStorageInfo !== null && info.length === 0){ //If we have data in localstorage, add to info
        for (let i = 0; i < localStorageInfo.length; i++) {
            setInfo(currentDataInfo => [
                ...currentDataInfo,
                {
                     key: localStorageInfo[i].key, value: localStorageInfo[i].value
                }
            ])
            }
        }else if(info.length === 0){ //If info empty, add requiredInfo to info
            for (let i = 0; i < requiredInfo.length; i++) {
                setInfo(currentDataInfo => [
                    ...currentDataInfo,
                    {
                         key: requiredInfo[i].key, value: requiredInfo[i].value
                    }
                ])
            }
        }
    

    const handleChange = (event, index) => {
        info[index].value = event.target.value 
    }

    //Get Data from AddField
    const handleCallback = (childData) => {
        for (let i = 0; i < childData.length; i++) {
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
                            defaultValue = {info[index].value} //Show LocalStorage value
                        />
                    )
                })
            }
            <AddField addField={handleCallback} dataParentToChild={info} />
            <Button primary onClick={() => dataInfo(info)}>Add Info</Button>
        </div>
    )
}