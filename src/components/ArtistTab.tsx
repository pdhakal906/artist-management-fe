import { useEffect, useState } from 'react'

import { getArtist } from '../features/music';
import ArtistTable from './Tables/ArtistTable';

const ArtistTab = () => {
  const [loading, setLoading] = useState(false);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await getArtist();
      console.log(response.data)
      setArtists(response.data.artists);
      setLoading(false);
    }
    fetchData();
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <ArtistTable rowData={artists} />
    </div>
  )
}

export default ArtistTab
