
import { h } from 'preact'
import styles  from './ServerStatus.styl'

const ServerStatus = ({ status }) => (
  <div className={styles.root} dangerouslySetInnerHTML={{ __html: status }}>
  </div>
)

export default ServerStatus
