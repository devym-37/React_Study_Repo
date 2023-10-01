import { create } from "zustand";

export interface UserStoreType {
  userCount: number;
}

export const userStore = create<UserStoreType>((set) => ({
  userCount: 0,
  increaseUserCount: () => set((state) => ({ userCount: state.userCount + 1 })),
  removeUserCount: () => set({ userCount: 0 }),
}));
