import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Asilos } from "./pages/Asilos";
import { Cadastrar } from "./pages/Cadastrar";
import { CriarEntidade } from "./pages/CriarEntidade";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Orfanatos } from "./pages/Orfanatos";
import { Sucesso } from "./pages/Sucesso";
import { persistor, store } from "./store";

function Routes() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/cadastro" component={Cadastrar} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/entidades/criar" component={CriarEntidade} />
            <Route exact path="/entidades/sucesso" component={Sucesso} />
            <Route path="/orfanatos/:id" component={Orfanatos} />
            <Route path="/asilos/:id" component={Asilos} />
          </Switch>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}
export default Routes;
