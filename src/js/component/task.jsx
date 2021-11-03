import React from "react";
import PropTypes from "prop-types";

const Task = props => {
	const done = props.task.done ? "text-decoration-line-through" : "";

	return (
		<li className={done}>
			{props.task.label}
			<button onClick={() => props.delete(props.task.label)}> X </button>
		</li>
	);
};

Task.propTypes = {
	task: PropTypes.object,
	delete: PropTypes.func
};

export default Task;
