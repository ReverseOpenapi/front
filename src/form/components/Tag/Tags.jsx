import React, { useState } from 'react'
import "../style.css"
import Button from '@mui/material/Button';


export default function Tags({dataTags}) {

    const [tag, setTag] = useState(true)

    return (
        <div>
            <Button primary onClick={() => dataTags(!tag)}>Back Step</Button>
            <Button primary onClick={() => dataTags(tag)}>Next Step</Button>
        </div>
    )
}