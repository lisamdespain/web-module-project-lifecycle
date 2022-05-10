import React from 'react'
import Form from './Form';
import TodoList from './TodoList';
import axios from 'axios';
const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    tasks:[],
    error: '', 
    inputValue: ''
  }
  
  getTasks = () =>{
    axios.get(URL)
    .then(res => {
        
        this.setState({
            ...this.state, tasks: res.data.data
        })
    })
    .catch(err => {
      this.setState({...this.state, error: err.response.data.message})
})
}

  componentDidMount(){
    this.getTasks()
  }

clearCompleted = () =>{
  this.setState({
    tasks: this.state.tasks.filter(item => !item.completed)
  })
}

toggleItem = (taskId) =>{
  this.setState({
    tasks: this.state.tasks.map(task => {
      if (taskId === task.id) {
        return {
          ...task,
          completed: !task.completed
        }
      }
      return task;
    })
  });
}

  addTask = (e, item) =>{
    e.preventDefault();
    this.postNewTask(item);
    }
  
  resetForm = () => this.setState({ ...this.state, inputValue: ''});  

  postNewTask = () =>{
    axios.post(URL, {name: this.state.inputValue})
    .then(res =>{
        this.getTasks();
        this.resetForm();
    })
    .catch(err => {console.log('Error')})
  }


  render() {
    return (
      <div className="app">
        {this.state.tasks.map(td =>{
          return <div key={td.id}>{td.name}</div>
        })}
      <Form addTask={this.addTask}/>
      {/* <TodoList clearCompleted={this.clearCompleted} toggleItem={this.toggleItem} tasks={this.tasks}/> */}
      </div>
    )
  }
}
