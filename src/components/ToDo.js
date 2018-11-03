import React, {Component} from 'react';
import '../App.css';
import Task from "./Task";

class ToDo extends Component {
    state = {
        currentPage: 1,
        rows: this.props.rows,
        pagesNr: Math.ceil(this.props.tasksLength / this.props.rows)
    };

    previousSite() {
        const pagesNr = Math.ceil(this.props.tasksLength / this.props.rows);

        this.setState({
            pagesNr: pagesNr
        });
        let currentPage = this.state.currentPage;
        currentPage = currentPage - 1;
        if (currentPage < 1) {
            currentPage = 1;
        }
        this.setState({
            currentPage: currentPage
        });
    }

    nextSite() {
        const pagesNr = Math.ceil(this.props.tasksLength / this.props.rows);
        this.setState({
            pagesNr: pagesNr
        });
        let currentPage = this.state.currentPage;
        currentPage = currentPage + 1;
        if (currentPage > this.state.pagesNr) {
            currentPage = this.state.pagesNr;
        }
        this.setState({
            currentPage: currentPage
        });
    }

    rowsPerPage(e) {
        this.setState({
            currentPage: 1,
            rows: e.value
        });
        this.props.rowsPerPage(e);
    }

    sort(e) {
        let sortArrowsUp = document.getElementsByClassName("fa-sort-up");
        [].forEach.call(sortArrowsUp, (e) => {
            e.style.opacity = "0"
        });
        if (e.target.dataset.order === "") {
            e.target.dataset.order = "asc";
        }
        this.props.sort(e.target.dataset.col, e.target.dataset.order);
        e.target.getElementsByClassName("fa-sort-up")[0].style.opacity = "1";
        if (e.target.dataset.order === "asc") {
            e.target.dataset.order = "desc";
            e.target.getElementsByClassName("fa-sort-up")[0].style.transform = "rotate(0deg)";

        } else {
            e.target.dataset.order = "asc";
            e.target.getElementsByClassName("fa-sort-up")[0].style.transform = "rotate(180deg)";

        }

    }

    render() {
        return (
            <div className="ToDoListApp__to-do to-do">
                <div className="to-do__row to-do__row--header">
                    <div className="to-do__col to-do__col--name" data-col="name" data-order=""
                         onClick={this.sort.bind(this)}>
                        Task name <i className="fas fa-sort-up"></i>
                    </div>
                    <div className="to-do__col to-do__col--priority" data-col="priority" data-order=""
                         onClick={this.sort.bind(this)}>
                        Priority <i className="fas fa-sort-up"></i>
                    </div>
                    <div className="to-do__col to-do__col--done" data-col="done" data-order=""
                         onClick={this.sort.bind(this)}>
                        Done <i className="fas fa-sort-up"></i>
                    </div>
                    <div className="to-do__col to-do__col--remove">

                    </div>
                </div>
                <div className="to-do__row to-do__row--list">
                    {
                        this.props.tasks.map((e, i) => {
                                if (i >= (this.state.currentPage - 1) * this.props.rows
                                    && (i <= this.state.currentPage * this.props.rows))
                                    return <Task
                                        key={i}
                                        id={e.id}
                                        name={e.name}
                                        priority={e.priority}
                                        done={e.done}
                                        removeItem={this.props.deleteTask}
                                        markDone={this.props.markDone}
                                    />;
                                return "";
                            }
                        )
                    }
                </div>
                <div className="to-do__row to-do__row--footer">
                    <div className="to-do__col">
                    <span className="to-do-footer__choose-rows">
                        <label>Rows per page:</label>
                        <select defaultValue={this.props.rows} onChange={this.rowsPerPage.bind(this)}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </span>
                    </div>
                    <div className="to-do__col">
                        <div className="to-do-footer__pagination">
                            <div className="pages">
                                {((this.state.currentPage - 1) * this.props.rows + 1 > this.props.tasksLength)
                                    ? 0 : (this.state.currentPage - 1) * this.props.rows + 1 }
                                &nbsp;
                                -
                                &nbsp;
                                {
                                    ((this.state.currentPage * this.props.rows) > this.props.tasksLength)
                                        ? this.props.tasksLength : (this.state.currentPage * this.props.rows)
                                } of {this.props.tasksLength}</div>
                        </div>
                    </div>
                    <div className="to-do__col controls">
                            <span className="controls__arrow controls__arrow--left"
                                  onClick={this.previousSite.bind(this)}>
                                <i className="fas fa-angle-left"></i>
                            </span>
                        <span className="controls__arrow controls__arrow--right" onClick={this.nextSite.bind(this)}>
                                <i className="fas fa-angle-right"></i>
                            </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default ToDo;