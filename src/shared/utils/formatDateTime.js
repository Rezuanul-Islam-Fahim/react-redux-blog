import { parseISO, formatDistanceToNow } from 'date-fns'

export const getTimeAgoString = timestamp => {
  const date = parseISO(timestamp)
  const timeAgo = formatDistanceToNow(date)
  return timeAgo + ' ago'
}
