import api from "./api";

interface MusicType {
  title: string;
  album_name: string;
  genre: string;
  artist_id: string;
}

interface MusicTypeWithId extends MusicType {
  id: number;
}
export const getMusic = async (page: number) => {
  const response = await api.get(`/music?page=${page}&page_size=10`);
  return response.data;
};

export const getMusicById = async (id: number) => {
  const response = await api.get(`/music/${id}`);
  return response.data;
};

export const getMusicPageData = async () => {
  const response = await api.get(`/music/page-data`);
  return response.data;
};

export const createMusic = async (music: MusicType) => {
  const { title, album_name, genre } = music;
  const artist_id = Number(music.artist_id);
  const response = await api.post("/music", {
    title,
    album_name,
    genre,
    artist_id,
  });
  return response.data;
};

export const updateMusic = async (music: MusicTypeWithId) => {
  const { title, album_name, genre } = music;
  const artist_id = Number(music.artist_id);
  const response = await api.put(`/music/${music.id}`, {
    title,
    album_name,
    genre,
    artist_id,
  });
  return response.data;
};

export const deleteMusic = async (id: number) => {
  const response = await api.delete(`/music/${id}`);
  return response.data;
};
