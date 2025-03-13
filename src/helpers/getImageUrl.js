export const getImageUrl = (filename) => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
    return `${baseUrl}/${filename}`;
  };