import { clsx } from 'clsx'
import { keys, map } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  vars: Record<string, string>
}

export const EnvVars: FunctionComponent<Props> = ({ vars }) => {
  return (
    <div className={clsx('w-full', 'h-max', 'flex', 'flex-col', 'gap-4', 'pt-14')}>
      {map(
        (key) => (
          <p key={key}>
            <span className={clsx('prose-label-md-semi', 'text-white')}>{`${key}: `}</span>
            <span className={clsx('prose-label-sm-light', 'text-yellow-200')}>${vars[key]}</span>
          </p>
        ),
        keys(vars)
      )}
    </div>
  )
}
