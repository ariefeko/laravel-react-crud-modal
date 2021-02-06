import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { Table,Button,Modal,ModalHeader,ModalBody,ModalFooter,Input,FormGroup,Label } from 'reactstrap';

class Index extends React.Component{

    constructor() {
        super()
        this.state = {
            tasks: [],
            newTaskData: {
                name:"",
                description:""
            },
            editTaskData: {
                id:"",
                name:"",
                description:""
            },
            newTaskModal: false,
            editTaskModal: false
        }
    }

    loadTasks() {
        axios.get('http://127.0.0.1:8000/api/tasks').then((response) => {
            this.setState({
                tasks: response.data
            })
        })
    }

    componentWillMount() {
        this.loadTasks()
    }

    toggleNewTaskModal() {
        this.setState({
            newTaskModal: !this.state.newTaskModal
        })
    }

    toggleEditTaskModal(){
        this.setState({
            editTaskModal: !this.state.editTaskModal
        })
    }

    addTask() {
        axios.post('http://127.0.0.1:8000/api/tasks', this.state.newTaskData).then((response) => {
            let {tasks} = this.state
            this.loadTasks()

            this.setState({ tasks, newTaskModal: false, newTaskData:{
                name:"",
                description:""
            }})
        })
    }

    updateTask() {
        let { id, name, description } = this.state.editTaskData

        axios.put('http://127.0.0.1:8000/api/tasks/'+id, {
            name,
            description
        }).then((response) => {
            this.loadTasks()
            this.setState({editTaskModal:false, editTaskData:{
                id:"",
                name:"",
                description:""
            }})
        })
    }

    editTask(id, name, description) {
        this.setState({
            editTaskData:{id, name, description},
            editTaskModal: !this.state.editTaskModal
        })
    }

    deleteTask(id){
        axios.delete('http://127.0.0.1:8000/api/tasks/'+id).then((response) => { this.loadTasks() })
    }

    render() {
        let tasks = this.state.tasks.map((task) => {
            return (
                <tr key={task.id}>
                    <td>{task.id}</td>
                    <td>{task.name}</td>
                    <td>{task.description}</td>
                    <td>
                        <Button color="success" size="sm" className="mr-2"
                            onClick={this.editTask.bind(this, task.id, task.name, task.description)}
                        >Edit</Button>
                        <Button color="danger" size="sm"
                            onClick={this.deleteTask.bind(this, task.id)}
                        >Delete</Button>
                    </td>
                </tr>
            )
        })

        return (
            <div className="App container">
                <h1>Todo List App</h1>
                <Button color="primary" onClick={this.toggleNewTaskModal.bind(this)}>Add Task</Button>

                {/* Add Modal */}
                <Modal isOpen={this.state.newTaskModal} toggle={this.toggleNewTaskModal.bind(this)}>
                    <ModalHeader toggle={this.toggleNewTaskModal.bind(this)}>Add Task</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input id="name"
                                value={this.state.newTaskData.name}
                                onChange={(e) => {
                                    let {newTaskData} = this.state
                                    newTaskData.name = e.target.value
                                    this.setState({ newTaskData })
                                }}
                            ></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input id="description"
                                value={this.state.newTaskData.description}
                                onChange={(e) => {
                                    let {newTaskData} = this.state
                                    newTaskData.description = e.target.value
                                    this.setState({ newTaskData })
                                }}
                            ></Input>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.addTask.bind(this)}>Add Task</Button>{' '}
                        <Button color="secondary" onClick={this.toggleNewTaskModal.bind(this)}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                {/* Edit Modal */}
                <Modal isOpen={this.state.editTaskModal} toggle={this.toggleEditTaskModal.bind(this)}>
                    <ModalHeader toggle={this.toggleEditTaskModal.bind(this)}>Edit Task</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input id="name"
                                value={this.state.editTaskData.name}
                                onChange={(e) => {
                                    let {editTaskData} = this.state
                                    editTaskData.name = e.target.value
                                    this.setState({ editTaskData })
                                }}
                            ></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input id="description"
                                value={this.state.editTaskData.description}
                                onChange={(e) => {
                                    let {editTaskData} = this.state
                                    editTaskData.description = e.target.value
                                    this.setState({ editTaskData })
                                }}
                            ></Input>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.updateTask.bind(this)}>Update Task</Button>{' '}
                        <Button color="secondary" onClick={this.toggleEditTaskModal.bind(this)}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default Index;

if (document.getElementById('index')) {
    ReactDOM.render(<Index/>, document.getElementById('index'));
}