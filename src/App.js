import React, {Component} from 'react';
import './App.css';
import Header from "./components/Header";
import Form from "./components/Form";
import ToDo from "./components/ToDo";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            tasksLength: 0,
            defaultRowNr: 5

        };
        this.getData();

    }

    componentDidMount() {
        this.getData();
    }

    saveData() {
        const tasks = this.state.tasks;
        localStorage.setItem("taskData13", JSON.stringify(tasks));
    };

    getData() {
        const cachedData = localStorage.getItem("taskData13");
        if (cachedData) {
            const parsedData = JSON.parse(cachedData);
            this.state = {
                tasks: parsedData,
                tasksLength: parsedData.length,
                defaultRowNr: 5
            };
        }
    };

    deleteTask = (id) => {
        let data = this.state.tasks;
        data = data.filter(i => i.id !== id);

        const dataLength = data.length;
        this.setState({
            tasks: data,
            tasksLength: dataLength
        });

        this.saveData();
    };
    addTask = (e) => {
        e.preventDefault();
        const task = e.target.elements.name.value;
        const priority = e.target.elements.priority.value;
        if (task && priority) {
            const data = this.state.tasks;
            data.unshift({
                "id": data.length + 1, "name": task, "priority": priority, "done": false
            });
            const dataLength = data.length;
            this.setState({
                tasks: data,
                tasksLength: dataLength
            });
            this.saveData();

        } else {
            console.log("Nie uzupełniono wszystkich pól");
        }
    };

    markDone = (id) => {
        let data = this.state.tasks;
        data = data.map(i => {
            if (i.id === id) i.done = !i.done;
            return i;
        });
        const dataLength = data.length;
        this.setState({
            tasks: data,
            tasksLength: dataLength
        });
        this.saveData();
    };

    rowsPerPage = (rows) => {
        console.log(rows.target.value);
        this.setState({
            defaultRowNr: rows.target.value
        });
    };

    sort = (col, type) => {
        console.log(col);
        console.log(type);
        switch (col) {
            case "name":

                break;
            case "priority":
                const priorities = {
                    low: 0,
                    medium: 1,
                    high: 2
                };
                if (type === "asc") {
                    const data = this.state.tasks;
                    data.sort((a, b) => priorities[a.priority] - priorities[b.priority]);
                    console.log(data);
                    this.setState({
                        tasks: data
                    });
                } else if (type === "desc") {
                    const data = this.state.tasks;
                    data.sort((a, b) => a.done - b.done).reverse();
                    console.log(data);
                    this.setState({
                        tasks: data
                    });
                }
                break;
            case "done":
                if (type === "asc") {
                    const data = this.state.tasks;
                    data.sort((a, b) => a.done - b.done);
                    console.log(data);
                    this.setState({
                        tasks: data
                    });
                } else if (type === "desc") {
                    const data = this.state.tasks;
                    data.sort((a, b) => a.done - b.done).reverse();
                    console.log(data);
                    this.setState({
                        tasks: data
                    });
                }
                break;
            default:
                console.log("Nieprawidlowe parametry");

        }
    };

    render() {
        return (
            <div className="ToDoListApp">
                <Header/>
                <Form addTask={this.addTask}/>
                <ToDo
                    tasks={this.state.tasks}
                    tasksLength={this.state.tasksLength}
                    rows={this.state.defaultRowNr}
                    rowsPerPage={this.rowsPerPage}
                    markDone={this.markDone}
                    deleteTask={this.deleteTask}
                    sort={this.sort}
                />
            </div>
        );
    }
}

export default App;
