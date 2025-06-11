import React, { useRef, useEffect, useState } from "react";
import './Css/Map.css';
import myImage from '../images/kaywon.png';
import myImage2 from '../images/ghtn.png';
import myImage3 from '../images/fkqp.png';
import myImage4 from '../images/Wfl.png';

const options = {
  center: new window.kakao.maps.LatLng(37.379096, 126.978539),
  level: 9,
};
function Map() {
  const [logs, setLogs] = useState([]);
  const container = useRef(null);
  const [notification, setNotification] = useState(null);
  
  useEffect(() => {
    const map = new window.kakao.maps.Map(container.current, options);

    const positions = [
      {
        title: "계원예술대학교",
        latlng: new window.kakao.maps.LatLng(37.379096, 126.978539),
        image: myImage,
        text: "학교 근처 주변에 산책을 하면<br> 볼 수 있는 벚꽃입니다.",
      },
      {
        title: "백운호수",
        latlng: new window.kakao.maps.LatLng(37.380583, 127.004186),
        image: myImage2,
        text: "백운호수에는 정말 다양한 동식물이 살고 있어서<br> 한번 가보시는 걸 추천드립니다.",
      },
      {
        title: "라베니체",
        latlng: new window.kakao.maps.LatLng(37.641573, 126.678653),
        image: myImage3,
        text: "상가 건물이 많고 사람도 밤에도 <br>예쁜 것들이 많은 곳이라<br> 즐겁게 놀 수 있는 곳입니다.",
      },
      {
        title: "선수 공원",
        latlng: new window.kakao.maps.LatLng(37.612830, 126.729142),
        image: myImage4,
        text: "저의 본가와 가까운 곳에 위치해<br> 강아지와 산책 할 때 많이 가는 산책 코스입니다.",
      },
    ];

    positions.forEach((position) => {
      const marker = new window.kakao.maps.Marker({
        map,
        position: position.latlng,
        title: position.title
      });
      const showNotification = (message) => {
      setNotification(message);
      setTimeout(() => setNotification(null), 2000); // 2초 후 사라짐
    };


      marker.setMap(map);

      // 팝업 컨텐츠 생성
      const contentDiv = document.createElement("div");
      contentDiv.className = "customoverlay";
      contentDiv.innerHTML = `
      <div class="description">
      <img src="${position.image}" alt="${position.title}" />
          <h4>${position.title}</h4>
          <p>${position.text}</p>
          <button class="log-button">산책 완료!</button>
          <button class="close-button">닫기</button>
        </div>
      `;

      const customOverlay = new window.kakao.maps.CustomOverlay({
        content: contentDiv,
        position: position.latlng,
        yAnchor: 1
      });

      window.kakao.maps.event.addListener(marker, "click", () => {
        customOverlay.setMap(map);

        setTimeout(() => {
          contentDiv.querySelector(".close-button").addEventListener("click", () => {
            customOverlay.setMap(null);
          });

          contentDiv.querySelector(".log-button").addEventListener("click", () => {
          if (!logs.some(log => log.title === position.title)) {
            setLogs(prev => [...prev, position]);
            showNotification(`"${position.title}" 산책 완료!`);
          }
          customOverlay.setMap(null);
        });
        }, 0);
      });
    });
  }, [logs]);
  return (
    <>
      {notification && (
        <div className="notification-bar">{notification}</div>
      )}
      <div className="map" ref={container}></div>
    </>
  );

}

export default Map;
