import React, { useState } from 'react';
import "./style.css";
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
export default function Tags({dataTags}) {

    const [tags, setTags] = useState([{name: "", description: "" }]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    //removeTags
    const removeTags = indexToremove => {
        setTags(tags.filter((_, index) => index !== indexToremove));
    };

    // submitTags
    const handleSubmit = event => {
        event.preventDefault()
        setTags([...tags,  {name: name, description: description }]);
        setName("")
        setDescription("")
    };

    return (
        <div >
            <div className="tags-input-container">
                <div>
                    <div>
                        {tags.map((tag, index) => (
                            <div className="tag-items" key={index}>
                                <span className="name">{tag.name}</span>
                                <span className="description">{tag.description}</span>
                                <span className="close" onClick={() => removeTags(index)}>&times;</span>
                            </div>
                        ))}
                    </div>
                    <TextField
                        className="text-field"
                        type="text"
                        placeholder="name"
                        onChange={(event) => setName(event.target.value)}
                        value={name}
                        style={{ display: "flex", margin: "5px" }}
                    />
                    <TextField
                        className="text-field"
                        type="text"
                        placeholder="description"
                        onChange={(event) => setDescription(event.target.value)}
                        value={description}
                        style={{ display: "flex", margin: "5px" }}
                    />
                    </div>
                <Button onClick={handleSubmit}>Add tags</Button>
            </div>
            <Button primary onClick={() => dataTags(false)}>Back Step</Button>
            <Button primary onClick={() => dataTags(true)}>Next Step</Button>
        </div>
    )
}