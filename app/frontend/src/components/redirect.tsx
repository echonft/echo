import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

interface Props {
  to: string
}

export const Redirect: React.FunctionComponent<Props> = ({ to }) => {
  const router = useRouter()
  useEffect(() => {
    void router.push(to)
  }, [router, to])
  return null
}
