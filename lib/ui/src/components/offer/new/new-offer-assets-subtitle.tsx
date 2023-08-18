import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

interface Props {
  subtitle: string
}

export const NewOfferAssetsSubtitle: FunctionComponent<Props> = ({ subtitle }) => {
  return <span className={clsx('prose-label-lg', 'text-white/50')}>{subtitle}</span>
}
