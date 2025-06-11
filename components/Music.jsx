import React, { useState, useRef, useEffect } from 'react';
import './Css/Music.css';
import song1 from '../music/Peppertones (페퍼톤스)-행운을 빌어요.mp3'; 
import song2 from '../music/4_5899809313941095827.mp3'; 
import song3 from '../music/야경 - 터치드(TOUCHED).mp3'; 
import song4 from '../music/Dance The Night Away.mp3'; 
import song5 from '../music/개화.mp3'; 
import song6 from '../music/WOODZ-Drowning.mp3'; 
import song7 from '../music/오늘만 I LOVE YOU.mp3';
import song8 from '../music/내버려.mp3';
import song9 from '../music/덤디덤디 (DUMDi DUMDi).mp3';
import song10 from '../music/미도와 파라솔 - 밤이 깊었네.mp3';
import song11 from '../music/이무진-과제곡(교수님 죄송합니다).mp3';
import song12 from '../music/Go(스물다섯 스물하나 OST).mp3';
import song13 from '../music/TOMBOY_(여자)아이들.mp3';
import song14 from '../music/METEOR.mp3';
import PEPPERTONESImage from '../images/PEPPERTONES.png'; 
import DAY6Image from '../images/DAY6.png'; 
import TOUCHEDImage from '../images/TOUCHED.png'; 
import TWICEImage from '../images/TWICE.png'; 
import LUCYImage from '../images/LUCY.png'; 
import LUCY2Image from '../images/LUCY2.png'; 
import WOODZImage from '../images/WOODZ.png'; 
import BOYNEXTDOORImage from '../images/BOYNEXTDOOR.png'; 
import DUMDiImage from '../images/(여자)아이들.png'; 
import DramaImage from '../images/미도와 파라솔.png'; 
import AssignmentImage from '../images/과제곡.png'; 
import GOImage from '../images/GO.png'; 
import TOMBOYImage from '../images/TOMBOY.png'; 
import METEORImage from '../images/METEOR.png'; 

// 추천하는 음원 배열
const recommendedTracks = [
    {
        title: 'PEPPERTONES-행운을 빌어요',
        image: PEPPERTONESImage,
        audio: song1,
    },
    {
        title: 'Day6-DanceDance',
        image: DAY6Image,
        audio: song2,
    },
    {
        title: 'Twice-Dance The Night',
        image: TWICEImage,
        audio: song4
    },
    {
        title: 'BOYNEXTDOOR-오늘만 I Love You',
        image: BOYNEXTDOORImage,
        audio: song7
    },
    {
        title: 'LUCY-내버려',
        image: LUCY2Image,
        audio: song8
    },
    {
        title: '(여자)아이들-Dumdi Dumdi',
        image: DUMDiImage,
        audio: song9
    },
    {
        title: '미도와 파라솔-밤이 깊었네',
        image: DramaImage,
        audio: song10
    }
    
];

// 가장 많이 들었던 음원 배열
const popularTracks = [
    {
        title: 'TOUCHED-야경',
        image: TOUCHEDImage,
        audio: song3,
    },
    {
        title: 'LUCY-개화',
        image: LUCYImage,
        audio: song5,
    },
    {
        title: 'WOODZ-Drowning',
        image: WOODZImage,
        audio: song6,
    },
    {
        title: '이무진-과제곡',
        image: AssignmentImage,
        audio: song11,
    },
    {
        title: '도겸-Go!',
        image: GOImage,
        audio: song12,
    },
    {
        title: '(여자)아이들-TomBoy',
        image: TOMBOYImage,
        audio: song13,
    },
    {
        title: '창모-METEOR',
        image: METEORImage,
        audio: song14,
    }
];

const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = ('0' + Math.floor(time % 60)).slice(-2);
    return `${minutes}:${seconds}`;
};

const Music = () => {
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [currentTrackType, setCurrentTrackType] = useState('recommended'); // 현재 트랙 타입 관리
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    
    const audioRef = useRef();
    

    const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem("myPlaylist");
        return saved ? JSON.parse(saved) : [];
    });
    // 현재 재생 중인 트랙
    const currentTrack =
    currentTrackType === 'recommended'
    ? recommendedTracks[currentTrackIndex]
    : currentTrackType === 'popular'
    ? popularTracks[currentTrackIndex]
    : bookmarks[currentTrackIndex]; // ← 이 라인에서는 bookmarks가 이미 위에서 선언되어 있어야 함


    const safePlay = () => {
    const audio = audioRef.current;
    if (audio) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
        playPromise.catch((error) => {
            console.error('Playback failed:', error);
        });
        }
    }
    };
  
    useEffect(() => {
        const audio = audioRef.current;
  
        const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
        const handleLoadedMetadata = () => setDuration(audio.duration);
        const handleEnded = () => handleNext();
  
        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('ended', handleEnded);
  
        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('ended', handleEnded);
        };
    }, [currentTrackIndex, currentTrackType]);
  
    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };
  
    const handleTrackClick = (index, type) => {
        setCurrentTrackIndex(index);
        setCurrentTrackType(type); // 클릭한 트랙의 타입 설정
        setIsPlaying(true);
        setTimeout(safePlay, 100);
    };
  
    const handleVolumeChange = (e) => {
        const vol = parseFloat(e.target.value);
        setVolume(vol);
        audioRef.current.volume = vol;
    };
  
    const handleProgressChange = (e) => {
        const time = parseFloat(e.target.value);
        audioRef.current.currentTime = time;
        setCurrentTime(time);
    };
    
    const getTrackList = () => {
        if (currentTrackType === 'recommended') return recommendedTracks;
        if (currentTrackType === 'popular') return popularTracks;
        return bookmarks;
    };

    const handleNext = () => {
        const list = getTrackList();
        const nextIndex = (currentTrackIndex + 1) % list.length;
        setCurrentTrackIndex(nextIndex);
        setIsPlaying(true);
        setTimeout(safePlay, 100);
    };

    const handlePrev = () => {
        const list = getTrackList();
        const prevIndex = (currentTrackIndex - 1 + list.length) % list.length;
        setCurrentTrackIndex(prevIndex);
        setIsPlaying(true);
        setTimeout(safePlay, 100);
    };
    const toggleBookmark = (track) => {
    const exists = bookmarks.some(b => b.title === track.title);
    const updated = exists
        ? bookmarks.filter(b => b.title !== track.title)
        : [...bookmarks, track];
  
        setBookmarks(updated);
        localStorage.setItem("myPlaylist", JSON.stringify(updated));
    };

    return (
        <div className="music-wrapper">
            <h3>가장 많이 듣는 음원</h3>
            <div className="music-row">
                {recommendedTracks.map((track, index) => (
                    <div
                        className={`music-card ${index === currentTrackIndex && currentTrackType === 'recommended' ? 'active' : ''}`}
                        key={index}
                        onClick={() => handleTrackClick(index, 'recommended')} // 클릭 시 타입 전달
                    >
                        <img src={track.image} alt={track.title} className="music-image"/>
                        <div className="music-title">{track.title}</div>
                        <div className="bookmark-btn" onClick={(e) => {
                            e.stopPropagation(); // 클릭 전파 막기
                            toggleBookmark(track);
                            }}>
                            {bookmarks.some(b => b.title === track.title) ? '❤️' : '🤍'}
                        </div>
                    </div>
                ))}
            </div>

            <h3>신나게 산책하고 싶은 음원</h3>
            <div className="music-row">
                {popularTracks.map((track, index) => (
                    <div
                        className={`music-card ${index === currentTrackIndex && currentTrackType === 'popular' ? 'active' : ''}`}
                        key={index + 'second'}
                        onClick={() => handleTrackClick(index, 'popular')} // 클릭 시 타입 전달
                    >
                        <img src={track.image} alt={track.title} className="music-image"/>
                        <div className="music-title">{track.title}</div>
                        <div className="bookmark-btn" onClick={(e) => {
                            e.stopPropagation(); // 클릭 전파 막기
                            toggleBookmark(track);
                            }}>
                            {bookmarks.some(b => b.title === track.title) ? '❤️' : '🤍'}
                        </div>  

                    </div>
                ))}
            </div>
           <h3>나의 Playlist</h3>
            <div className="music-row">
            {bookmarks.length === 0 ? (
                <p>PlayList에 곡이 없습니다.</p>
            ) : (
                bookmarks.map((track, index) => (
                <div
                    className={`music-card ${index === currentTrackIndex && currentTrackType === 'playlist' ? 'active' : ''}`}
                    key={index + 'playlist'}
                    onClick={() => handleTrackClick(index, 'playlist')}
                >
                    <img src={track.image} alt={track.title} className="music-image" />
                    <div className="music-title">{track.title}</div>
                </div>
                ))
            )}
            </div>


            <footer className="music-footer">
                <audio ref={audioRef} src={currentTrack.audio} />
  
                <div className="controls">
                    <button onClick={handlePrev}>⏮</button>
                    <button onClick={handlePlayPause}>{isPlaying ? '⏸' : '▶'}</button>
                    <button onClick={handleNext}>⏭</button>
                </div>

                <div className="current-track-info">
                    <span className="current-track-title">{currentTrack.title}</span> {/* 현재 트랙 제목 표시 */}
                </div>
  
                <div className="progress-volume">
                    <span>{formatTime(currentTime)}</span>
                    <input
                        type="range"
                        min="0"
                        max={duration || 0}
                        step="1"
                        value={currentTime}
                        onChange={handleProgressChange}
                    />
                    <span>{formatTime(duration)}</span>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                    />
                </div>
            </footer>
        </div>
    );
};

export default Music;
