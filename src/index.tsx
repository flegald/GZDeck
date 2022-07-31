import ReactDOM from "react-dom";
import { App } from "./App";
import background from './assets/images/FQJ4izH.png'
ReactDOM.render(
  <div style={{backgroundImage: `url(${background})`, height: '100vh'}}>
  <App />
  </div>, document.getElementById("root"));
