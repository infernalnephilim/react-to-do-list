import React, {Component} from 'react';
import '../App.css';

class Form extends Component {
    render() {
        return (
            <div className="ToDoListApp__form">
                <form className="form" onSubmit={this.props.addTask}>
                    <div className="form__input form__input--name">
                        <input type="text" name="name"/>
                        <span className="form__info form__info--name">
                            <i className="fas fa-exclamation-circle"></i> This field cannot be empty
                        </span>
                    </div>
                    <div className="form__input">
                        <select defaultValue="None" name="priority">
                            <option value="None" disabled="disabled">Priority</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                        <span className="form__info form__info--priority">
                            <i className="fas fa-exclamation-circle"></i> Choose one of the priorities: Low, Medium or High
                        </span>
                    </div>
                    <button>Add</button>
                </form>
            </div>
        );
    }
}

export default Form;