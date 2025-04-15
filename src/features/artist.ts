import api from "./api";
interface ArtistType {
  user_id: number;
  first_release_year: number;
  no_of_albums_released: number;
}

interface ArtistTypeWithId extends ArtistType {
  id: number;
  first_name: string;
  last_name: string;
  dob: string;
  phone: string;
  gender: string;
  address: string;
}
export const createArtist = async (artist: ArtistType) => {
  const { user_id, first_release_year, no_of_albums_released } = artist;
  const response = await api.post("/artist", {
    user_id,
    first_release_year,
    no_of_albums_released,
  });
  return response.data;
};

export const updateArtist = async (artist: ArtistTypeWithId) => {
  const {
    id,
    user_id,
    first_name,
    last_name,
    dob,
    phone,
    gender,
    address,
    first_release_year,
    no_of_albums_released,
  } = artist;
  const response = await api.put(`/artist/${id}`, {
    user_id,
    first_name,
    last_name,
    dob,
    phone,
    gender,
    address,
    first_release_year,
    no_of_albums_released,
  });
  return response.data;
};

export const getArtists = async (page: number) => {
  const response = await api.get(`/artist?page=${page}&page_size=10`);
  return response.data;
};

export const getArtistById = async (id: number) => {
  const response = await api.get(`/artist/${id}`);
  return response.data;
};

export const deleteArtist = async (id: number) => {
  const response = await api.delete(`/artist/${id}`);
  return response;
};
