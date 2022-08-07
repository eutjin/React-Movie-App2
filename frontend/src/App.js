import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Detail from "./routes/Detail";
import Home from "./routes/Home";
import Error from "./routes/Error"
import About from "./routes/About"
import Browse from "./routes/Browse"
import List from "./routes/List"
import Navbar from "./components/Navbar"
import Login from "./routes/Login";
import Register from "./routes/Register";
import Profile from "./routes/Profile";
import { MantineProvider } from '@mantine/core';

function App() {
  return (
    <MantineProvider theme={{ colorScheme: 'dark' }}>
    <Router>
      <Navbar/>
      <Switch>
        <Route path="/movie/:id">
          <Detail/>
        </Route>
        <Route path="/about">
          <About/>
        </Route>
        <Route path="/profile/:id">
          <Profile/>
        </Route>
        <Route path="/browse">
          <Browse/>
        </Route>
        <Route path="/list">
          <List/>
        </Route>
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/register">
          <Register/>
        </Route>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path='*'>
          <Error/>
        </Route>
      </Switch>
    </Router></MantineProvider>
  );
}

export default App;
