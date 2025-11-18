type Todo = {
	id: number;
	text: string;
	completed: boolean;
	startdate: Date | null;
	deadline: Date;
	project: number;
}

type setTodo = React.Dispatch<React.SetStateAction<Todo[]>>;

type Project = {
    id: number;
    name: string;
    color: number; // hue degree,
	icon: string;
	state: boolean;
}

export type {Todo, setTodo, Project};