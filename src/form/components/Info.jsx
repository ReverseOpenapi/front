import React, { useState } from "react";
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

  //Manage values of Info Object
  const handleChange = (event, index, key, i, item) => {
    if ((key === "name" || key === "url") && item === "license") {
      info[index].value[i].value = event.target.value; 
    } else if ((key === "name" || key === "url" || key === "email") && item === "contact") { 
      info[index].value[i].value = event.target.value;
    }else{
      info[index].value = event.target.value;
    }
  };

  //Get Data from AddField
  const handleCallback = (childData) => {
    for (let i = 0; i < childData.length; i++) {
      //Add a condition to avoid duplication
      if (keyInfo.includes(childData[i]) === false) {

        switch (childData[i]) {
          case "license":
            setInfo((currentDataInfo) => [
              ...currentDataInfo,
              {
                key: childData[i],
                value: [
                  { key: "name", value: String },
                  { key: "url", value: String },
                ],
              },
            ]);
            break;
          case "contact":
            setInfo((currentDataInfo) => [
              ...currentDataInfo,
              {
                key: childData[i],
                value: [
                  { key: "name", value: String },
                  { key: "url", value: String },
                  { key: "email", value: String },
                ],
              },
            ]);
            break;
          default:
            setInfo((currentDataInfo) => [
              ...currentDataInfo,
              {
                key: childData[i],
                value: String,
              },
            ]);
        }
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
        switch (item.key) {
          case "license":
            //Display license Object Field
            return (
              <div className="licenseObjStyle">
                  <h2>License</h2>
                  <TextField
                    className="text-field"
                    name={item.value[0].key}
                    required
                    id="filled-required"
                    label={item.value[0].key}
                    onChange={(e) => handleChange(e, index, "name", 0, item.key)}
                    defaultValue={info[index].value[0].value} //Show LocalStorage value
                    style={{ display: "flex", margin: "5px" }}
                  />
                  <TextField
                    className="text-field"
                    name={item.value[1].key}
                    required
                    id="filled-required"
                    label={item.value[1].key}
                    onChange={(e) => handleChange(e, index, "url", 1, item.key)}
                    defaultValue={info[index].value[1].value} //Show LocalStorage value
                    style={{ display: "flex", margin: "5px" , color : "white"}}
                  />
              </div>
            );

          case "contact":
            //Display contact Object Field
            return (
              <div className="contactObjStyle">
                  <h2>Contact</h2>
                  <TextField
                    className="text-field"
                    name={item.value[0].key}
                    required
                    id="filled-required"
                    label={item.value[0].key}
                    onChange={(e) => handleChange(e, index, "name", 0, item.key)}
                    defaultValue={info[index].value[0].value} //Show LocalStorage value
                    style={{ display: "flex", margin: "5px" }}
                  />
                  <TextField
                    className="text-field"
                    name={item.value[1].key}
                    required
                    id="filled-required"
                    label={item.value[1].key}
                    onChange={(e) => handleChange(e, index, "url", 1, item.key)}
                    defaultValue={info[index].value[1].value} //Show LocalStorage value
                    style={{ display: "flex", margin: "5px" }}
                  />
                  <TextField
                    className="text-field"
                    name={item.value[2].key}
                    required
                    id="filled-required"
                    label={item.value[2].key}
                    onChange={(e) => handleChange(e, index, "email", 2, item.key)}
                    defaultValue={info[index].value[2].value} //Show LocalStorage value
                    style={{ display: "flex", margin: "5px" }}
                  />
              </div>
            );
          default:
            return (
              <TextField
                className="text-field"
                name={item.key}
                required
                id="filled-required"
                label={item.key}
                onChange={(e) => handleChange(e, index)}
                defaultValue={info[index].value} //Show LocalStorage value
                style={{ display: "flex", margin: "5px" }}
              />
            );
        }
      })}

      <AddField addField={handleCallback} dataParentToChild={info} />
      <Button primary onClick={() => dataInfo(info)}>
        Add Info
      </Button>
    </div>
  );
}
