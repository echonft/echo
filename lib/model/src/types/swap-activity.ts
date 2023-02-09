import { SwapState } from './swap-state'
import { Dayjs } from 'dayjs'

export interface SwapActivity {
  id: string
  date: Dayjs
  fromState: SwapState | undefined
  toState: SwapState
  data?: object
}
