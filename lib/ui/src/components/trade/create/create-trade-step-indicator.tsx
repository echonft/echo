import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { map, range } from 'ramda'
import type { FunctionComponent } from 'react'

export interface TradeStepIndicatorProps {
  step: number
  totalSteps: number
  subtitles: string[]
}

export const CreateTradeStepIndicator: FunctionComponent<TradeStepIndicatorProps> = ({
  step,
  totalSteps,
  subtitles
}) => {
  const t = useTranslations('trade')
  return (
    <div className={clsx('flex', 'flex-row')}>
      {map(
        (index) => (
          <div className={clsx('flex', 'flex-col', 'gap-y-5')} key={index}>
            <div className={clsx('flex', 'flex-row', 'items-center', 'relative', index === 0 && 'pl-1')}>
              <div
                className={clsx(
                  'h-0.75',
                  'grow',
                  'basis-0',
                  'transition-colors',
                  index === 0 && 'rounded-l-xl',
                  index <= step && 'bg-yellow-500'
                )}
              />
              <div
                className={clsx(
                  'absolute',
                  'top-1/2',
                  'left-1/2',
                  '-translate-x-1/2',
                  '-translate-y-1/2',
                  'w-3.5',
                  'h-3.5',
                  'rounded-full',
                  'transition-colors',
                  index <= step ? 'bg-yellow-500' : 'bg-white/10'
                )}
              />
              <div
                className={clsx(
                  'h-0.75',
                  'grow',
                  'basis-0',
                  'transition-colors',
                  index === step &&
                    index < totalSteps - 1 && [
                      'bg-gradientYellowToTransparent',
                      'bg-gradient-to-r',
                      'from-yellow-500',
                      'to-transparent'
                    ],
                  index < step && index < totalSteps - 1 ? 'bg-yellow-500' : 'transparent'
                )}
              />
            </div>
            <div className={clsx('flex', 'flex-col', 'pr-6')}>
              <span className={clsx('text-label-xxs', index > step ? 'text-white/30' : 'text-white/50')}>
                {t('stepIndicator', { step: index + 1 })}
              </span>
              <span className={clsx('prose-label-xs-semi', index > step ? 'text-white/50' : 'text-white')}>
                {subtitles[index]}
              </span>
            </div>
          </div>
        ),
        range(0, totalSteps)
      )}
    </div>
  )
}
