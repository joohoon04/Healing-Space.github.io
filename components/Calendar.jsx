import React, { useState, useEffect, useMemo } from 'react';
import Calendar from 'react-calendar';
import './Css/Calendar.css';
import moment from 'moment';
import Modal from 'react-modal';
import emotion1 from '../images/emotion1.png'; // 행복 이미지
import emotion2 from '../images/emotion2.png'; // 슬픔 이미지
import emotion3 from '../images/emotion3.png'; // 아픔 이미지

Modal.setAppElement('#root');

export default function ReactCalendar() {
  const curDate = new Date();
  const [value, onChange] = useState(curDate);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [emotionData, setEmotionData] = useState({
  });
  const [memoData, setMemoData] = useState({
    '2025-04-23': '유니티 시험',
    '2025-04-24': '버추얼, 리액트, 라이팅 시험',
    '2025-04-28': '교양 시험',
  });
  const [currentMemo, setCurrentMemo] = useState('');

    useEffect(() => {
    const savedEmotions = localStorage.getItem('emotionData');
    const savedMemos = localStorage.getItem('memoData');
    if (savedEmotions) setEmotionData(JSON.parse(savedEmotions));
    if (savedMemos) setMemoData(JSON.parse(savedMemos));
  }, []);

  useEffect(() => {
    localStorage.setItem('emotionData', JSON.stringify(emotionData));
  }, [emotionData]);

  useEffect(() => {
    localStorage.setItem('memoData', JSON.stringify(memoData));
  }, [memoData]);

  const emotionSummaryText = useMemo(() => {
  const values = Object.values(emotionData);
  const total = values.length;
  if (total === 0) return "이번 달 감정 기록이 없습니다.";

  const counts = {
    happy: values.filter(e => e === "happy").length,
    sad: values.filter(e => e === "sad").length,
    pain: values.filter(e => e === "pain").length,
  };

  const percent = (n) => Math.round((n / total) * 100);
  return `이번 달 행복 ${percent(counts.happy)}%, 슬픔 ${percent(counts.sad)}%, 아픔 ${percent(counts.pain)}%입니다.`;
}, [emotionData]);


  const handleTileClick = (date) => {
    const dateStr = moment(date).format('YYYY-MM-DD');
    setSelectedDate(dateStr);
    setCurrentMemo(memoData[dateStr] || ''); // 선택한 날짜의 메모 설정
    setModalOpen(true);
  };

  const handleEmotionChange = (e) => {
    setEmotionData((prev) => ({
      ...prev,
      [selectedDate]: e.target.value,
    }));
  };

  const handleMemoChange = (e) => {
    setCurrentMemo(e.target.value);
  };

  const handleSaveMemo = () => {
    setMemoData((prev) => ({
      ...prev,
      [selectedDate]: currentMemo,
    }));
    setModalOpen(false);
  };

  const addContent = ({ date }) => {
    const dateStr = moment(date).format('YYYY-MM-DD');
    const emotion = emotionData[dateStr];

    if (!emotion) return null;

    let emotionImage;
    switch (emotion) {
      case 'happy':
        emotionImage = emotion1;
        break;
      case 'sad':
        emotionImage = emotion2;
        break;
      case 'pain':
        emotionImage = emotion3;
        break;
      default:
        emotionImage = null;
    }

    return (
      <div className={`tile-content ${emotion}`}>
        {emotionImage && (
          <img
            src={emotionImage}
            className="diaryImg"
            alt={emotion}
          />
        )}
      </div>
    );
  };

  const tileClassName = ({ date }) => {
    const dateStr = moment(date).format('YYYY-MM-DD');
    const emotion = emotionData[dateStr];
    return emotion ? `tile-${emotion}` : null;
  };


  return (
    <div className='Calendar-box'>
        <h2>선택한 날짜: {moment(value).format('YYYY-MM-DD')}</h2>
        <Calendar
            locale="en"
            onChange={(date) => {
                onChange(date);
                handleTileClick(date);
            }}
            value={value}
            next2Label={null}
            prev2Label={null}
            formatDay={(locale, date) => moment(date).format('D')}
            showNeighboringMonth={false}
            tileContent={addContent}
            tileClassName={tileClassName}
        />
        <div className="emotion-summary">
          <div className='summary'>{emotionSummaryText}</div>
        </div>
            
      {/* 모달 창 */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        contentLabel="산책 유무 및 메모 입력"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h3>{selectedDate}의 기분은?</h3>
        <select onChange={handleEmotionChange} defaultValue="">
          <option value="" disabled>오늘 기분이 어떤가요?</option>
          <option value="happy">😄 행복해요!</option>
          <option value="sad">😢 슬퍼요..</option>
          <option value="pain">🤒 아파요ㅠㅜㅜ </option>
        </select>
        <div>
          <h4>메모:</h4>
          <textarea 
            value={currentMemo}
            onChange={handleMemoChange}
            rows="4"
            placeholder="메모를 입력하세요..."
            style={{ width: '100%' }}
          />
        </div>
        <button onClick={handleSaveMemo}>저장</button>
      </Modal>
    </div>
  );
}
