import "./App.css";
import GlobalLayout from "./layouts/GlobalLayout";
import { GlobalRoutes } from "./routers";

function App() {
  return (
    <div className="App">
      <GlobalLayout>
        <GlobalRoutes />
      </GlobalLayout>
    </div>
  );
}

export default App;
