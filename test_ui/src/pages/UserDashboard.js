import React, { useEffect, useState } from "react";
import { Container, Col, Row,FormGroup, Label,
    Input, Table, Button, Form, Modal, ModalHeader, ModalBody, Card, CardBody, } from 'reactstrap';

import apiBaseUrl from "../config";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserDashboard(props) {
    const [displayInfo, setInfoMsg] = useState(false); //Check if all field have values or not
    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [taskList, getTaskList] = useState([]);
    const [todayTaskList, getTodayTaskList] = useState([]);
    const [upcomingTaskList, getUpcomingTaskList] = useState([]);
    const [overdueTaskList, getOverdueTaskList] = useState([]);
    const [registerForm, openRegisterForm] = useState(false);
    const [editTask, getEditTask] = useState({});
    const [taskDetail, setTaskDetail] = useState({
        taskName: "",
        deadline: "",
        taskPriority: "",
        iscomplete: false,
        uid: null,
    }); // Set state for file Type

    //For Add task Modal
    const {
        buttonLabel,
        className
    } = props;

    const toastBox = {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: '',
    }

    const ColoredLine = ({ color }) => (
        <hr
            style={{
                color: color,
                backgroundColor: color,
                height: 5
            }}
        />
    ); // For horizontal lines

    const handleFormInput = (e) => {
        console.log('editTask',editTask)
        let name = e.target.name;
        let value = e.target.value;
        setTaskDetail({...taskDetail, [name]:value});
        getEditTask({...editTask, [name]:value});
    }

    const toggle = () => {
        getEditTask({});
        setTaskDetail({});
        openRegisterForm(true);
        setInfoMsg(false);
        setModal(!modal);
    };

    const editToggle = () => {
        openRegisterForm(false);
        setInfoMsg(false);
        // setSpinnerLoading(false)
        setEditModal(!editModal)
    };

    const printDate = (date) => {
        const getDate = new Date(`${date}`);
        return `${getDate.getDate()}-${getDate.getMonth()+1}-${getDate.getFullYear()}`;
    }

    const formatDate = (date) => {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
    
        return [year, month, day].join('-');
    }

    const todayTask = () => {
        let currentDate = new Date();
        let newArray = taskList.filter((el) => {
            return (
                new Date(el.task_deadline).getDate() == currentDate.getDate() &&
                new Date(el.task_deadline).getMonth() == currentDate.getMonth() && 
                new Date(el.task_deadline).getFullYear() == currentDate.getFullYear()
            );
        });
        getTodayTaskList(newArray);
    }

    const upComingTask = () => {
        let currentDate = new Date();
        let newArr = taskList.filter((el) => {
            return (
                new Date(el.task_deadline).setHours(0,0,0,0) > currentDate.setHours(0,0,0,0)
            );
        });
        getUpcomingTaskList(newArr);
    }

    const overDueTask = () => {
        let currentDate = new Date();
        let newArr = taskList.filter((el) => {
            return (
                new Date(el.task_deadline).setHours(0,0,0,0) < currentDate.setHours(0,0,0,0)
            );
        });
        getOverdueTaskList(newArr);
    }

    const submitTask = async (e) => {
        e.preventDefault();
        taskDetail.iscomplete = false;
        let userObj = localStorage.getItem('DataObj');
        let userJson = JSON.parse(userObj);
        if('UserId' in userJson) {
            taskDetail.uid = userJson.UserId
        }
        console.log('userObj',taskDetail);

        if(taskDetail.taskName && taskDetail.deadline && taskDetail.taskPriority) {
            setInfoMsg(false);
            const {taskName, deadline, taskPriority, iscomplete, uid} = taskDetail;
            try {
                const res = await fetch(`${apiBaseUrl}addTask`, {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({taskName, deadline, taskPriority, iscomplete, uid}),
                }).then(response => {
                    return response.text();
                })
                .then(data => {
                    console.log('data',data)
                    toast(`${data}`, toastBox)
                    toggle();
                    getTaskDetails();
                });
            } catch(err) {
                if(err.response.status === 500) {
                    console.log('There was problem with the server');
                } else {
                    console.log(err.response.data.msg);
                }
            }

        } else {
            setInfoMsg(true); 
        }
    }

    const updateTask = async (e) => {
        e.preventDefault();
        let taskId = editTask.task_id;

        if(editTask.task_name && editTask.task_deadline && editTask.task_priority) {
            setInfoMsg(false);
            const { task_name, task_deadline, task_priority } = editTask;
            try {
                const res = await fetch(`${apiBaseUrl}updateTask/${taskId}`, {
                    method: 'PUT',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ task_name, task_deadline, task_priority }),
                }).then(response => {
                    return response.text();
                })
                .then(data => {
                    toast.success(`${task_name} Updated!`, toastBox)
                    editToggle();
                    getTaskDetails();
                });
            } catch(err) {
                if(err.response.status === 500) {
                    console.log('There was problem with the server');
                } else {
                    console.log(err.response.data.msg);
                }
            }
        } else {
            setInfoMsg(true); 
        }

    }

    // Getting the list of tasks
    const getTaskDetails = async () => {
        await fetch(
            `${apiBaseUrl}taskList`
          )
        .then((response) => response.json())
        .then((data) => {
            let uid; let userObj = localStorage.getItem('DataObj'); let userJson = JSON.parse(userObj);
            if('UserId' in userJson) { uid = userJson.UserId }
            let Data = data.filter(task => task.uid === uid);
            Data.sort((a, b) => a.task_priority - b.task_priority);
            getTaskList(Data);
            console.log('taskist', Data);
        })
        .catch((err) => {
            console.log(`${err} while contacting the quote API.`);
        });
    }

    const removeTask = async (id) => {
        let userID = id;
        console.log('id',userID)
        try {
            await fetch(`${apiBaseUrl}delete/${userID}` , {
                method: 'DELETE',
              }).then(response => response.text())
              .then(data => {
                toast(`${data}`,toastBox)
                
                // Update the User Table after deleting User Row
                getTaskDetails();
              });
        } catch(err) {
            if(err.response.status === 500) {
                console.log('There was problem with the server');
            } else {
                console.log(err.response.data.msg);
            }
        }
    } 

    const completeTask = async(taskName, id, isComplete) => {
        console.log(id);
        let userID = id;
        console.log(isComplete);
        try {
            const res = await fetch(`${apiBaseUrl}updateAsComplete/${userID}`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({isComplete}),
            }).then(response => {
                return response.text();
            })
            .then(data => {
                toast(`${taskName} is ${isComplete ? 'Completed' : 'Incomplete'}`, toastBox);
                getTaskDetails();
            });
        } catch(err) {
            if(err.response.status === 500) {
                console.log('There was problem with the server');
            } else {
                console.log(err.response.data.msg);
            }
        }
    }

    // edit task
    const editTaskData = async (id) => {
        console.log('edit',id)
        const userID = id;
        try {
            await fetch(`${apiBaseUrl}edit/${userID}`  , {
                method: 'GET',
              }).then(response => response.text())
              .then(data => {
                  const getData = JSON.parse(data);
                  console.log('edit Data', getData)
                getEditTask(getData[0]);
                editToggle();
              });
        } catch(err) {
            if(err.response.status === 500) {
                console.log('There was problem with the server');
            } else {
                console.log(err.response.data.msg);
            }
        }
    }

    useEffect(() => {
        getTaskDetails();
    },[])

    useEffect(() => {
        todayTask();
        upComingTask();
        overDueTask();
    },[taskList])

    return (
        <div className="user_dashboard">
            <Container>
                <Row> 
                    <Col lg="12">
                        <h2>User Dashboard</h2> 
                        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."</p>
                        <Button onClick={toggle}>Add Task</Button>
                    </Col>
                </Row>
                <ColoredLine color={"#0c0c0c"}/>
                <Row>
                    <Col lg="12">
                        <h4>Todays Tasks</h4> 
                        <Table>
                            <thead>
                                <tr>
                                    {/* <th>Task Id</th> */}
                                    <th>Task Name</th>
                                    <th>Task Deadline</th>
                                    <th>Task Priority</th>
                                    <th>Is Complete</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {todayTaskList && todayTaskList.length > 0 ? todayTaskList.map((task) => (
                                    <tr key={task.task_id}>
                                        {/* <td>{task.task_id}</td> */}
                                        <td>{task.task_name}</td>
                                        <td>{printDate(task.task_deadline)}</td>
                                        <td>{task.task_priority === 1 ? "High" : task.task_priority === 2 ? "Medium" : task.task_priority === 3 ? "low" : "N/A"}</td>
                                        <td>{task.is_complete === false ? "No" : "Yes"}</td>
                                        <td style={{ display: "flex", flexDirection: "column" }}>
                                            <span style={{cursor: 'Pointer', marginRight: '10px', textDecoration: 'underline'}} onClick={() => editTaskData(task.task_id)}>Edit</span>
                                            <span style={{cursor: 'Pointer', marginRight: '10px', textDecoration: 'underline'}} onClick={() => removeTask(task.task_id)}>Remove</span>
                                            <span style={{cursor: 'Pointer', textDecoration: 'underline'}} onClick={() => completeTask(task.task_name, task.task_id, !task.is_complete)}>{task.is_complete === false ? "Mark as Complete" : "Mark as Incomplete"}</span>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan='6' style={{textAlign: 'center', fontSize: '16px', fontWeight: '600'}}>No data available!</td>
                                    </tr>
                                ) }
                            </tbody>
                        </Table>
                    </Col>
                    <Col lg="12">
                        <h4>Upcoming Tasks</h4> 
                        <Table>
                            <thead>
                                <tr>
                                    {/* <th>Task Id</th> */}
                                    <th>Task Name</th>
                                    <th>Task Deadline</th>
                                    <th>Task Priority</th>
                                    <th>Is Complete</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {upcomingTaskList && upcomingTaskList.length > 0 ? upcomingTaskList.map((task) => (
                                    <tr key={task.task_id}>
                                        {/* <td>{task.task_id}</td> */}
                                        <td>{task.task_name}</td>
                                        <td>{printDate(task.task_deadline)}</td>
                                        <td>{task.task_priority === 1 ? "High" : task.task_priority === 2 ? "Medium" : task.task_priority === 3 ? "low" : "N/A"}</td>
                                        <td>{task.is_complete === false ? "No" : "Yes"}</td>
                                        <td style={{ display: "flex", flexDirection: "column" }}>
                                            <span style={{cursor: 'Pointer', marginRight: '10px', textDecoration: 'underline'}} onClick={() => editTaskData(task.task_id)}>Edit</span>
                                            <span style={{cursor: 'Pointer', marginRight: '10px', textDecoration: 'underline'}} onClick={() => removeTask(task.task_id)}>Remove</span>
                                            <span style={{cursor: 'Pointer', textDecoration: 'underline'}} onClick={() => completeTask(task.task_name, task.task_id, !task.is_complete)}>{task.is_complete === false ? "Mark as Complete" : "Mark as Incomplete"}</span>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan='6' style={{textAlign: 'center', fontSize: '16px', fontWeight: '600'}}>No data available!</td>
                                    </tr>
                                ) }
                            </tbody>
                        </Table>
                    </Col>
                    <Col lg="12">
                        <h4>Overdue Tasks</h4> 
                        <Table>
                            <thead>
                                <tr>
                                    {/* <th>Task Id</th> */}
                                    <th>Task Name</th>
                                    <th>Task Deadline</th>
                                    <th>Task Priority</th>
                                    <th>Is Complete</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {overdueTaskList && overdueTaskList.length > 0 ? overdueTaskList.map((task) => (
                                    <tr key={task.task_id}>
                                        {/* <td>{task.task_id}</td> */}
                                        <td>{task.task_name}</td>
                                        <td>{printDate(task.task_deadline)}</td>
                                        <td>{task.task_priority === 1 ? "High" : task.task_priority === 2 ? "Medium" : task.task_priority === 3 ? "low" : "N/A"}</td>
                                        <td>{task.is_complete === false ? "No" : "Yes"}</td>
                                        <td style={{ display: "flex", flexDirection: "column" }}>
                                            <span style={{cursor: 'Pointer', marginRight: '10px', textDecoration: 'underline'}} onClick={() => editTaskData(task.task_id)}>Edit</span>
                                            <span style={{cursor: 'Pointer', marginRight: '10px', textDecoration: 'underline'}} onClick={() => removeTask(task.task_id)}>Remove</span>
                                            <span style={{cursor: 'Pointer', textDecoration: 'underline'}} onClick={() => completeTask(task.task_name, task.task_id, !task.is_complete)}>{task.is_complete === false ? "Mark as Complete" : "Mark as Incomplete"}</span>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan='6' style={{textAlign: 'center', fontSize: '16px', fontWeight: '600'}}>No data available!</td>
                                    </tr>
                                ) }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div>
                            <Modal isOpen={modal} toggle={toggle} className={className}>
                                <ModalHeader toggle={toggle}>Add Task</ModalHeader>
                                <ModalBody>
                                    <Card className="border-0">
                                        <CardBody className="w-100">
                                            <Form className="row">
                                                <FormGroup className="col-sm-12">
                                                    <Label for="taskName">Task Name</Label>
                                                    <Input type="text" name="taskName" id="taskName" onChange={handleFormInput} placeholder="Task Name" />
                                                </FormGroup>
                                                <FormGroup className="col-sm-12">
                                                    <Label for="taskDate">Task Deadline</Label>
                                                    <Input type="date" name="deadline" id="taskDate" onChange={handleFormInput} placeholder="Task Deadline" />
                                                </FormGroup>
                                                <FormGroup className="col-sm-12">
                                                    <Label for="taskPriority">Task Priority</Label>
                                                    <Input type="select" name="taskPriority" id="taskPriority" onChange={handleFormInput} >
                                                        <option value="N/A">N/A</option>
                                                        <option value="1">High</option>
                                                        <option value="2">Medium</option>
                                                        <option value="3">Low</option>
                                                    </Input>
                                                </FormGroup>
                                                
                                                <>
                                                    { displayInfo ?
                                                    <div style={{ width: '100%', textAlign: 'left', color: '#f00', paddingTop: '10px' }}>
                                                        <p style={{ fontSize: '14px', paddingLeft: '20px' }}>Please fill in all the fields.
                                                        </p>
                                                    </div> : ''
                                                    }
                                                </>
                                                <div className="col-sm-12">
                                                    <Button className="float-right" onClick={submitTask}>Submit</Button>
                                                </div>
                                            </Form>
                                        </CardBody>
                                    </Card>
                                </ModalBody>
                            </Modal>
                        </div>
                        <div>
                            <Modal isOpen={editModal} toggle={editToggle} className={className}>
                                <ModalHeader toggle={editToggle}>Update Task</ModalHeader>
                                <ModalBody>
                                    <Card className="border-0">
                                        <CardBody className="w-100">
                                            <Form className="row">
                                                <FormGroup className="col-sm-12">
                                                    <Label for="taskName">Task Name</Label>
                                                    <Input type="text" name="task_name" id="taskName" onChange={handleFormInput} placeholder="Task Name" value={ editTask.task_name }/>
                                                </FormGroup>
                                                <FormGroup className="col-sm-12">
                                                    <Label for="taskDate">Task Deadline</Label>
                                                    <Input type="date" name="task_deadline" id="taskDate" onChange={handleFormInput} placeholder="Task Deadline" value={ formatDate(editTask.task_deadline) }/>
                                                </FormGroup>
                                                <FormGroup className="col-sm-12">
                                                    <Label for="taskPriority">Task Priority</Label>
                                                    <Input type="select" name="task_priority" id="taskPriority" onChange={handleFormInput} value={ editTask.task_priority || 'N/A' }>
                                                        <option value="N/A">N/A</option>
                                                        <option value="1">High</option>
                                                        <option value="2">Medium</option>
                                                        <option value="3">Low</option>
                                                    </Input>
                                                </FormGroup>
                                                
                                                <>
                                                    { displayInfo ?
                                                    <div style={{ width: '100%', textAlign: 'left', color: '#f00', paddingTop: '10px' }}>
                                                        <p style={{ fontSize: '14px', paddingLeft: '20px' }}>Please fill in all the fields.
                                                        </p>
                                                    </div> : ''
                                                    }
                                                </>
                                                <div className="col-sm-12">
                                                    <Button className="float-right" onClick={updateTask}>Update</Button>
                                                </div>
                                            </Form>
                                        </CardBody>
                                    </Card>
                                </ModalBody>
                            </Modal>
                        </div>
                    </Col>
                </Row>
            </Container>  
        </div>
    )
}

export default UserDashboard;