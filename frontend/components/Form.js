import React from 'react'

export default class Form extends React.Component {
  state = {
    inputValue: ''
  }

  handleChange = (e) =>{
    this.setState({
      inputValue:e.target.value
    })
  }

  handleSubmit = (e) =>{
    e.preventDefault();
    this.props.addTask(e, this.state.inputValue);
    this.setState({
      inputValue: ''
    })
  }

  render() {
    return (
      <div className="inputForm">
        <form onSubmit={this.handleSubmit}>
        <input type="text" name="task" onChange={this.handleChange} value={this.state.inputValue} />
        <button>Add Task</button>
        </form>
      </div>
    )
  }
}
