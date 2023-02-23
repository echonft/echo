import { SwapState } from './swap-state'
import { Dayjs } from 'dayjs'

export interface SwapActivity {
  date: Dayjs
  fromState: SwapState | undefined
  toState: SwapState
}
