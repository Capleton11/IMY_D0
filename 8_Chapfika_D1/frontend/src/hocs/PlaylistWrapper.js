import React from 'react';
import { useParams } from 'react-router-dom';
import PlaylistPage from '../pages/PlaylistPage';

const PlaylistPageWrapper = () => {
  const { id } = useParams(); // Get the ID from the URL
  return <PlaylistPage playlistId={id} />; // Pass the ID to PlaylistPage
};

export default PlaylistPageWrapper;