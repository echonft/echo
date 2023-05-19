import { SwapState } from './swap-state'
import dayjs from 'dayjs'

export interface SwapActivity {
  date: dayjs.Dayjs
  fromState: SwapState | undefined
  toState: SwapState
}
