import React from 'react'
import Todo from './Todo'

export default class TodoList extends React.Component {
  
  
  clearButton = e => {
    e.preventDefault();
    clearCompleted();
  }

  render() {
    const {clearCompleted, toggleItem, tasks} = this.props;
    return (
      <div>
        <div className="todo-list">
      {tasks.map(task => (
        <Todo 
          key={task.id} 
          task={task.name} 
          toggleItem={toggleItem} 
          />

      ))}
    </div>
    <button onClick={this.clearButton} className="clear-btn">Clear Completed</button>
      </div>
    )
      }
    }
