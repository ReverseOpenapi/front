import React, { useState, useEffect } from "react";
import "./style.css";
import AddField from "./AddField";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Info({ dataInfo }) {
  const [info, setInfo] = useState([]);
  const [keyInfo, setKeyInfo] = useState([]);
  const requiredInfo = [
    { key: "title", value: String },
    { key: "description", value: String },
    { key: "version", value: String },
  ];
  const localStorageInfo = JSON.parse(localStorage.getItem("info"));

  if (localStorageInfo !== null && info.length === 0) {
    //If we have data in localstorage, add to info
    for (let i = 0; i < localStorageInfo.length; i++) {
      setInfo((currentDataInfo) => [
        ...currentDataInfo,
        {
          key: localStorageInfo[i].key,
          value: localStorageInfo[i].value,
        },
      ]);
      setKeyInfo((currentDataKeyInfo) => [
        ...currentDataKeyInfo,
        localStorageInfo[i].key,
      ]);
    }
  } else if (info.length === 0) {
    //If info is empty, add requiredInfo to info
    for (let i = 0; i < requiredInfo.length; i++) {
      setInfo((currentDataInfo) => [
        ...currentDataInfo,
        {
          key: requiredInfo[i].key,
          value: requiredInfo[i].value,
        },
      ]);
      setKeyInfo((currentDataKeyInfo) => [
        ...currentDataKeyInfo,
        requiredInfo[i].key,
      ]);
    }
  }

  const handleChange = (event, index) => {
    info[index].value = event.target.value;
  };

  //Get Data from AddField
  const handleCallback = (childData) => {
    for (let i = 0; i < childData.length; i++) {
      //Add a condition to avoid duplication
      if (keyInfo.includes(childData[i]) === false) {
        setInfo((currentDataInfo) => [
          ...currentDataInfo,
          {
            key: childData[i],
            value: String,
          },
        ]);
        setKeyInfo((currentDataKeyInfo) => [
          ...currentDataKeyInfo,
          childData[i],
        ]);
      }
    }
  };

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
            defaultValue={info[index].value} //Show LocalStorage value
            style={{display: "flex", margin: "5px"}}
          />
        );
      })}
      <AddField addField={handleCallback} dataParentToChild={info} />
      <Button primary onClick={() => dataInfo(info)}>
        Add Info
      </Button>
    </div>
  );
}
