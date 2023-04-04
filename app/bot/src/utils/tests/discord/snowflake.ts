import { SnowflakeUtil } from 'discord.js'

export function getRandomTime(start?: Date, end?: Date) {
  if (!start) {
    start = new Date(2015, 0, 1)
  }
  if (!end) {
    end = new Date()
  }
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

export function randomSnowflake(start?: Date, end?: Date) {
  return SnowflakeUtil.generate({ timestamp: getRandomTime(start, end) })
}
