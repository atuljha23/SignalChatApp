type Store = {
  userInfo: any;
  setUserInfo: (userInfo: any) => void;
};

export const createAuthSlice = (set: any) => ({
  userInfo: undefined,
  setUserInfo: (userInfo: any) => set({ userInfo }),
});
