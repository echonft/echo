import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

export const CreatedOfferExpiredImg: FunctionComponent = () => {
  return (
    <div
      className={clsx(
        'w-[10.5rem]',
        'h-[10.5rem]',
        `bg-[url('https://storage.googleapis.com/echo-dev-public/offer-expired.png?alt=media')]`
      )}
    />
  )
}
