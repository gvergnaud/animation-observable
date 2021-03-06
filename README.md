# animation-observable
Compose animations with rxjs observable (POC)

## Simple example:

```js
const { animate, fromTo, to, combineLatestStyles } = require('../src')
const { easeInOutQuart, easeOutQuint } = require('./easings')

const x$ =
  animate(2000)
    .map(easeInOutQuart)
    .map(to(250))
    .startWith(0)
    .map(x => ({ x }))

const scale$ =
  animate(1000)
    .delay(1000)
    .map(easeOutQuint)
    .map(fromTo(.5, 1))
    .startWith(.5)
    .map(scale => ({ scale }))

combineLatestStyles(x$, scale$)
  .forEach(style => console.log(style))
```

## With React
```js
import React, { Component } from 'react'
import { render } from 'react-dom'
import { animate, fromTo, to, combineLatestStyles } from '../src'
import { easeInOutQuart, easeOutQuint } from './easings'

const x$ =
  animate(2000)
    .map(easeInOutQuart)
    .map(to(250))
    .startWith(0)
    .map(x => ({ x }))

const scale$ =
  animate(1000)
    .delay(1000)
    .map(easeOutQuint)
    .map(fromTo(.5, 1))
    .startWith(.5)
    .map(scale => ({ scale }))


class App extends Component {
  constructor(props) {
    super(props)
    this.state = { style: {} }
  }

  animate() {
    combineLatestStyles(x$, scale$)
      .forEach(style => this.setState({ style }))
  }

  render() {
    return (
      <div style={this.state.style} onClick={() => this.animate()}>
        Im animated!
      </div>
    )
  }
}

render(<App />, document.querySelector('#app'))
```

To try it out, just clone the repo and type `npm i && npm start`.
