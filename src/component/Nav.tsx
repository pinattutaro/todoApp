import React from "react";
import './nav.css';
import reactlogo from '../assets/react.svg';
import type { Project } from "./types";
import { Reorder } from "framer-motion";

type Props = {
    projects: Project[];
    setProjetcs: React.Dispatch<React.SetStateAction<Project[]>>;
    mode: string;
    setMode: React.Dispatch<React.SetStateAction<string>>;
};

const modeImage = {
    schedule: "calendar_month",
    list: "list_alt",
    expired: "alarm"
}

function Nav({projects, setProjetcs, mode, setMode}: Props) {
    const modes = ["list", "schedule", "expired"];

    return (
        <div className="Nav">
            <div className="empty"></div>

            <div className="reactlogo">
                <span className="text">Todo</span><img src={reactlogo} alt="React Logo" /><span className="text">App</span>
            </div>

            <div className="group">
                {modes.map(value => {
                    return (
                        <div className={`mode ${mode === value ? "selected": ""}`} onClick={() => {
                            setMode(value);
                        }}>
                            <span className="icon material-symbols-outlined">
                                {modeImage[value as 'schedule' | 'list' | 'expired']}
                            </span>
                            <span className="text">{value}</span>
                        </div>
                    );
                })}                
            </div>

            {/* <div className="group">
                {projects.map(({id, name, color, icon, state}: Project) => {
                    return (
                        <div id={`prj${id}`} className={`project ${state ? "" : "filter"}`}
                            style={{"--color-angle": color} as React.CSSProperties}
                            onClick={
                                setProjetcs.bind(null, projects.map(proj => proj.id === id ? {...proj, state: !proj.state} : proj))
                            }
                        >
                            <span className="icon material-symbols-outlined">{icon}</span>
                            <span className="text">{name}</span>
                        </div>
                    )
                })}
            </div> */}
            <Reorder.Group as="div" axis="y" className="group" values={projects} onReorder={setProjetcs}>
                {projects.map((prj: Project) => {
                    const {id, name, color, icon, state} = prj;
                    return (
                        <Reorder.Item as="div" className={`project ${state ? "" : "filter"}`} key={id} value={prj}
                            style={{"--color-angle": color} as React.CSSProperties}
                            onClick={
                                setProjetcs.bind(null, projects.map(proj => proj.id === id ? {...proj, state: !proj.state} : proj))
                            }
                        >
                            <span className="icon material-symbols-outlined">{icon}</span>
                            <span className="text">{name}</span>
                        </Reorder.Item>
                    );
                })}
            </Reorder.Group>
        </div>
    );
}

export default Nav;