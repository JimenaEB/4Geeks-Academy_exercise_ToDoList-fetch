import React, { useEffect, useState } from "react";

import Task from "./task.jsx";

const URL = "https://assets.breatheco.de/apis/fake/todos/user/jimena";

const Home = () => {
	const [tasks, setTasks] = useState([]);
	const [tasksComponents, setTasksComponents] = useState([]);
	const [failOnUpdating, setFailOnUpdating] = useState("");
	const [update, setUpdate] = useState(false);

	useEffect(() => {
		fetch(URL)
			.then(response => {
				if (response.ok) {
					return response.json();
				}

				throw new Error("Fail on load");
			})
			.then(responseAsJson => {
				setUpdate(false);
				setTasks(responseAsJson);
			})
			.catch(error => {
				setFailOnUpdating(error.message);
			});
	}, []);

	useEffect(() => {
		if (update) {
			fetch(URL, {
				method: "PUT",
				body: JSON.stringify(tasks),
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(response => {
					if (!response.ok) {
						throw new Error("Failed updating tasks");
					}
					setUpdate(false);
				})
				.catch(error => {
					setFailOnUpdating(error.message);
				});
		}
	}, [update]);

	useEffect(() => {
		if (tasks.length != 0) {
			setTasksComponents(
				tasks.map((task, index) => {
					return (
						<Task
							key={index.toString()}
							task={task}
							delete={updateDone}
						/>
					);
				})
			);
		}
	}, [tasks]);

	const updateDone = taskLabel => {
		let updatedTasks = tasks.map(task => {
			if (task.label == taskLabel) {
				return { label: task.label, done: !task.done };
			}
			return task;
		});
		setTasks(updatedTasks);
		setUpdate(true);
	};

	return (
		<div className="text-center mt-5">
			{failOnUpdating && <h1>{failOnUpdating}</h1>}
			<form
				onSubmit={event => {
					event.preventDefault();
					setUpdate(true);
					setTasks([
						...tasks,
						{
							label: document.querySelector("input").value,
							done: false
						}
					]);
				}}>
				<input type="text" placeholder="task" />
			</form>
			<ul>{tasksComponents}</ul>
		</div>
	);
};

export default Home;
