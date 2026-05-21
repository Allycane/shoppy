import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  userId: null,
  role: null,
  accessToken: null,
  isLogin: false,
  authChecked: true,   // DB 없으므로 즉시 true
  cartCount: 0,
  cartList: [],       // 로컬 장바구니 아이템 목록 - Cart, Checkout 컴포넌트가 공유한다
  isUpdateFlag: false, // 장바구니 리스트 수량 변경

  login: ({ userId, role, accessToken, isLogin }) =>
    set({ userId, role, accessToken, isLogin, authChecked: true }),

  logout: () =>
    set({ userId: null, role: null, accessToken: null, isLogin: false, authChecked: true, cartCount: 0, cartItems: [] }),

  initCartCount: (count) => set({cartCount: count}),

  setCartCount: () => set((s) => ({cartCount: s.cartCount + 1})),

  // setCartItems: (items) =>
  //   set({ cartItems: items, cartCount: items.reduce((sum, i) => sum + i.qty, 0) }),

  setIsUpdateFlag: () => set((state) => ({ isUpdateFlag: !state.isUpdateFlag })),

  setCartList: (cartList) => set(() => ({ cartList: cartList }))
}));
