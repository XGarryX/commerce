import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Shop from './page/Shop'
import Order from './page/Order'
import './style/App.less'
import './style/icon.less'

class App extends Component {
  render() {
    return(
      <Router>
        <Switch>
          <Route exact path="/shop/:id" component={Shop} />
          <Route path="/order" component={Order} />
        </Switch>
      </Router>
    )
  }
}

export default App
