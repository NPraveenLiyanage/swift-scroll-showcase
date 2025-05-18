
import * as React from "react";
import { toast as sonnerToast } from "sonner";
import { ToastProps, actionTypes, State, Action } from "./toast-types";
import { reducer } from "./toast-reducer";
import { genId, showToast } from "./toast-utils";

const listeners: Array<(state: State) => void> = [];
let memoryState: State = { toasts: [] };

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

type Toast = Omit<ToastProps, "id"> & {
  id?: string;
};

function toast({ id, ...props }: Toast) {
  const toastId = id || genId();

  const update = (props: ToastProps) =>
    dispatch({
      type: actionTypes.UPDATE_TOAST,
      toast: { ...props, id: toastId },
    });
  const dismiss = () => dispatch({ type: actionTypes.DISMISS_TOAST, toastId });

  dispatch({
    type: actionTypes.ADD_TOAST,
    toast: {
      ...props,
      id: toastId,
      visible: true,
      onOpenChange: (visible) => {
        if (!visible) dismiss();
      },
    },
  });

  return {
    id: toastId,
    dismiss,
    update,
  };
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: actionTypes.DISMISS_TOAST, toastId }),
  };
}

export { useToast, toast, showToast };
