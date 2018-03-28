// @flow
import * as React from 'react'

export type Param = {
  name: string,
  value: any,
}

export type PropsType = {
  method: string,
  action: string,
  params: Array<Param>,
  children({ form: HTMLElement }): React$Element<*>,
  renderInputItem(param: Param): React$Element<*>,
}

export type DefaultProps = {
  params: Array<Param>,
}

export default class DownloadWrapper extends React.Component<DefaultProps, PropsType, *> {
  static defaultProps: DefaultProps = {
    params: [],
  }

  form: HTMLElement

  render() {
    const {
      method, children, action, params, renderInputItem,
    } = this.props

    if (typeof children !== 'function') {
      throw new Error('children should be a function')
    }

    return (
      <form method={method} action={action} ref={form => (this.form = form)}>
        {children({ form: this.form })}
        {params.map((param) => {
          if (renderInputItem) {
            return renderInputItem(param)
          }
          return (
            <input
              name={param.name}
              value={param.value}
              hidden
              key={param.name}
              onChange={() => {}}
            />
          )
        })}
      </form>
    )
  }
}
