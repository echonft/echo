import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

export const CreatedOfferSuccessImg: FunctionComponent = () => {
  return (
    <div
      className={clsx(
        'w-[13.5625rem]',
        'h-[13.5625rem]',
        `bg-[url('https://storage.googleapis.com/echo-dev-public/offer-created-success.png?alt=media')]`
      )}
    />
  )
}
