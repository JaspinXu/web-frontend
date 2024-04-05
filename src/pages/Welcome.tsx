import { PageContainer } from '@ant-design/pro-components';
import { Link, useModel } from '@umijs/max';
import { Card, Space, theme } from 'antd';
import React from 'react';

/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */
const InfoCard: React.FC<{
  title: string;
  index: string;
  desc: string;
  href: string;
}> = ({ title, href, index, desc }) => {
  const { useToken } = theme;

  const { token } = useToken();

  return (
    <div
      style={{
        backgroundColor: token.colorBgContainer,
        boxShadow: token.boxShadow,
        borderRadius: '8px',
        fontSize: '14px',
        color: token.colorTextSecondary,
        lineHeight: '22px',
        padding: '16px 19px',
        maxWidth: '345px',
        flex: 1,
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '4px',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            lineHeight: '20px',
            backgroundSize: '90%',
            textAlign: 'center',
            padding: '8px 16px 16px 12px',
            color: '#FFF',
            fontWeight: 'bold',
            backgroundImage:
              "url('https://img1.fjdaily.com/app/images/2023-04/25/faeb7a3c-547b-4434-99b1-3a9d83e09ce4.png.2')",
          }}
        >
          {index}
        </div>
        <div
          style={{
            fontSize: '16px',
            color: token.colorText,
            paddingBottom: 8,
          }}
        >
          {title}
        </div>
      </div>
      <div
        style={{
          fontSize: '14px',
          color: token.colorTextSecondary,
          textAlign: 'justify',
          lineHeight: '22px',
          marginBottom: 8,
        }}
      >
        {desc}
      </div>
      <a href={href} target="_blank" rel="noreferrer">
        To More {'>'}
      </a>
    </div>
  );
};

const Welcome: React.FC = () => {
  const { token } = theme.useToken();
  const { initialState } = useModel('@@initialState');
  return (
    <PageContainer>
      <Card
        style={{
          borderRadius: 8,
          marginBottom: 5,
        }}
        
      >
        <div
          style={{
            backgroundPosition: '100% 0%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '320px auto',
            backgroundImage:
              "url('http://www.qdsyzx.sdu.edu.cn/__local/E/A0/E8/121FFCFE5AD3EFFEA9A5997C429_588A0D72_3B14E.png')",
          }}
        >
          <div
            style={{
              fontSize: '20px',
              color: token.colorTextHeading,
              fontStyle: "oblique",
            }}
          >
          K2公共（创新）实验教学中心概况  
          </div>
          <p
            style={{
              fontSize: '14px',
              color: token.colorTextSecondary,
              lineHeight: '22px',
              marginTop: 16,
              marginBottom: 10,
              width: '68%',
            }}
          >
            山东大学青岛校区公共（创新）实验教学中心实验室空间资源为1.498万平方米（总建筑面积），中心已建好现代教学平台1554平米，微机、语音室共625个机位；工程教育平台661平米，设有电工基础实验室、数电、模电实验室、电工实训实验室、人工智能创新实验室、物联网应用实验室；基础化学公共平台1219平米,设有物理化学实验室、有机化学实验室、无机与分析化学实验室；物理公共平台803平米，设有基础光学实验室、大学物理实验室;创新实践实训平台3354平米，开设无人机、3D打印、陶艺、先进制造技术及虚拟仿真、虚拟仿真机器人、VR/AR、人工智能、虚拟现实、增强现实等开放式实践课程。
          </p>
          <Space size={20}>
          <a href={"https://github.com/JaspinXu/web-backend"} target="_blank" rel="noreferrer">
          本平台Github后端代码 {'>'}
          </a>
          <a href={"https://github.com/JaspinXu/web-frontend"} target="_blank" rel="noreferrer">
          本平台Github前端代码 {'>'}
          </a>
          </Space>
        </div>
      </Card>
      <Card
        style={{
          borderRadius: 8,
        }}
      >
        <div
             style={{
              backgroundPosition: '100% 50%',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '750px auto',
              backgroundImage:
                "url('http://www.qdsyzx.sdu.edu.cn/__local/3/DD/DA/C0EAAB326A17CAB50B8553AC9D0_2999DE8F_14052.png')",
            }}>
        <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <InfoCard
              index={""}
              href="http://www.qdsyzx.sdu.edu.cn/"
              title="公共（创新）实验教学中心"
              desc="K2实验中心整合学校3个国家级实验教学示范中心和1个省级实验教学示范中心的资源，建立了五个跨学科、跨学院的公共、基础类实验平台：现代教育实验平台、工程教育实验平台、公共物理实验平台、公共化学实验平台、创新实践实训平台。其中包括13个计算机实验室，主要分布在二楼，如右图所示。"
            />
          </div>
          </div>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
