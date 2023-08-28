import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface OfferDetailsStateTextContainerProps {
  title?: string
  subtitle: string
}

export const OfferDetailsStateTextContainer: FunctionComponent<OfferDetailsStateTextContainerProps> = ({
  title,
  subtitle
}) => (
  <div className={clsx('flex', 'flex-col')}>
    <span className={clsx('text-white/70', 'text-caps-md', 'font-inter', 'text-center', !title && 'invisible')}>
      {title || 'HIDDEN'}
    </span>
    <span className={clsx('text-white', 'prose-header-lg-semi', 'text-center')}>{subtitle}</span>
  </div>
)
