const { Observable } = require('rxjs')
const {
  linear,
  easeInQuad,
  easeOutQuad,
  easeInOutQuad,
  easeInCubic,
  easeOutCubic,
  easeInOutCubic,
  easeInQuart,
  easeOutQuart,
  easeInOutQuart,
  easeInQuint,
  easeOutQuint,
  easeInOutQuint,
} = require('./easings')
const { range } = require('lodash/fp')

// emulate the requestAnimationFrame to be executed in nodejs
const window = {
  requestAnimationFrame: (f) => {
    setTimeout(f, 60 / 1000)
  }
}

const raf$ = new Observable(observer => {
  let isRunning = true
  const loop = () => {
    observer.next()
    if (isRunning) window.requestAnimationFrame(loop)
  }
  loop()
  return { unsubscribe: () => { isRunning = false } }
})

const animate = duration => raf$
  .mapTo(Date.now())
  .map(start => Date.now() - start)
  .map(time => time / duration)
  .takeUntil(Observable.interval(duration).take(1))


animate(2000)
  .map(easeInOutQuart)
  .do(x => console.log('easeInOutQuart', x))
  .forEach(x => {
    process.stdout.write("\033[" + 2 + "A") // move cursor up
    process.stdout.write("\r\x1b[K") // clearLine
    console.log(range(0, x * 200).reduce(acc => acc + '=', ''))
  })
