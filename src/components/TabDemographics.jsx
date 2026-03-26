import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { schoolData } from '../data/schoolData';

const TabDemographics = () => {
  const {
    gender,
    commute,
    highSchool,
    partTimeJob,
    mbti,
    sns,
    culture,
    experience,
  } = schoolData.demographics;

  const renderPieChart = (data, title) => (
    <div
      className="neo-card"
      style={{
        padding: '24px',
        flex: '1 1 500px',
        minWidth: 'min(100%, 500px)',
      }}
    >
      <h4
        style={{
          fontWeight: '900',
          borderBottom: '4px solid #000',
          paddingBottom: '8px',
          marginBottom: '24px',
          fontSize: '18px',
        }}
      >
        {title}
      </h4>
      <div
        style={{
          width: '100%',
          height: '280px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="25%"
              outerRadius="55%"
              dataKey="value"
              stroke="#000"
              strokeWidth={2}
              labelLine={{ stroke: '#000', strokeWidth: 2 }}
              label={({ cx, x, y, name, percent }) => (
                <text
                  x={x}
                  y={y}
                  fill="#000"
                  textAnchor={x > cx ? 'start' : 'end'}
                  dominantBaseline="central"
                  fontSize="13"
                  fontWeight="900"
                >
                  {`${name} ${(percent * 100).toFixed(0)}%`}
                </text>
              )}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                border: '4px solid black',
                fontWeight: 'bold',
                boxShadow: '4px 4px 0px black',
              }}
              formatter={(value, name) => [`${value}%`, name]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        paddingBottom: '40px',
      }}
    >
      <div
        className="neo-card"
        style={{ backgroundColor: '#FF00E5', color: '#fff', padding: '20px' }}
      >
        <h3 style={{ fontSize: '20px', fontWeight: '900' }}>
          多彩な個性が集まる場所
        </h3>
        <p style={{ fontSize: '14px', fontWeight: 'bold', marginTop: '8px' }}>
          出身も趣味もバラバラだけど、「つくるのが好き」という気持ちはみんな同じ。そんな最高の仲間たちが待っています。
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '24px',
          justifyContent: 'center',
        }}
      >
        {renderPieChart(gender, '男女比')}
        {renderPieChart(highSchool, '出身高校の学科は？')}
        {renderPieChart(commute, 'どこから通っている？')}
        {/* {renderPieChart(mbti, 'MBTIのタイプは？（16タイプ）')} */}
        {renderPieChart(sns, '一番よく使うSNSは？')}
        {renderPieChart(culture, '放課後や休日の過ごし方は？')}
        {renderPieChart(partTimeJob, 'アルバイトしてる？')}
        {renderPieChart(experience, '入学前に制作経験あった？')}
      </div>
    </div>
  );
};

export default TabDemographics;
