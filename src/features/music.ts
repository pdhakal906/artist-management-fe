import api from "./api";
export const getMusic = () => api.get("/music");
export const getArtist = () => api.get("/artist?page=1&page_size=10");
