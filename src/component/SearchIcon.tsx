import {useState} from "react";
import "./SearchIcon.css";
import iconsJson from "./icons.json"

type Props = {
    setter: (value: string) => void;
}

type Icon = {
    name: string;
    version: number;
    popularity: number;
    codepoint: number;
    unsupported_families: string[];
    categories: string[];
    tags: string[];
    sizes_px: number[];
}

type Json = {
    host: string;
    icons: Icon[];
}

export function SearchIcon({setter}: Props) {
    const [search, setSearch] = useState("");

    const icons = (iconsJson as Json).icons as Icon[];
    const filteredIcons = icons.filter(icon => {
        return icon.name.includes(search) || icon.tags.some(tag => tag.includes(search));
    });

    return (
        <div className="SearchIcon">
            <input type="text" onChange={(e) => {
                const value = (e.target as HTMLInputElement).value;
                setSearch(value);
            }} />

            <div className="icons">
                {filteredIcons.map((icon) => {
                    return (
                        <div className="material-symbols-outlined" onClick={() => {
                            setter(icon.name);
                        }}>
                            {icon.name}
                        </div>
                    );
                })}                
            </div>
        </div>
    )
}

export default SearchIcon;