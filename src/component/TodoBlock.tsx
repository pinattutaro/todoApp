import React  from "react";
import "./TodoBlock.css";
import type { Todo, Project } from "./types";

type Prop = {
    todo: Todo;
    setTodo: React.Dispatch<React.SetStateAction<Todo>>;
    projects?: Project[];
    deleteTodo: () => void;
}

function getDateString(date: Date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function TodoBlock({todo, setTodo, projects, deleteTodo}: Prop) {
    const [isEditing, setIsEditing] = React.useState(false);

    return (
        <div className="TodoBlock">
            <div className={`main ${todo.completed ? "completed" : ""}`} onClick={() => {
                if (!todo.completed) return;
                deleteTodo();
            }}>
                {todo.text}
            </div>
            {!todo.completed && 
                <div className={`menus ${isEditing ? "editing" : ""}`}>
                    <div className="completed material-symbols-outlined complete" onClick={() => {
                        setTodo(prev => ({...prev, completed: true}))
                    }}>check_circle</div> 
                    <div className="set material-symbols-outlined" onClick={() => setIsEditing(prev => !prev)}>edit</div>
                    <div className="delete material-symbols-outlined" onClick={() => {
                        deleteTodo();
                    }}>delete</div>
                </div>            
            }
            {isEditing && !todo.completed &&
                <div className="editor">
                    {/* <div className="text" contentEditable={true} onChange={(e) => {
                        const value = (e.target as HTMLDivElement).innerHTML;
                        setTodo(prev => ({...prev, text: value}))
                    }}>{todo.text}</div> */}
                    <textarea className="text" value={todo.text} onChange={(e) => {
                        const value = (e.target as HTMLTextAreaElement).value;
                        setTodo(prev => ({...prev, text: value}));
                    }}></textarea><br />
                    <select value={todo.project} onChange={(e) => {
                        const value = Number((e.target as HTMLSelectElement).value);
                        setTodo((prev: Todo) => ({ ...prev, project: value }));
                    }}>
                        {projects?.map(prj => (
                            <option key={prj.id} value={prj.id} style={{backgroundColor: `hsl(${prj.color}, 90%, 90%)`}}>{prj.name}</option>
                        ))}
                    </select><br />
                    <input type="date" value={getDateString(todo.deadline)} onChange={(e) => {
                        const value = new Date((e.target as HTMLInputElement).value);
                        setTodo((prev: Todo) => ({ ...prev, deadline: value }));
                    }}/>
                </div>
            }
            
            {/* <div className="set material-symbols-outlined">edit</div>
            <div className="delte material-symbols-outlined">delete</div> */}
        </div>
    );
}

export default TodoBlock;