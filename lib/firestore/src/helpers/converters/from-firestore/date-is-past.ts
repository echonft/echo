import dayjs, { Dayjs } from 'dayjs'

export const dateIsPast = (date: Dayjs) => date.isBefore(dayjs())
