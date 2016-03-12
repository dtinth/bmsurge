
import { render, h } from 'preact'
import ApplicationContainer  from './ApplicationContainer'
import './index.styl'

render(<ApplicationContainer />,
  document.querySelector('main'),
  document.querySelector('main').firstChild
)
