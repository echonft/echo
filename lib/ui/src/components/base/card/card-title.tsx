import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  label: string
}

export const CardTitle: FunctionComponent<Props> = ({ label }) => {
  return <p className={clsx('prose-label-sm', 'text-white', 'truncate')}>{label}</p>
}
