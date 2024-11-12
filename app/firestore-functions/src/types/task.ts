import type { CloudFunctionName } from '@echo/firestore-functions/constants/cloud-function-name'

export interface Task<T> {
  data: T
  name: CloudFunctionName
  options: {
    id: string
    uri: string
    scheduleTime?: Date
  }
}
