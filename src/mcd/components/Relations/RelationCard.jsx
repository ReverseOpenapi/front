import React from "react";
import RelationForm from "./RelationForm";
import RelationsList from "./RelationsList";
import "./Relation.css";

export const RelationCard = () => {
  return (
    <div className="wrap-relation-container">
      <div className="relation-form">
        <RelationForm />
      </div>
      <div className="relation-list">
        <RelationsList />
      </div>
    </div>
  );
};
