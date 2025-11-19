import React, {useState} from 'react'
import './App.css'
import Header from './component/Header.tsx'
import Nav from './component/Nav.tsx'
import ProjectList from './component/ProjectList.tsx'
import type { Project, Todo } from './component/types.tsx';

const ptemp = [
    {id: 1, name: 'work', color: 162, icon: 'work', state: true},
    {id: 2, name: 'home', color: 42, icon: 'home', state: true},
	{id: 3, name: 'study', color: 222, icon: 'dictionary', state: true},
	{id: 4, name: 'hobby', color: 312, icon: 'sports_esports', state: true},
	{id: 5, name: 'health', color: 12, icon: 'fitness_center', state: true},
	{id: 6, name: 'shopping', color: 72, icon: 'shopping_cart', state: true},
	{id: 7, name: 'finance', color: 282, icon: 'account_balance_wallet', state: true},
    {id: 10e9, name: 'other', color: 342, icon: 'category', state: true}
] as Project[];

const tdtemp = [
	{id: 1, text: "go to gym", completed: false, startdate: null, deadline: new Date(2025, 11, 30), project: 5},
	{id: 2, text: "finish this work", completed: false, startdate: null, deadline: new Date(2025, 11, 30), project: 1},
	{id: 3, text: "misc task", completed: false, startdate: null, deadline: new Date(2025, 11, 30), project: 10e9},
	{id: 4, text: "clean the house", completed: false, startdate: null, deadline: new Date(2025, 11, 30), project: 2},
	{id: 5, text: "buy groceries", completed: false, startdate: null, deadline: new Date(2025, 11, 30), project: 6},
	{id: 6, text: "read a book", completed: false, startdate: null, deadline: new Date(2025, 11, 29), project: 3},
	{id: 7, text: "see a doctor", completed: false, startdate: null, deadline: new Date(2025, 11, 29), project: 5},
	{id: 8, text: "play game", completed: false, startdate: null, deadline: new Date(2025, 11, 29), project: 4},
	{id: 9, text: "check bank account", completed: false, startdate: null, deadline: new Date(2025, 11, 30), project: 7},
	{id: 10, text: "call my clients", completed: false, startdate: null, deadline: new Date(2025, 11, 29), project: 1},
	{id: 11, text: "prepare presentation", completed: false, startdate: null, deadline: new Date(2025, 11, 5), project: 1},
	{id: 12, text: "appointment with my bosses", completed: false, startdate: null, deadline: new Date(2025, 11, 30), project: 1},
	{id: 13, text: "apply for a job", completed: false, startdate: null, deadline: new Date(2025, 11, 29), project: 1},
	{id: 14, text: "tea with co-workers", completed: false, startdate: null, deadline: new Date(2025, 11, 30), project: 1},
].sort((a,b) => a.deadline.getTime() - b.deadline.getTime()) as Todo[];

const getDay = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return (new Date(`${year}-${month}-${day}`)).getTime();
}

function App() {
	// const [mode, setMode] = useState<Mode>({base: 'calender', projects: []});
	const [date, setDate] = useState<Date>(new Date());
	const [mode,  setMode] = useState<string>('list');
	const [projects, setProjects] = useState<Project[]>(ptemp);
	// const [todos, setTodos] = useState<Todo[]>(tdtemp);
	const [todos, setTodos] = useState<Todo[]>(() => {
		const stored = localStorage.getItem('todoes');
		// return (stored ? JSON.parse(stored) : tdtemp) as Todo[];
		if (!stored) return tdtemp;
		const parsed: Todo[] = JSON.parse(stored);
		return parsed.map(td => ({...td, deadline: new Date(td.deadline)}));
		
	});
	
	localStorage.setItem('projects', JSON.stringify(projects));
	localStorage.setItem('todoes', JSON.stringify(todos));
	// const todos = tdtemp;

	return (
		<div className="App">
			<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
			{/* <div className="img" style={{"background-image": `url(${reactlogo})`} as React.CSSProperties}></div> */}
			<Nav projects={projects} setProjetcs={setProjects} mode={mode} setMode={setMode} />
			<Header date={date} setDate={setDate} todos={todos} />
			<div className="main">
				<div className="page">
					{(() => {
						switch (mode) {
							case "list":
								return (
									<>
										{projects.filter(e => e.state).map(prj => {
											const thisTodoes = todos.filter(td => td.project === prj.id).filter(td => getDay(td.deadline) === getDay(date));
											if (thisTodoes.length === 0) return null;
											const setThisTodoes = (value: React.SetStateAction<Todo[]>) => {
												setTodos(prev => {
													const currentProjectTodos = prev.filter(t => t.project === prj.id);
													const others = prev.filter(t => t.project !== prj.id).filter(td => getDay(td.deadline) === getDay(date));
													const newProjectTodos = typeof value === 'function' ? (value as (pt: Todo[]) => Todo[])(currentProjectTodos) : value;
													return [...others, ...newProjectTodos];
												});
											};
											return <ProjectList key={prj.id} project={prj} todoes={thisTodoes} setTodoes={setThisTodoes} projects={projects} setDate={setDate} />;
										})}
									</>
								);
							case "schedule": return <h2>Calender View (Coming Soon)</h2>;
							case "expired": return <h2>Expired Tasks (Coming Soon)</h2>;
						}
					})()}
				</div>
				<div className="new" onClick={() => {
					setTodos(prev => {
						const newTodo: Todo = {
							id: Date.now(),
							text: "new todo",
							completed: false,
							project: 10e9,
							deadline: new Date(),
							startdate: null,
						};
						// console.log(newTodo);
						return [newTodo, ...prev];
					});
					setDate(new Date());
				}}>+</div>	
			</div>
			{/* <SearchIcon setter={(value: any) => {
				console.log(value);
			}} /> */}
		</div>
	)
}

export default App;