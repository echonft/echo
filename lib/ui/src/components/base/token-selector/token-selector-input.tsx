import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props {
  onValueChange?: (value: number) => unknown
  maxValue: number
}

export const TokenSelectorInput: FunctionComponent<Props> = ({}) => {
  return (
    <div className={clsx('flex', 'flex-row', 'gap-1')}>
      <input type={'number'} className={'flex-'}></input>
    </div>
  )
}
