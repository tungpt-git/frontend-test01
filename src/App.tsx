import { ThemeProvider } from "@material-ui/styles";
import "./App.css";
import GlobalLayout from "./layouts/GlobalLayout";
import { GlobalRoutes } from "./routers";
import { theme } from "./theme";

function App() {
  console.log(theme)
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <GlobalLayout>
          <GlobalRoutes />
        </GlobalLayout>
      </ThemeProvider>
    </div>
  );
}

export default App;
