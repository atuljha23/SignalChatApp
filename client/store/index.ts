import { create } from "zustand";
import { createAuthSlice } from "./slices/auth-slice";

interface AuthUserState {
  userInfo: any;
  setUserInfo: (userInfo: any) => void;
}

export const useAppStore = create<AuthUserState>()((...a) => {
  return {
    ...createAuthSlice(...a),
  };
});
