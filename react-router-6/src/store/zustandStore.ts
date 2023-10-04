import { create } from "zustand";

export interface UserStoreType {
  userCount: number;
}

export const userStore = create<UserStoreType>()((set) => ({
  userCount: 0,
  increaseUserCount: () => set((state) => ({ userCount: state.userCount + 1 })),
  removeUserCount: () => set({ userCount: 0 }),
}));

type State = {
  firstName: string;
  lastName: string;
};

type Action = {
  updateFirstName: (firstName: State["firstName"]) => void;
  updateLastName: (lastName: State["lastName"]) => void;
};

export const usePersonState = create<State & Action>()((set) => ({
  firstName: "",
  lastName: "",
  updateFirstName: (firstName) => set({ firstName }),
  updateLastName: (lastName) => set({ lastName }),
}));

export const updateFirstName = (firstName: State["firstName"]) =>
  usePersonState.setState({ firstName });

export const useBoundStore = create(() => ({
  count: 0,
  text: "hello",
}));

export const inc = () =>
  useBoundStore.setState((state) => ({ count: state.count + 1 }));

export const setText = (text: string) => useBoundStore.setState({ text });
