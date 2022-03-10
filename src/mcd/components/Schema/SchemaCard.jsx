import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Draggable from "react-draggable";
import SchemaModal from "./SchemaModal";
import "./Schema.css";
import { fabric } from "fabric";

const SchemaCard = () => {
  const entities = useSelector((state) => state.entities.value);
  const [open, setOpen] = useState(false);
  const [updateEntity, setUpdateEntity] = useState("");
  const [indexOfEntity, setIndexOfEntity] = useState("");
  const [positions, setPositions] = useState({});
  const [hasLoaded, setHasLoading] = useState(false);
  const [canvas_b, setCanvas] = useState("");
  const nodeRef = useRef(null);

  useEffect(() => {
    const existingDivPositions = JSON.parse(
      localStorage.getItem("positions_div")
    );
    setPositions(existingDivPositions);
    setHasLoading(true);
    setCanvas(canvas);
  }, []);

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

  const handleUpdateEntity = (entity, index) => {
    setOpen(true);
    setUpdateEntity(entity);
    setIndexOfEntity(index);
  };

  return hasLoaded ? (
    <div id="canvas-wrap">
      <canvas id="canvas"></canvas>
      <div id="overlay">
        <div className="mcd-view-container">
          <div className="elements">
            {entities.map((entity, index) => {
              return (
                <div
                  className={`element element${index + 1}`}
                  onDoubleClick={() => handleUpdateEntity(entity, index)}
                  key={index}
                  id="coordinates"
                >
                  <Draggable
                    nodeRef={nodeRef}
                    defaultPosition={
                      positions === null
                        ? { x: 0, y: 0 }
                        : !positions[entity.name]
                        ? { x: 0, y: 0 }
                        : {
                            x: positions[entity.name].x,
                            y: positions[entity.name].y,
                          }
                    }
                    onStop={handleStop}
                  >
                    <div className="molels-container" ref={nodeRef}>
                      <table key={index} className="schema-table">
                        <thead className="header-customer">
                          <tr id="coordonate">
                            <th colSpan={2}>{entity.name}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {entity.attributes.map((attr, index) => {
                            return (
                              <tr key={index}>
                                <td>
                                  {attr.key === true ? (
                                    <>
                                      {attr.name}
                                      <img
                                        src="./assets/icons/key-icon.svg"
                                        alt="primary-key"
                                      />
                                    </>
                                  ) : (
                                    attr.name
                                  )}
                                </td>
                                <td>{attr.type}</td>
                              </tr>
                            );
                          })}
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
          entity={updateEntity}
          indexOfEntity={indexOfEntity}
        />
      </div>
    </div>
  ) : null;
};

export default SchemaCard;
