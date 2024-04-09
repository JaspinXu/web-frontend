/*
 * @Author: JaspinXu sea.xuo@gmail.com
 * @Date: 2024-03-17 12:21:41
 * @LastEditors: JaspinXu sea.xuo@gmail.com
 * @LastEditTime: 2024-04-09 16:10:42
 * @FilePath: \web-frontend\src\components\Footer\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import React from 'react';

const Footer: React.FC = () => {
  const intl = useIntl();

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} JaspinXu出品`}
    />
  );
};

export default Footer;
