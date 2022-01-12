import React from "react";
import { useSelector } from "react-redux";

const SchemaCard = () => {
  const entities = useSelector((state) => state.entities.value);

  return (
    <div>
      <div className="mcd-view-container">
        {entities.map((entity, index) => {
          return (
            <div className="molels-container">
              <table key={index}>
                <thead>
                  <tr>
                    <th colSpan={2}>{entity.entityName}</th>
                  </tr>
                </thead>
                <tbody>
                  {entity.attributes.map((attr) => {
                    return (
                      <tr>
                        <td>
                          {attr.key === "prk"
                            ? `${attr.name}(${attr.key})`
                            : attr.name}
                        </td>
                        <td>{attr.type}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SchemaCard;
