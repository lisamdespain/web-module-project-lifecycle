import React from 'react'
import Todo from './Todo'

export default class TodoList extends React.Component {
  
  
  

  render() {
    const clearButton = e => {
      e.preventDefault();
      clearCompleted();
    }
    const {clearCompleted, toggleItem, tasks} = this.props;
    console.log('tasks', tasks)
    return (
      <div>
        <div className="todo-list">
      {tasks.map(task => (
        <Todo 
          key={task.id} 
          task={task} 
          toggleItem={toggleItem} 
          />

      ))}
    </div>
    <button onClick={clearButton} className="clear-btn">Clear Completed</button>
      </div>
    )
      }
    }
