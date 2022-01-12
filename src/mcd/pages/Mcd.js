import React, { useState } from "react";
import DictionaryCard from "../components/DictionaryCard";
import EntityCard from "../components/EntityCard";
import RelationCard from "../components/RelationCard";
import SchemaCard from "../components/SchemaCard";
import "./Mcd.css";
import anime from "animejs";
import { Typography } from "@mui/material";

import useStyles from "../components/style";
import { Divider } from "@material-ui/core";
import { StyledButton } from "../components/StyledMaterial";

export default function Mcd() {
  const [selected, setSelected] = useState(0);
  const classes = useStyles();

  const moonPath =
    "M16 27.5C16 42.6878 27.5 55 27.5 55C12.3122 55 0 42.6878 0 27.5C0 12.3122 12.3122 0 27.5 0C27.5 0 16 12.3122 16 27.5Z";

  const sunPath =
    "M55 27.5C55 42.6878 42.6878 55 27.5 55C12.3122 55 0 42.6878 0 27.5C0 12.3122 12.3122 0 27.5 0C42.6878 0 55 12.3122 55 27.5Z";

  let toggle = false;

  const selectedItem = (param) => {
    setSelected(param);
  };

  const handleDarkMode = () => {
    const timeline = anime.timeline({
      duration: 750,
      easing: "easeOutExpo",
    });

    //add different animations to timeline
    timeline
      .add({
        targets: ".sun",
        d: [{ value: toggle ? sunPath : moonPath }],
      })
      .add(
        {
          targets: "#darkMode",
          rotate: 320,
        },
        "-= 350"
      )
      .add(
        {
          targets: "section",
          backgroundColor: toggle ? "rgb(255, 255, 255)" : "rgb(22, 22, 22)",
          color: toggle ? "rgb(22, 22, 22)" : "rgb(255, 255, 255)",
        },
        "-= 700"
      );

    // toggle to sun to switch
    if (!toggle) {
      toggle = true;
    } else {
      toggle = false;
    }
  };

  return (
    <div>
      <section>
        <svg
          id="darkMode"
          width="25"
          height="25"
          viewBox="0 0 55 55"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={handleDarkMode}
        >
          <path
            class="sun"
            d="M55 27.5C55 42.6878 42.6878 55 27.5 55C12.3122 55 0 42.6878 0 27.5C0 12.3122 12.3122 0 27.5 0C42.6878 0 55 12.3122 55 27.5Z"
            fill="#F3BF3A"
          />
        </svg>
        <div className="mcd">
          <div className="container">
            <div className="nav-container">
              <div>
                <Typography variant="h4" component="div" mt={2} gutterBottom>
                  Modeling tool
                </Typography>
                <div className="nav-btn-container">
                  <div>
                    <StyledButton
                      variant="contained"
                      size="small"
                      onClick={() => selectedItem(1)}
                      className={classes.buttonBg}
                    >
                      Create Entity
                    </StyledButton>
                  </div>
                  <div>
                    <StyledButton
                      variant="contained"
                      size="small"
                      onClick={() => selectedItem(2)}
                      className={classes.buttonBg}
                    >
                      Relation
                    </StyledButton>
                  </div>
                </div>
                {selected === 1 && <EntityCard />}
                {selected === 2 && <RelationCard />}
              </div>
              <br />
              <Divider variant="middle" classes={{ root: classes.divider }} />
              <DictionaryCard />
            </div>
            <SchemaCard />
          </div>
        </div>
      </section>
    </div>
  );
}
