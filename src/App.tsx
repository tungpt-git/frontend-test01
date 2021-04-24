import "./App.css";
import GlobalLayout from "./layouts/GlobalLayout";
import { Search } from "./pages/";

function App() {
  return (
    <div className="App">
      <GlobalLayout>
        <Search />
      </GlobalLayout>
    </div>
  );
}

export default App;
