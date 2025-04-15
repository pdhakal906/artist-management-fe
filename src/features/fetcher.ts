import api from "./api";
import { getArtists } from "./artist";
import { getMusic, getMusicByArtistId, getMusicPageData } from "./music";
import { getUsers } from "./user";

export const fetcher = (url: string) => api.get(url).then((res) => res.data);

export const fetchUsers = async (page: number) => {
  const response = await getUsers(page);
  return response;
};

export const fetchArtists = async (page: number) => {
  const response = await getArtists(page);
  return response;
};

export const fetchMusic = async (page: number) => {
  const response = await getMusic(page);
  return response;
};

export const fetchMusicByArtistId = async (artistId: number) => {
  const response = await getMusicByArtistId(artistId);
  return response;
};

export const fetchMusicPageData = async () => {
  const response = await getMusicPageData();
  return response;
};
