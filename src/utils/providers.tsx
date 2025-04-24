import { useReducer } from "react";
import {
  CartInitialState,
  CartContext,
  CartDispatchContext,
  FavoritesInitialState,
  FavoriteContext,
  FavoriteDispatchContext,
  ModalInitialState,
  ModalDispatchContext,
  LoggedStatusInitialState,
  LoggedStatusContext,
  LoggedStatusDispatchContext,
} from "../store";
import {
  CartReducer,
  FavoriteReducer,
  ModalReducer,
  LoggedStatusReducer,
} from "./reducers";

export const GlobalCartProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(CartReducer, CartInitialState);

  return (
    <CartContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
};

export const GlobalFavoriteProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(FavoriteReducer, FavoritesInitialState);

  return (
    <FavoriteContext.Provider value={state}>
      <FavoriteDispatchContext.Provider value={dispatch}>
        {children}
      </FavoriteDispatchContext.Provider>
    </FavoriteContext.Provider>
  );
};

export const GlobalModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(ModalReducer, ModalInitialState);

  return (
    <>
      <ModalDispatchContext.Provider value={dispatch}>
        {children}
      </ModalDispatchContext.Provider>
      <div className={`${state.isOpen ? "modal modal--open" : "modal"}`}>
        <i
          className="pi pi-times"
          onClick={() => dispatch({ type: "CLOSE_MODAL", payload: null })}
        ></i>
        <div className="modal__content">{state.children}</div>
      </div>
    </>
  );
};

export const GlobalLoggedStatusProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(LoggedStatusReducer, LoggedStatusInitialState);
  return (
    <>
      <LoggedStatusContext.Provider value={state}>
        <LoggedStatusDispatchContext.Provider value={dispatch}>
          {children}
        </LoggedStatusDispatchContext.Provider>
      </LoggedStatusContext.Provider>
    </>
  );
};
