import { getTimeAgoString } from '../utils/formatDateTime'

const TimeAgo = ({ timestamp }) => {
  const timeAgo = getTimeAgoString(timestamp)

  return (
    <time datetime={timestamp} title={timestamp}>
      &nbsp; <i>{timeAgo}</i>
    </time>
  )
}

export default TimeAgo
