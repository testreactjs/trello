import React, { Component } from 'react';

export default class Lists extends Component {
  renderList = lists => {
    const { itemRenderer } = this.props;
    return lists.map(list => {
      const { id } = list;
      return React.cloneElement(itemRenderer(list), {
        key: id,
      });
    });
  };

  render() {
    const { lists } = this.props;
    return <div className="row">{this.renderList(lists)}</div>;
  }
}
