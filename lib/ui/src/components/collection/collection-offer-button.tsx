import { SizeFull, SizeSM } from '../../types/size'
import { ButtonColorScheme } from '../base/buttons/button-color-scheme'
import { ButtonContainer } from '../base/buttons/button-container'
import { ButtonContainerColor } from '../base/buttons/button-container-color'
import { ButtonInner } from '../base/buttons/button-inner'
import { ButtonInnerColor } from '../base/buttons/button-inner-color'
import { ButtonLabel } from '../base/buttons/button-label'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

export interface CollectionOfferButtonProps {
  count: number
  onMakeOffer?: () => unknown
}

export const CollectionOfferButton: FunctionComponent<CollectionOfferButtonProps> = ({ count, onMakeOffer }) => {
  const t = useTranslations('collection.button.makeOffer')
  return (
    <ButtonContainer size={SizeSM} disabled={count === 0} fixedWidth={SizeFull} onClick={onMakeOffer}>
      <ButtonContainerColor colorScheme={ButtonColorScheme.GRADIENT}>
        <ButtonInner size={SizeSM} className={clsx('px-2', 'py-0.5')}>
          <ButtonInnerColor variant={ButtonColorScheme.GRADIENT}>
            <div className={clsx('flex', 'flex-row', 'items-center', 'justify-between', 'w-full')}>
              <ButtonLabel size={SizeSM}>{t('label')}</ButtonLabel>
              <div
                className={clsx('flex', 'items-center', 'justify-center', 'w-6', 'h-6', 'rounded-lg', 'bg-dark-300')}
              >
                <span
                  className={clsx(
                    'text-[0.9375rem]',
                    'font-medium',
                    'leading-[155%]',
                    'tracking-[0.00938rem]',
                    'font-inter',
                    'text-white/50'
                  )}
                >
                  {count}
                </span>
              </div>
            </div>
          </ButtonInnerColor>
        </ButtonInner>
      </ButtonContainerColor>
    </ButtonContainer>
  )
}
