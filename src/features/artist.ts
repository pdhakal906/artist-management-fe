import api from "./api";
export const getArtist = () => api.get("/artist?page=1&page_size=10");
