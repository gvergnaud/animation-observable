const { Observable } = require('rxjs')

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

const fromTo = (start, end) => t => start + t * (end - start)
const to = end => fromTo(0, end)

const combineLatestStyles = (...obs) =>
  Observable
    .combineLatest(...obs, (...values) => Object.assign({}, ...values))
    .sample(raf$)


module.exports = {
  animate,
  fromTo,
  to,
  combineLatestStyles,
}
