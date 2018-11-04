import React, {Component} from 'react';
import '../App.css';

class Task extends Component {
    markDone(){
        this.props.markDone(parseInt(this.props.id));
    }
    removeItem(){
        this.props.removeItem(this.props.id);
    }
    render() {
        return (
            <div className="task">
                <div className="to-do__col to-do__col--name">
                    {this.props.name}
                </div>
                <div className="to-do__col to-do__col--priority">
                    {this.props.priority}
                </div>
                <div className="to-do__col to-do__col--done">
                    <label className="custom-checkbox">
                    <input type="checkbox" checked={this.props.done} onChange={this.markDone.bind(this)}/>
                    <span className="custom-checkbox__checkmark"> </span>
                    </label>
                </div>
                <div className="to-do__col to-do__col--remove">
                    <i className="far fa-trash-alt" onClick={this.removeItem.bind(this)}> </i>
                </div>
            </div>
        );
    }
}

export default Task;