import React, { useEffect, useState } from 'react';

const Playlist = () => {
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("myPlaylist");
    if (saved) setPlaylist(JSON.parse(saved));
  }, []);

  return (
    <div>
      <h2>나만의 플레이리스트</h2>
      {playlist.length === 0 ? (
        <p>북마크한 곡이 없습니다.</p>
      ) : (
        playlist.map((track, i) => (
          <div key={i}>
            <img src={track.image} alt={track.title} width="100" />
            <p>{track.title}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Playlist;
