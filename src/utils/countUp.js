import { CountUp } from 'countup.js'

export default function countUp(config) {
  let defaultOptions = {
    useEasing: true,
    useGrouping: true,
    separator: ',',
    decimal: '.',
  }
  const computed = new CountUp(
    config.dom,
    config.startVal,
    config.endVal,
    config.decimals,
    config.ms,
    defaultOptions
  )
  computed.start()
}
