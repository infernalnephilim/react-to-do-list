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
        localStorage.setItem("taskData14", JSON.stringify(tasks));
    };

    getData() {
        const cachedData = localStorage.getItem("taskData14");
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
        if (task && priority !== "None") {
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
            document.getElementsByClassName("form__info--name")[0].style.display = "none";
            document.getElementsByClassName("form__info--priority")[0].style.display = "none";
            e.target.reset();

        } else {
            if(task === ""){
                document.getElementsByClassName("form__info--name")[0].style.display = "block";
            } else{
                document.getElementsByClassName("form__info--name")[0].style.display = "none";
            }
            if(priority === "None"){
                document.getElementsByClassName("form__info--priority")[0].style.display = "block";
            } else{
                document.getElementsByClassName("form__info--priority")[0].style.display = "none";
            }
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
        this.setState({
            defaultRowNr: rows.target.value
        });
    };

    sort = (col, type) => {
        console.log(col);
        console.log(type);
        switch (col) {
            case "name":
                if (type === "asc") {
                    const data = this.state.tasks;
                    data.sort((a, b) => {
                        return a.name.localeCompare(b.name)
                    });
                    this.setState({
                        tasks: data
                    });
                } else if (type === "desc") {
                    const data = this.state.tasks;
                    data.sort((a, b) => {
                        return a.name.localeCompare(b.name)
                    }).reverse();
                    this.setState({
                        tasks: data
                    });
                }
                break;
            case "priority":
                const priorities = ["Low", "Medium", "High"];
                if (type === "asc") {
                    const data = this.state.tasks;
                    data.sort((a, b) => priorities.indexOf(a.priority) - priorities.indexOf(b.priority));
                    this.setState({
                        tasks: data
                    });
                } else if (type === "desc") {
                    const data = this.state.tasks;
                    data.sort((a, b) => priorities.indexOf(a.priority) - priorities.indexOf(b.priority)).reverse();
                    this.setState({
                        tasks: data
                    });
                }
                break;
            case "done":
                if (type === "asc") {
                    const data = this.state.tasks;
                    data.sort((a, b) => a.done - b.done);
                    this.setState({
                        tasks: data
                    });
                } else if (type === "desc") {
                    const data = this.state.tasks;
                    data.sort((a, b) => a.done - b.done).reverse();
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
