import React from 'react'
import { render }from 'react-dom'
import './index.css'
import App from './Component/App'
import { Provider } from "react-redux";
import store from "./Redux/Store/index"

render (
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
