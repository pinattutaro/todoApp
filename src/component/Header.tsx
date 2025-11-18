import React from "react";
import './Header.css';
// import DatePicker from 'react-datepicker';
import type { Todo } from './types.tsx';
import 'react-datepicker/dist/react-datepicker.css';

type Props = {
    date: Date;
    setDate: React.Dispatch<React.SetStateAction<Date>>;
    todos: Todo[];
}

const isSameDay = (date1: Date, date2: Date): boolean => {
    return date1.getFullYear() === date2.getFullYear()
              && date1.getMonth() === date2.getMonth()
                && date1.getDate() === date2.getDate();
}

const addDays = (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(date.getDate() + days);
    return result;
}

const d2s = (date: Date): string => {
    const m = date.getMonth() + 1;
    const d = date.getDate();
    return `${m}/${d}`;
}

function Header({date, setDate, todos}: Props) {
    const kernelRadius = 2;
    const kernel = Array.from({length: kernelRadius * 2 + 1}, (_, i) => i - kernelRadius);
    // const [otherDateState, setOtherDateState] = React.useState<boolean>(false);
    const [isOpenDatePicker, setIsOpenDatePicker] = React.useState<boolean>(false);

    return (
        <div className="Header">
            <div></div>
            <div className="days">
                {kernel.map((offset: number) => {
                    const d = addDays(date, offset);
                    const thisTodosNum = todos.filter(td => isSameDay(td.deadline, d)).length;

                    return (
                        <div className={`date ${offset === 0 ? "selected": ""}`} onClick={() => {
                            setDate(d);
                        }}>
                            {isSameDay(new Date(), d) ? "Today" : d2s(d)}
                            {thisTodosNum > 0 && 
                                <div className="todoNum">{thisTodosNum}</div>
                            }
                        </div>
                    );
                })}
                <div className="date">
                    <input type="date" id="otherDate" onBlur={() => {setIsOpenDatePicker(false)}} onInput={() => {
                        // setDate(new Date((document.getElementById("otherDate") as HTMLInputElement).value));
                        const input = document.getElementById("otherDate") as HTMLInputElement;
                        const selectedDate = new Date(input.value);
                        if (!isNaN(selectedDate.getTime())) {
                            setDate(selectedDate);
                        }
                        setIsOpenDatePicker(false);
                    }}/>
                    <span className="material-symbols-outlined" onClick={() => {
                        const input = document.getElementById("otherDate") as HTMLInputElement;
                        input.showPicker?.();
                        input.focus();
                        setIsOpenDatePicker(true);
                    }}>{`more_${isOpenDatePicker ? "vert" : "horiz"}`}</span>
                </div>
            </div>
        </div>
    );
}

export default Header;