import React from "react";
import { useDispatch } from "react-redux";
import UpdateEntityForm from "./UpdateSchemaForm";

//action
import { removeSchema } from "../../features/schemaSlice";

// '@mui/material'
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
} from "@mui/material";

// icons
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const SchemaModal = (props) => {
  const dispatch = useDispatch();
  const { onClose, open, schema, indexOfSchema } = props;
  const handleClose = () => {
    onClose();
  };

  //handler
  const handleDeleteSchema = () => {
    dispatch(removeSchema(indexOfSchema));
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title" sx={{ m: 0, p: 2 }}>
        Update {schema.name}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent dividers>
        <UpdateEntityForm schemaProps={schema} handleClose={handleClose} />
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={handleDeleteSchema}
          color="error"
          sx={{
            position: "absolute",
            left: 8,
            bottom: 8,
          }}
        >
          Delete
        </Button>
        <Button autoFocus onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SchemaModal;
