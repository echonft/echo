import { FunctionComponent } from 'react'

export const Spinner: FunctionComponent = () => {
  return (
    <div className={'lds-roller'}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}
