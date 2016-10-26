const { animate, fromTo, to, combineLatestStyles } = require('../src')
const { easeInOutQuart, easeOutQuint } = require('../src/easings')
const { range } = require('lodash/fp')

const x$ =
  animate(2000)
    .map(easeInOutQuart)
    .map(to(150))
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
  .forEach(style => {
    // remove 3 previous lines in console
    process.stdout.write("\033[" + 3 + "A")
    process.stdout.write("\r\x1b[K")

    console.log('x', range(0, style.x).reduce(acc => acc + '=', ''))
    console.log('scale', range(0, style.scale * 146).reduce(acc => acc + '.', ''))
    console.log(style)
  })
