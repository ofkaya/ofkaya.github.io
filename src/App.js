import "./App.css";
import AppFooter from "./components/AppFooter/AppFooter";
import AppHeader from "./components/AppHeader/AppHeader";
import MainForm from "./components/MainForm/MainForm";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <div className="main">
        <MainForm />
      </div>
      <AppFooter />
      <NotificationContainer />
    </div>
  );
}

export default App;
