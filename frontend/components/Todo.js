import React from 'react'

export default class Todo extends React.Component {
  
  render() {
    const {tasks} = this.props;
    return (
      <div>
      <p>{tasks.name}</p>
      </div>
    )
  }
}
