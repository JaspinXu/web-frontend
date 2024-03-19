/*
 * @Author: JaspinXu sea.xuo@gmail.com
 * @Date: 2024-03-19 15:29:11
 * @LastEditors: JaspinXu sea.xuo@gmail.com
 * @LastEditTime: 2024-03-19 16:35:41
 * @FilePath: \web-frontend\src\pages\base\lab\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { CloudUploadOutlined, UploadOutlined, UserOutlined } from "@ant-design/icons";
import { PageContainer } from "@ant-design/pro-components";
import { Avatar, Button, ColorPicker, Flex, Progress, Space, Upload, message } from "antd";
import { UploadProps } from "antd/lib/upload";
import { values } from "lodash";

export default() => {
    const props: UploadProps = {
        name: 'file',
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        headers: {
          authorization: 'authorization-text',
        },
        onChange(info) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
      };
      const App1: React.FC = () => (
        <Upload {...props}>
          <Button>Click to Upload</Button>
        </Upload>
      );
      const App2: React.FC = () => (
        <Flex vertical gap="small" style={{ width: 180 }}>
         <Progress percent={20} status="exception" />
         <Progress percent={50} status="active" />
         <Progress percent={100} />
        </Flex>
      );
    return <PageContainer>
        <Space>
        <Button danger type = "primary">新建实验室</Button>
        <ColorPicker defaultValue="#1677ff" />
        <App1> </App1>
        <Avatar style={{ backgroundColor: '#87d068' }} />
        <App2> </App2>
        </Space>
    </PageContainer>;
};


