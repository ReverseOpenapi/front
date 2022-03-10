import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Draggable from "react-draggable";
import SchemaModal from "./SchemaModal";
import { fabric } from "fabric";

//style
import "./Schema.css";

// react-icons
import { ImFilesEmpty } from "react-icons/im";
import { Button } from "@mui/material";

const SchemaCard = () => {
  const nodeRef = useRef(null);

  //* get data from store
  const schemas = useSelector((state) => state.schemas.value);

  //toggle modal
  const [open, setOpen] = useState(false);

  //setter and getter (state)
  const [updateSchema, setUpdateSchema] = useState("");
  const [indexOfSchema, setIndexOfSchema] = useState("");

  //save position of draggable table of schema on canvas
  const [positions, setPositions] = useState({});
  const [hasLoaded, setHasLoading] = useState(false);
  const [canvas_b, setCanvas] = useState("");

  useEffect(() => {
    const existingDivPositions = JSON.parse(
      localStorage.getItem("positions_div")
    );
    setPositions(existingDivPositions);
    setHasLoading(true);
    setCanvas(canvas);
  }, []);

  //handlers
  const handleStop = (e, data) => {
    let dummyPositions = { ...positions };
    const entityIndex = e.target.innerText;
    dummyPositions[entityIndex] = {};
    dummyPositions[entityIndex]["x"] = data.x;
    dummyPositions[entityIndex]["y"] = data.y;
    setPositions(dummyPositions);
  };

  useEffect(() => {
    localStorage.setItem("positions_div", JSON.stringify(positions));
  }, [positions]);

  const canvas = new fabric.Canvas("canvas", {
    height: window.innerHeight,
    width: window.innerWidth,
    backgroundColor: "#F5F5F5",
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateSchema = (schema, index) => {
    setOpen(true);
    setUpdateSchema(schema);
    setIndexOfSchema(index);
  };

  const sendSchema = () => {};

  console.log(schemas);

  return hasLoaded ? (
    <div id="canvas-wrap">
      <canvas id="canvas"></canvas>
      <div id="overlay">
        <Button onClick={sendSchema}>Send schemas</Button>
        <div className="mcd-view-container">
          <div className="elements">
            {schemas.map((schema, index) => {
              return (
                <div
                  className={`element element${index + 1}`}
                  onDoubleClick={() => handleUpdateSchema(schema, index)}
                  key={index}
                  id="coordinates"
                >
                  <Draggable
                    nodeRef={nodeRef}
                    defaultPosition={
                      positions === null
                        ? { x: 0, y: 0 }
                        : !positions[schema.name]
                        ? { x: 0, y: 0 }
                        : {
                            x: positions[schema.name].x,
                            y: positions[schema.name].y,
                          }
                    }
                    onStop={handleStop}
                  >
                    <div className="molels-container" ref={nodeRef}>
                      <table key={index} className="schema-table">
                        <thead className="header-customer">
                          <tr id="coordonate">
                            <th colSpan={2}>{schema.name}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {schema?.schema?.properties?.length > 0 ? (
                            schema.schema?.properties?.map(
                              (property, index) => {
                                return (
                                  <tr key={index}>
                                    <td>{Object.keys(property)}</td>
                                    <td>
                                      {property[Object.keys(property)].type}
                                    </td>
                                  </tr>
                                );
                              }
                            )
                          ) : (
                            <tr>
                              <td>
                                None property{" "}
                                <ImFilesEmpty
                                  style={{ color: "yellow", opacity: 0.5 }}
                                />
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </Draggable>
                </div>
              );
            })}
          </div>
        </div>
        <SchemaModal
          open={open}
          onClose={handleClose}
          schema={updateSchema}
          indexOfSchema={indexOfSchema}
        />
      </div>
    </div>
  ) : null;
};

export default SchemaCard;
