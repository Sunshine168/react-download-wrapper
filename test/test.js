import test from 'ava'
import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Download from '../build/main'

Enzyme.configure({ adapter: new Adapter() })

test('Download display is ok', (t) => {
  const App = () => (
    <Download action='/' method='post'>
      <button>download</button>
    </Download>
  )
  const button = mount(<App />)
  t.is(button.find('form').length, 1)
  t.is(button.find('button').length, 1)
})

test('params passed is ok', (t) => {
  const App = () => (
    <Download
      action='/'
      method='post'
      params={[
        {
          name: 'test1',
          value: '1',
        },
        {
          name: 'test2',
          value: '1',
        },
      ]}
    >
      <button>download</button>
    </Download>
  )
  const button = mount(<App />)
  t.is(button.find('input').length, 2)
})
