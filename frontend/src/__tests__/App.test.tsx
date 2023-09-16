import React from "react";
import { fireEvent, queryByText, render, waitFor } from "@testing-library/react";
import App from "../App";
import axios from "axios";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

test('Adding a new task', async () => {
    
    //mock axios.post response
    mockedAxios.post.mockResolvedValueOnce({data: { id: 1, content: 'Go to the gym', done: false}});
    const { getByPlaceholderText, getByText } = render(<App />);

    const input = getByPlaceholderText('Enter a task');
    const addButton = getByText('add');

    fireEvent.change(input, {target: {value: 'Go to the gym'}});
    fireEvent.click(addButton);

    expect(mockedAxios.post).toHaveBeenCalledWith('/tasks', {id: expect.any(Number), content: 'Go to the gym', done: false})
});

test('Displays new tasks on screen when added', async() => {
    const { getByPlaceholderText, getByText, queryByText } = render(<App />);

    const input = getByPlaceholderText('Enter a task');
    const addButton = getByText('add');

    fireEvent.change(input, {target: {value: 'Go to the gym'}})
    fireEvent.click(addButton);

    await waitFor(() => expect(queryByText('Go to the gym')).toBeInTheDocument())
})