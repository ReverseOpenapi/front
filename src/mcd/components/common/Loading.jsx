import React from "react";

const Loading = () => {
  return (
    <div>
      <div className="loading-div loading">
        {[...Array(5)].map(() => {
          return <div className="loading-dots"></div>;
        })}
      </div>
    </div>
  );
};

export default Loading;
