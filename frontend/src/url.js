export const URL=import.meta.env.VITE_URL
export const IF=import.meta.env.VITE_IF
export const API= import.meta.env.API_URL

export const getError = (error) => {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  };
