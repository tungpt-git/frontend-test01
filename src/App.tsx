import { ThemeProvider } from "@material-ui/styles";
import "./App.css";
import { GlobalLayout } from "./layouts";
import { GlobalRoutes } from "./routers";
import { theme } from "./theme";
import { ThemeProvider as SCThemeProvider } from "styled-components";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateUtils from "@date-io/date-fns";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <SCThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={DateUtils}>
            <GlobalLayout>
              <GlobalRoutes />
            </GlobalLayout>
          </MuiPickersUtilsProvider>
        </SCThemeProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
