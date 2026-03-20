import React from 'react';
import { ExternalLink, Calendar } from 'lucide-react';
import { schoolData } from '../data/schoolData';

const TabTimeline = () => {
  let eventIndex = 0; // alternating表示用のインデックス

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
        paddingBottom: '40px',
      }}
    >
      {/* 共通リード文 */}
      <div
        className="neo-card"
        style={{ backgroundColor: '#00E0FF', padding: '20px' }}
      >
        <h3 style={{ fontSize: '20px', fontWeight: '900' }}>
          実践と成長の2年間
        </h3>
        <p
          style={{
            fontSize: '14px',
            fontWeight: 'bold',
            marginTop: '8px',
            lineHeight: '1.6',
          }}
        >
          基礎から応用、そして実際のクライアントワークまで。プロの現場に近い環境で、楽しみながら圧倒的なスキルを身につけていくステップを紹介します！
        </p>
      </div>

      <div className="timeline-container" style={{ position: 'relative' }}>
        <div className="timeline-line" />

        {schoolData.timeline.map((item) => {
          if (item.type === 'milestone') {
            return (
              <div key={item.id} className="timeline-milestone">
                <div
                  className="timeline-milestone-label"
                  style={{
                    backgroundColor: item.bgColor,
                    color: item.color,
                    border: '3px solid black',
                    boxShadow: '4px 4px 0px black',
                  }}
                >
                  {item.title}
                </div>
              </div>
            );
          }

          const isLeft = eventIndex % 2 === 0;
          eventIndex++;

          const badgeStyle =
            item.year === 1
              ? {
                  backgroundColor: '#000',
                  color: '#fff',
                  border: '3px solid #fff',
                }
              : {
                  backgroundColor: '#fff',
                  color: '#000',
                  border: '3px solid #000',
                };

          return (
            <div key={item.id} className="timeline-row">
              <div className={`timeline-event ${isLeft ? 'left' : 'right'}`}>
                <div
                  className="timeline-month-badge"
                  style={{
                    ...badgeStyle,
                    boxShadow: '4px 4px 0px rgba(0,0,0,0.2)',
                  }}
                >
                  {item.badge}
                </div>

                <div className="timeline-event-content">
                  <div className="neo-card" style={{ padding: '16px' }}>
                    <div
                      style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}
                    >
                      {item.imageUrl && (
                        <div style={{ flex: '1 1 200px' }}>
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            style={{
                              width: '100%',
                              height: 'auto',
                              aspectRatio: '16/9',
                              objectFit: 'cover',
                              border: '4px solid #000',
                            }}
                          />
                        </div>
                      )}
                      <div
                        style={{
                          flex: '2 1 250px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '8px',
                        }}
                      >
                        <h4
                          style={{
                            fontWeight: '900',
                            fontSize: '18px',
                            margin: 0,
                          }}
                        >
                          {item.title}
                        </h4>
                        <p
                          style={{
                            fontSize: '13px',
                            lineHeight: '1.6',
                            fontWeight: 'bold',
                            color: '#475569',
                            margin: 0,
                          }}
                        >
                          {item.description}
                        </p>
                        {item.linkUrl && (
                          <a
                            href={item.linkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="neo-btn"
                            style={{
                              marginTop: '8px',
                              padding: '8px 12px',
                              fontSize: '11px',
                              backgroundColor: '#00FF94',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              textDecoration: 'none',
                              color: '#000',
                              alignSelf: 'flex-start',
                            }}
                          >
                            詳細を見る <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TabTimeline;
