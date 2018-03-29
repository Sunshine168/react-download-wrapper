/* eslint-disable */
import React, { Component } from 'react'
import { render } from 'react-dom'

import DownloadWrapper from '../src'

class App extends Component {
  render() {
    return (
      <div>
        <DownloadWrapper
          method="post"
          action="/download"
          params={[{ value: '123', name: 'test1' }]}
        >
          {({ getForm }) => (
            <button
              onClick={() => {
                getForm().submit()
              }}
            >
              download
            </button>
          )}
        </DownloadWrapper>
      </div>
    )
  }
}

render(<App />, document.getElementById('app'))
