import React from "react";
import { useDispatch } from "react-redux";
import { removeEntity } from "../../features/entitySlice";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import UpdateEntityForm from "../Entities/UpdateEntityForm";

const SchemaModal = (props) => {
  const dispatch = useDispatch();
  const { onClose, open, entity, indexOfEntity } = props;
  const handleClose = () => {
    onClose();
  };

  const handleDeleteEntity = () => {
    dispatch(removeEntity(indexOfEntity));
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title" sx={{ m: 0, p: 2 }}>
        update {entity.name}
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
        <UpdateEntityForm entityProps={entity} />
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={handleDeleteEntity}
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
