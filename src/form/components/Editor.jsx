import React, { useRef } from 'react'
import Editor from "@monaco-editor/react"

export default function EditorPage({ dataFromForm = [] }) {

    const editorRef = useRef(null);
    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
    }

    function showValue() {
        console.log(editorRef.current.getValue())
        alert(editorRef.current.getValue());
    }

    let dataEditor = "info : "
    // Add data to Editor
    dataFromForm.map((data) => {
        const myHtml = "\n\t " + data.key +  " : " +  data.value
        dataEditor = dataEditor + myHtml
    })


    return (
        <div className='editor-container'>
            <h1>Editor</h1>
            <button onClick={showValue}>Show value</button>
            <div className='editor'>
                <Editor
                    height="90vh"
                    defaultLanguage="javascript"
                    onMount={handleEditorDidMount}
                    theme='vs-dark'
                    value = {dataEditor}
                />
            </div>
        </div>
    )
}