import "./App.css";
import Mcd from "./mcd/pages/Mcd";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, sans-serif",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Mcd />
    </ThemeProvider>
  );
}

export default App;
