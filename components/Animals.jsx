import React,{ useState} from 'react';
import './Css/Animals.css';
import image1 from '../images/Frame 12.jpg';
import image3 from '../images/Frame 14.png';
import image5 from '../images/Frame 16.png';
import image6 from '../images/Frame 17.png';
import image7 from '../images/Frame 20.png';
import image8 from '../images/Frame 21.png';
import image9 from '../images/Frame 22.png';
import image10 from '../images/Frame 23.png';
import image11 from '../images/Frame 24.png';

const animalPhotos = [
  {
    id: 1,
    src: image5,
    description: [
      '요즘 같이 산책을 하지는 못 하지만 그래도 본가에 가서 만나면 저를 엄청 좋아해줘서 정말 사랑스럽습니다.',
      '쪼리는 뒷 다리 오른쪽 관절이 안 좋아서 뛰거나 계단을 오르지 못합니다.',
    ],
    tags: ['쪼리', '강아지', '귀여움']
  },
  {
    id: 2,
    src: image1,
    description: [
      '한국 수달은 귀여운 상이고 호주 수달은 험악한 얼굴을 가지고 있습니다.',
      '수달은 천연 기념물로 선정이 되어있습니다.(1982.11.16)',
      '성격: 똑똑함, 호기심, 물놀이를 좋아함.'
    ],
    tags: ['수달', '천연기념물', '귀여움']
  },
  {
    id: 3,
    src: image3,
    description: [
      '몸이 길고 유연하며 작은 덩치에 걸맞게 몸동작이 날렵한 편이다.',
      '은밀한 사냥 방식과 포악성 때문에 양계장 주인들에게는 경계 대상 1순위다.'
    ],
    tags: ['졸귀', '천연기념물', '육식']
  },
  {
    id: 4,
    src: image6,
    description: [
      '오리너구리는 조류가 아닌, 엄연한 포유류이다.',
      '부리는 새와 다르고, 말랑하다.',
      '위장이 없고 창자만 있는 독특한 구조이다.'
    ],
    tags: ['오리너구리', '특이동물', '포유류']
  },
  {
    id: 5,
    src: image7,
    description: [
      '고양이는 날카로운 발톱과 야간시력, 조용한 발걸음으로 유명한 사냥꾼이다.',
      '독립적이고 청결하며, 기분 따라 애정 표현 다르다.',
      '고양이의 골골송은 사람에게도 안정감을 준다.'
    ],
    tags: ['귀여움', '야옹', '포유류']
  },
  {
    id: 6,
    src: image8,
    description: [
      '하프물범는 새끼는 새하얀 솜털로 덮여 있음 (눈사람 느낌), 성체는 등에 하프(하늘색 하프 무늬) 모양의 검은 무늬가 있다.',
      '새끼를 낳고 기름 많은 젖으로 빠르게 성장시킨다.',
      '귀엽고 무해한 외모로 보호 운동 대상이 되기도 함'
    ],
    tags: ['졸귀', '특이동물', '아기']
  },
  {
    id: 7,
    src: image9,
    description: [
      '쿼카는 항상 웃는 듯한 표정으로 세상에서 가장 행복한 동물로 유명.',
      '주로 야행성이고 채식을 한다, 꼬리가 짧고 뒷다리가 강력하다.',
      '쿼카와 셀카 열풍으로 유명하지만, 만지거나 먹이주는 행위는 금지이다다.'
    ],
    tags: ['졸귀', '천연기념물', '소형동물']
  },
  {
    id: 8,
    src: image10,
    description: [
      '햄스터는 볼주머니에 먹이를 저장, 야행성, 땅굴 파기 전문가',
      '호기심 많고 겁도 많음, 일부 품종은 단독 생활 선호한다.',
      '사람에게 친숙한 동물이고 키우기가 쉽다.'
    ],
    tags: ['포유류', '귀여움', '소형동물']
  },
  {
    id: 9,
    src: image11,
    description: [
      '코알라는 하루에 18 ~ 20시간 잠을 자는 스릴퍼 애니멀이다.',
      '거의 유칼립투스 잎을 먹고 사는데 소화 기관에서 독성을 분해할 수 있도록 발달'
    ],
    tags: ['포유류', '귀여움', '천연기념물']
  },
];


const Animals = () => {
    const [selectedTag, setSelectedTag] = useState(null);
    
    const filteredPhotos = selectedTag
      ? animalPhotos.filter(photo => photo.tags.includes(selectedTag))
      : animalPhotos;
    return (
        <div className='Animals-container'>
            <main>
                {selectedTag && (
                    <div className="tag-reset">
                    <button onClick={() => setSelectedTag(null)}>← 태그 돌아가기</button>
                    </div>
                )}
               <section className="Animals-grid">
                    {filteredPhotos.map(photo => (
                        <div key={photo.id}>
                    <img src={photo.src} alt="animal" className="Animals-image" />
                        <ul className="Animals-ul">
                            {photo.description.map((line, i) => (
                                <li key={i}>{line}</li>
                            ))}
                        </ul>
                        {/* 태그 출력 */}
                        <div className="tag-list">
                            {photo.tags.map((tag, i) => (
                                <span
                                key={i}
                                className="tag"
                                onClick={() => setSelectedTag(tag)}
                                >
                                #{tag}
                            </span>
                            ))}
                        </div>
                    </div>
                ))}
                </section>
            </main>
        </div>
    );
};

export default Animals;
