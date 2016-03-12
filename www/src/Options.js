
import { h } from 'preact'
import styles from './Options.styl'

const checkedClass = checked => (checked
  ? styles.checkboxChecked
  : styles.checkboxUnchecked
)

const Checkbox = ({ label, checked, onChange }) => (
  <label className={[ styles.checkbox, checkedClass(checked) ].join(' ')}>
    <input type='checkbox' checked={!!checked} onChange={onChange} />{label}
  </label>
)

const Options = ({ options, store }) => (
  <div className={styles.root}>
    <Checkbox
      label='Song Notifications'
      checked={options.notifications}
      onChange={e => {
        const enabled = e.target.checked
        store.dispatch(app => app.setNotificationsEnabled(enabled))
      }}
    />
    <Checkbox
      label='Play History'
      checked={options.showHistory}
      onChange={e => {
        const enabled = e.target.checked
        store.dispatch(app => app.setShowHistory(enabled))
      }}
    />
  </div>
)

export default Options
