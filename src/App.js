import Header from "./components/Header/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "@material-ui/core";
import Trending from "./components/pages/Trending/Trending";
import Movies from "./components/pages/Movies/Movies";
import Search from "./components/pages/Search/Search";
import Series from "./components/pages/Series/Series";
import MovieInfo from "./components/MovieInfo/MovieInfo";

function App() {
  return (
    <Router>
      <Header />
      <div className="app">
        <Container>
          <Switch>
            <Route exact path="/">
              <Trending />
            </Route>
            <Route path="/movies">
              <Movies />
            </Route>
            <Route path="/series">
              <Series />
            </Route>
            <Route path="/search">
              <Search />
            </Route>
            <Route path="/:media/:id">
              <MovieInfo />
            </Route>
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default App;
