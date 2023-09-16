import React from "react";
import { fireEvent, render} from "@testing-library/react";
import TaskList from "../components/TaskList";



test('Deleting a task removes it from the list', () => {
    const tasks = [{id: 1, content: 'Buy the new Macbook Air with M2 chip', done: false}]
    const deleteTask = jest.fn();
    const {getByPlaceholderText, getByText} = render(<TaskList list={tasks} deleteTask={deleteTask} markAsDone={() => {}}/>)
    const deleteButton = getByText('❌');
    fireEvent.click(deleteButton);
    expect(deleteTask).toHaveBeenCalledWith(1);
})

test('Marking a task as done toggles its state', () => {
    const tasks = [{id: 4, content: 'Go hiking', done: false}]
    const mockMarkAsDone = jest.fn();
    const {getByText, unmount} = render(<TaskList list={tasks} deleteTask={() => {}} markAsDone={mockMarkAsDone}/>)
    const doneButton = getByText('✅');
    fireEvent.click(doneButton);
    expect(mockMarkAsDone).toHaveBeenCalledWith(4);
    unmount();

    tasks[0].done = true;
    const {getByText: getByTextNew} = render(<TaskList list={tasks} deleteTask={() => {}} markAsDone={mockMarkAsDone}/>)
    const taskDiv = getByTextNew(tasks[0].content).closest('div');
    expect(taskDiv).toHaveStyle('background-color: green');
})