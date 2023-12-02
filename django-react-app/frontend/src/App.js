import React, { Component } from 'react'
import './App.css';
import CustomModal from './components/Modal';
import axios from 'axios';



class App extends Component {
  constructor(props) {
    super(props);
    this.state= {
      modal: false,
      viewCompleted:false,
      taskList:tasks,
      activeItem: {
        title: "",
        description: "",
        completed: false
      },
      todoList: []
    };
  }
  componentDidMount() {
    this.refreshlist();
  }
  refreshlist = () => {
    axios
    .get("http://localhost:8000/api/tasks")
    .then(res => this.state({ todoList: res.data }))
    .catch(err => console.log(err))
  };
  toggle = () => {
    this.setState({modal: !this.state.modal});
  };
  handleSubmit = item => {
    this.toggle();
    if (item.id) {
      axios
      .put('http://localhost:8000/api/tasks/${item.ad}/', item)
      .then(res => this.refreshlist())
    }
    axios
    .post("http://localhost:8000/api/tasks/", item)
    .then( res => this.refreshlist())
  };
  handleDelete = item => {
    axios
      .delete('http://localhost:8000/api/tasks/${item.ad}/')
      .then(res => this.refreshlist())
  };
  createItem = () => {
    const item = {title: "", modal: !this.state.modal};
    this.setState({ activeItem: item, modal: !this.state.modal});
  };
  editItem = item => {
    this.setState({activeItem: item, modal: !this.state.modal})
  }
  displayCompleted = status => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }
    return this.setState({ viewCompleted: false });
  }
  renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "active" : ""}
        >
          completed
            </span>
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "" : "active"}
        >
          Incompleted
            </span>
      </div>
    )
    
  }

  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.todolist.filter(
      item => item.completed === viewCompleted
    );
    return newItems.map(item => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${this.state.viewCompleted ? "completed-todo" : ""
            }`}
          title={item.title}
        >
          {item.title}
        </span>
        <span>
          <button className="btn btn-info mr-2">Edit</button>
          <button className="btn btn-danger mr-2">Delete</button>
        </span>
      </li>
    ))
  
  
  };

  render() {
    return (
      <main className="content p-3 mb-2 bg-info">
        <h1 className="text-white text-uppercase text-center my-4">Task Manager</h1>
        <div className="row ">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div>
                <button className="btn btn-warning">Add Task</button>

              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        <footer className="my-3 mb-2 bg-info text-white text-center">Copyright 2023 &copy; karmadi nidhal and gift moyo</footer>
        {this.state.modal ? (
          <modal activeItem={this.state.activeItem} toggle={this.toggle}
          onSave={this.handleSubmit}/>
        ) : null}
        
      
      </main>
    );
  };
}
export default App;