import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import 'bulma'
import './styles/main.scss'

import Map from './components/Map'

import Home from './common/Home'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <main>
          <Switch>
            <Route exact path="/" component={Home}/>
          </Switch>
        </main>
        <Map />
      </BrowserRouter>
    )
  }
}



ReactDOM.render(
  <App />,
  document.getElementById('root')
)