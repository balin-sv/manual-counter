import { Notyf } from "notyf";
import "notyf/notyf.min.css";

export const useNotyf = () => {
  const notyf = new Notyf({
    dismissible: true,
    duration: 2000,
    position: {
      x: "right",
      y: "top",
    },
    types: [],
  });

  return {
    success: (payload) => {
      return notyf.success(payload);
    },
    error: (payload) => {
      return notyf.error(payload);
    },
  };
};
