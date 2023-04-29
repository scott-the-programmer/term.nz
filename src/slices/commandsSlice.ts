import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Command } from '../App';

const initialState: Command[] = [
];

const commandsSlice = createSlice({
  name: 'commands',
  initialState,
  reducers: {
    addCommand: (state, action: PayloadAction<Command>) => {
      state.push(action.payload);
    },
    clearCommands: (state) => {
      return initialState;
    },
  },
});

export const { addCommand, clearCommands } = commandsSlice.actions;
export default commandsSlice.reducer;
