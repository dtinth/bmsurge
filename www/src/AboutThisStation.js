
import { h } from 'preact'
import README  from '../README.md'
import styles  from './AboutThisStation.styl'

const AboutThisStation = ({ }) => (
  <div className={styles.root} dangerouslySetInnerHTML={{ __html: README }}></div>
)

export default AboutThisStation
