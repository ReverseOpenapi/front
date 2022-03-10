import React, { useState } from "react";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

export default function OptionalParams({ addField, dataParentToChild }) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const [checked, setChecked] = React.useState([]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const OptionField = ["description", "deprecated", "allowEmptyValue"];

  //Delete data from OptionField
  for (let i = 0; i < dataParentToChild.length; i++) {
    let dataCheck = OptionField.includes(dataParentToChild[i].key);
    if (dataCheck === true) {
      for (let j = 0; j < OptionField.length; j++) {
        if (OptionField[j] === dataParentToChild[i].key) {
          OptionField.splice(j, 1);
        }
      }
    }
  }

  return (
    <div className="list-item">
      <Box
        className="App"
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          color: "black",
        }}
      >
        <nav aria-label="secondary mailbox folders">
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            <ListItemButton onClick={handleClick}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Optional Field" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <List
                  dense
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                >
                  {OptionField.map((value) => {
                    const labelId = `checkbox-list-secondary-label-${value}`;
                    return (
                      <ListItem
                        key={value}
                        secondaryAction={
                          <Checkbox
                            edge="end"
                            onChange={handleToggle(value)}
                            checked={checked.indexOf(value) !== -1}
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        }
                        disablePadding
                      >
                        <ListItemButton>
                          <ListItemText id={labelId} primary={value} />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
                <Button primary onClick={() => addField(checked)}>
                  Add Field
                </Button>
              </List>
            </Collapse>
          </List>
        </nav>
      </Box>
    </div>
  );
}
