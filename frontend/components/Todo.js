import React from 'react'

export default class Todo extends React.Component {
  
  render() {
    
    const {task: {completed, name, id}, toggleItem } = this.props;
    return (
    
      <div className= {completed ? 'completed' : ''} onClick={()=>toggleItem(id)}>
      <p>{name}</p>
      </div>
    )
  }
}
