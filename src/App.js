import "./index.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Login, Error } from "./pages/index";
import { PATHS } from "./utils/api";
import { Navbar } from "./components/common/index";
import { Home } from "./pages/Home";
import Profile from "./pages/Profile";
import ProtectedRoute from "./utils/protectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path={PATHS.HOME} component={Home} />
        <Route exact path={PATHS.LOGIN} component={Login} />
        <ProtectedRoute exact path={PATHS.PROFILE} component={Profile} />
        <Route component={Error} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
