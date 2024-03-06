import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  label: string
}

export const CardSubtitle: FunctionComponent<Props> = ({ label }) => {
  return <p className={clsx('prose-label-sm-light', 'text-white/70', 'truncate')}>{label}</p>
}
