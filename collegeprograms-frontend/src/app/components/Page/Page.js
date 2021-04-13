import React from 'react';

export default class Page extends React.Component {
  componentDidMount () {
    document.title = this.props.title ? `College Programs | ${this.props.title}` : 'College Programs';
  }

  render () {
    return this.props.children;
  }
};