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
  .map(style => (
    <div style={style} />
  ))
