import React from 'react';
import {
  Building,
  ExternalLink,
  Briefcase,
  ChevronRight,
  PieChart as PieChartIcon,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { schoolData } from '../data/schoolData';

const TabCareer = () => {
  const { industryTypes, threeYearStats } = schoolData.career;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '48px',
        paddingBottom: '40px',
      }}
    >
      <div
        className="neo-card"
        style={{ backgroundColor: '#00FF94', color: '#000', padding: '20px' }}
      >
        <h3 style={{ fontSize: '20px', fontWeight: '900' }}>
          Webのスキルで切り拓く未来
        </h3>
        <p style={{ fontSize: '14px', fontWeight: 'bold', marginTop: '8px' }}>
          制作会社から自社サービス、一般企業のWeb担当まで。2年間で磨いた武器を持って、自分らしいキャリアをスタートしよう！
        </p>
      </div>

      <section>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '24px',
            borderBottom: '4px solid #000',
            paddingBottom: '8px',
          }}
        >
          <Briefcase size={28} color="#FF5C00" strokeWidth={3} />
          <h3 style={{ fontSize: '22px', fontWeight: '900' }}>
            Web業界の「働き方」と就職先
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {industryTypes.map((industry, index) => (
            <div
              key={index}
              className="neo-card"
              style={{
                padding: '0',
                borderLeft: `16px solid ${industry.color}`,
              }}
            >
              <div style={{ padding: '20px', borderBottom: '2px dashed #000' }}>
                <h4
                  style={{
                    fontWeight: '900',
                    fontSize: '18px',
                    marginBottom: '8px',
                  }}
                >
                  {industry.name}
                </h4>
                <p
                  style={{
                    fontSize: '14px',
                    lineHeight: '1.6',
                    fontWeight: 'bold',
                    color: '#475569',
                  }}
                >
                  {industry.description}
                </p>
              </div>
              <div style={{ padding: '16px 20px', backgroundColor: '#f8fafc' }}>
                <div
                  style={{
                    fontSize: '12px',
                    fontWeight: '900',
                    color: '#94a3b8',
                    marginBottom: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Building size={14} /> 主な就職実績
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  {industry.companies.map((company, cIndex) => (
                    <div
                      key={cIndex}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '8px',
                      }}
                    >
                      <ChevronRight size={16} style={{ flexShrink: 0 }} />
                      <a
                        href={company.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: '#000',
                          fontWeight: '900',
                          textDecoration: 'none',
                          fontSize: '14px',
                          borderBottom: '2px solid #00E0FF',
                        }}
                      >
                        {company.name}{' '}
                        <span style={{ fontSize: '11px', color: '#64748b' }}>
                          ({company.pref})
                        </span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '24px',
            borderBottom: '4px solid #000',
            paddingBottom: '8px',
          }}
        >
          <PieChartIcon size={28} color="#7000FF" strokeWidth={3} />
          <h3 style={{ fontSize: '22px', fontWeight: '900' }}>
            データで見る実績
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          {threeYearStats.map((stat, index) => (
            <div key={index} style={{ position: 'relative' }}>
              <div
                className="neo-label"
                style={{
                  backgroundColor: '#000',
                  color: '#fff',
                  fontSize: '14px',
                  padding: '4px 16px',
                  position: 'absolute',
                  top: '-12px',
                  left: '16px',
                  zIndex: 10,
                  transform: 'rotate(-1deg)',
                }}
              >
                {stat.year}年度 卒業生
              </div>
              <div
                className="neo-card"
                style={{ paddingTop: '40px', backgroundColor: '#f1f5f9' }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '16px',
                    marginBottom: '24px',
                  }}
                >
                  <div
                    className="neo-card"
                    style={{
                      padding: '16px',
                      backgroundColor: '#FFDE00',
                      textAlign: 'center',
                    }}
                  >
                    <p style={{ fontSize: '12px', fontWeight: '900' }}>
                      就職率
                    </p>
                    <div style={{ fontSize: '28px', fontWeight: '900' }}>
                      {stat.employmentRate}%
                    </div>
                  </div>
                  <div
                    className="neo-card"
                    style={{
                      padding: '16px',
                      backgroundColor: '#00FF94',
                      textAlign: 'center',
                    }}
                  >
                    <p style={{ fontSize: '12px', fontWeight: '900' }}>
                      業界就職率
                    </p>
                    <div style={{ fontSize: '28px', fontWeight: '900' }}>
                      {stat.industryRate}%
                    </div>
                  </div>
                </div>
                <div style={{ height: '260px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stat.jobRoles} layout="vertical">
                      <XAxis type="number" hide />
                      <YAxis
                        dataKey="name"
                        type="category"
                        tick={{
                          fontWeight: 'bold',
                          fill: '#000',
                          fontSize: 11,
                        }}
                        width={100}
                        axisLine={{ strokeWidth: 3 }}
                      />
                      <Tooltip
                        contentStyle={{
                          border: '4px solid black',
                          fontWeight: 'bold',
                        }}
                      />
                      <Bar
                        dataKey="value"
                        stroke="#000"
                        strokeWidth={2}
                        label={{
                          position: 'right',
                          fontWeight: '900',
                          fontSize: 11,
                        }}
                      >
                        {stat.jobRoles.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TabCareer;
