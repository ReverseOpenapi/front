import { makeStyles } from "@material-ui/styles";

export default makeStyles(() => ({
  contnent: {
    display: "flex",
  },
  input: {
    color: "red !important",
  },
  // root: {
  //   "&$disabled $notchedOutline": {
  //     borderColor: "orange",
  //   },
  // },
  textfield: {
    color: "black !important",
    fontSize: 14,
    fontWeight: "bold",
  },
  checkboxLabel: {
    color: "#6c5ca0 !important",
    fontSize: 14,
    fontWeight: "bold",
  },
  greenUnderline: {
    backgroundColor: "#333333 !important",
    "&:hover": {
      backgroundColor: "#333333 !important",
    },
  },
  selectColor: {
    color: "white",
  },
  buttonBg: {
    "&:hover": {
      backgroundColor: "#9b59b6 !important",
    },
  },
  optionButton: {
    color: "#6c5ca0",
    border: "1px solid #6c5ca0",
    backgroundColor: "#191919 !important",

    "&:hover": {
      backgroundColor: "#9b59b6 !important",
      border: "1px solid #6c5ca0",
      color: "silver",
    },
  },
  entityName: {
    color: "silver !important",
  },
  divider: {
    background: "silver",
  },
  card: {
    backgroundColor: "#333",
    padding: "0.5rem 1rem",
    maxWidth: "98%",
  },
}));
