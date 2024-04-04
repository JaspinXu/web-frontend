/*
 * @Author: JaspinXu sea.xuo@gmail.com
 * @Date: 2024-03-25 17:35:42
 * @LastEditors: JaspinXu sea.xuo@gmail.com
 * @LastEditTime: 2024-04-04 13:39:33
 * @FilePath: \web-frontend\src\pages\base\semester\InputDialog\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ModalForm, ProForm, ProFormInstance, ProFormText } from '@ant-design/pro-components';
import { message } from 'antd';
import { useEffect, useRef } from 'react';
import { waitTime } from '@/utils/request';
import { addSemester, updateSemester } from '@/services/api/semester';

interface InputDialogProps {
  detailData?: API.SemesterDTO;
  visible: boolean;
  onClose: (result: boolean) => void;
}

export default function InputDialog(props: InputDialogProps) {
  const form = useRef<ProFormInstance>(null);

  useEffect(() => {
    waitTime().then(() => {
      if (props.detailData) {
        form?.current?.setFieldsValue(props.detailData);
      } else {
        form?.current?.resetFields();
      }
    });
  }, [props.detailData, props.visible]);

  const onFinish = async (values: any) => {
    const { semesterName } = values;
    const data: API.SemesterDTO = {
      id: props.detailData?.id,
      semesterName,
    };

    try {
      if (props.detailData) {
        await updateSemester(data, { throwError: true });
      } else {
        await addSemester(data, { throwError: true });
      }
    } catch (ex) {
      return true;
    }

    props.onClose(true);
    message.success('保存成功');
    return true;
  };

  return (
    <ModalForm
      width={450}
      onFinish={onFinish}
      formRef={form}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => props.onClose(false),
      }}
      title={props.detailData ? '修改学期' : '新建学期'}
      open={props.visible}
    >
      <ProFormText
        name="semesterName"
        label="学期名"
        rules={[
          {
            required: true,
            message: '请输入学期名！',
          },
        ]}
      />
    </ModalForm>
  );
}