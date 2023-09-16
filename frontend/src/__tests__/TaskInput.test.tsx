import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TaskInput from "../components/TaskInput";

test("Adding a task ", () => {
  const mockAddTask = jest.fn();
  
  const { getByPlaceholderText, getByText } = render(
    <TaskInput addTask={mockAddTask} />
  );

  const input = getByPlaceholderText("Enter a task");
  const addButton = getByText("add");

  fireEvent.change(input, { target: { value: "Feed the dog" } });
  fireEvent.click(addButton);

  expect(mockAddTask).toHaveBeenCalledWith({
    id: expect.any(Number),
    content: "Feed the dog",
    done: false,
  });
});
