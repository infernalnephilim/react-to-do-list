import React, {Component} from 'react';
import '../App.css';

class Form extends Component {
    render() {
        return (
            <div className="ToDoListApp__form">
                <form className="form" onSubmit={this.props.addTask}>
                    <input type="text" name="name"/>
                    <select defaultValue="none" name="priority">
                        <option value="None" disabled="disabled">Priority</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                    <button>Add</button>
                </form>
            </div>
        );
    }
}

export default Form;