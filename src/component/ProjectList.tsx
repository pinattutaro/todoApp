import React from "react";
import './ProjectList.css';
import type { Project, Todo } from "./types";
import { Reorder } from "framer-motion";
import TodoBlock from "./TodoBlock";

type Prop = {
    project: Project; 
    todoes: Todo[];
    setTodoes: React.Dispatch<React.SetStateAction<Todo[]>>;
    projects?: Project[];
}

function ProjectList({project, todoes, setTodoes, projects}: Prop) {
    const {name, color, icon} = project;
    console.log(todoes);

    // const handleDragStart = (e: React.DragEvent<HTMLDivElement>, tdid: number) => {
    //     e.dataTransfer.setData("text/plain", tdid.toString());
    //     e.dataTransfer.effectAllowed = "move";
    // };

    // const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    //     // drop を許可
    //     e.preventDefault();
    // };

    // const handleDrop = (e: React.DragEvent<HTMLDivElement>, tar: number) => {
    //     e.preventDefault();
    //     const tdid = Number(e.dataTransfer.getData("text/plain"));
    //     if (Number.isNaN(tdid)) return;

    //     setTodoes(prev => {
    //         const draggedIndex = prev.findIndex(td => td.id === tdid);
    //         if (draggedIndex === -1) return prev;

    //         const draggedTodo = prev[draggedIndex];
    //         const filteredTodos = prev.filter(td => td.id !== tdid);

    //         const targetIndex = filteredTodos.findIndex(td => td.id === tar);
    //         const insertIndex = targetIndex === -1 ? filteredTodos.length : targetIndex;

    //         filteredTodos.splice(insertIndex, 0, draggedTodo);
    //         return filteredTodos;
    //     });
    // }

    return (
        <div className="ProjectList" style={{"--color-angle": color} as React.CSSProperties}>
            <div className="title">
                <span className="icon material-symbols-outlined">{icon}</span>
                {name}     
                <div className="add" onClick={() => {
                    const newTodo: Todo = {
                        id: Date.now(),
                        text: "new todo",
                        completed: false,
                        project: project.id,
                        deadline: new Date(),
                        startdate: null,
                    };
                    setTodoes(prev => [newTodo, ...prev]);
                }}>+</div>           
            </div>
            {/* <div className="todoes">
                {todoes.map(td => (
                    <div key={td.id} className="todo" 
                        draggable
                        onDragStart={(e) => handleDragStart(e, td.id)}
                        onDragOver={(e) => handleDragOver(e)}
                        onDrop={(e) => handleDrop(e, td.id)}
                    >
                        {td.text}
                    </div>
                ))}
            </div> */}
            <Reorder.Group as="div" axis="y" values={todoes} onReorder={setTodoes} className="todoes">
                {todoes.map(td => (
                    <Reorder.Item as="div" key={td.id} value={td} className="todo">
                        {/* td に対応する単体更新関数を渡す */}
                        <TodoBlock
                            todo={td}
                            setTodo={(updater: React.SetStateAction<Todo>) =>
                                setTodoes(prev =>
                                    prev.map(item =>
                                        item.id === td.id
                                            ? (typeof updater === "function" ? (updater as (t: Todo) => Todo)(item) : updater)
                                            : item
                                    )
                                )
                            }
                            deleteTodo={() => {
                                setTodoes(prev => prev.filter(item => item.id !== td.id));
                            }}
                            projects={projects}
                        />
                    </Reorder.Item>
                ))}
            </Reorder.Group>
        </div>
    );
}

export default ProjectList;