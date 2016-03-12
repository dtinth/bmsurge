
import { render, h } from 'preact'
import ApplicationContainer  from './ApplicationContainer'
import './index.styl'

document.querySelector('main').innerHTML = ''
render(<ApplicationContainer />, document.querySelector('main'))
