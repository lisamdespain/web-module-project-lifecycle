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
      console.log('res', res)
        
        this.setState({
            ...this.state, tasks: res.data.data.filter(task => !task.completed)
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
/**
 * toggles the boolean in the completed field of a task
 * by sending a patch request to the backend and sets the data returned 
 * to local state
 * @param {string} taskId 
 
 */
toggleItem = (taskId) =>{
  axios.patch(`${URL}/${taskId}`)
    .then(res => {
      console.log('res', res)
        
      this.setState({
          tasks: this.state.tasks.map(task => {
            if (res && taskId === task.id) {
              return res.data.data;
            }
            return task;
          })
        });
    })
    .catch(err => {
      this.setState({...this.state, error: err.response.data.message})
})
  // 
}

  addTask = (e, item) =>{
    e.preventDefault();
    this.postNewTask(item);
    }
  
  resetForm = () => this.setState({ ...this.state, inputValue: ''});  

  postNewTask = (item) =>{
    
    axios.post(URL, {name: item})
    .then(res =>{
        this.getTasks();
        this.resetForm();
    })
    .catch(err => {console.log('Error from post new task', err)})
  }
  

  render() {
    console.log('this.state.inputValue', this.state.inputValue)
    return (
      <div className="app">
        {/* {this.state.tasks.map(td =>{
          return <div key={td.id}>{td.name}</div>
        })} */}
      <Form addTask={this.addTask}/>
      <TodoList clearCompleted={this.clearCompleted} toggleItem={this.toggleItem} tasks={this.state.tasks}/>
      </div>
    )
  }
}
