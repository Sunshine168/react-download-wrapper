// @flow
import * as React from 'react'

export type Param = {
  name: string,
  value: any,
}

export type PropsType = {
  onClick(e: SyntheticEvent): void,
  method: string,
  action: string,
  params: Array<Param>,
  children: React.Children,
  renderInputItem(param: Param): React$Element<*>,
  disabled: boolean,
}

export type DefaultProps = {
  params: Array<Param>,
}

export default class DownloadWrapper extends React.Component<DefaultProps, PropsType, *> {
  static defaultProps: DefaultProps = {
    params: [],
  }
  onClick = (e: SyntheticEvent): void => {
    const { disabled } = this.props
    if (disabled) {
      return
    }

    const { form } = this
    if (!(form instanceof window.HTMLElement)) {
      return
    }

    form.submit()
    const { onClick } = this.props
    if (typeof onClick === 'function') {
      onClick(e)
    }
  }

  form: HTMLElement

  render() {
    const {
      method, children, action, params, renderInputItem, ...otherProps
    } = this.props
    const elem = React.Children.only(children)
    const Element = React.cloneElement(elem, {
      ...otherProps,
      onClick: this.onClick,
    })
    return (
      <form method={method} action={action} ref={form => (this.form = form)}>
        {Element}
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
