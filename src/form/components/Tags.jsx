import React, { useState } from 'react'
import "./style.css"
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import { Input } from '@mui/material';
export default function Tags({dataTags}) {

    const [tags, setTags] = useState([{name: "", description: "" }])

    //removeTags
    const removeTags = indexToremove => {
        setTags(tags.filter((_, index) => index !== indexToremove));
    };
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

    const handleSubmit = event => {
        event.preventDefault()
        setTags([...tags,  {name: name, description: description }]);
        setName("")
        setDescription("")
    };

    return (
        <div className="tags-container">
            <div className="tags-input-container">
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
                />
                <TextField
                    className="text-field"
                    type="text"
                    placeholder="description"
                    onChange={(event) => setDescription(event.target.value)}
                    value={description}
                />
                <Button onClick={handleSubmit}>Submit</Button>
            </div>
            <Button primary onClick={() => dataTags(false)}>Back Step</Button>
            <Button primary onClick={() => dataTags(true)}>Next Step</Button>
        </div>
    )
}