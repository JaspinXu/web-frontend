import { ModalForm, ProForm, ProFormInstance, ProFormText } from '@ant-design/pro-components';
import { message } from 'antd';
import { useEffect, useRef } from 'react';
import { waitTime } from '@/utils/request';
import { addLab, updateLab } from '@/services/api/lab';

interface InputDialogProps {
  detailData?: API.LabDTO;
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
    const { labName, labCode,  studentMax, occupy, description } = values;
    const data: API.LabDTO = {
      id: props.detailData?.id,
      labName, 
      labCode,
      studentMax, 
      occupy, 
      description,
    };

    try {
      if (props.detailData) {
        await updateLab(data, { throwError: true });
      } else {
        await addLab(data, { throwError: true });
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
      width={600}
      onFinish={onFinish}
      formRef={form}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => props.onClose(false),
      }}
      title={props.detailData ? '修改实验室' : '新建实验室'}
      open={props.visible}
    >
      <ProForm.Group>
      <ProFormText
        name="labName"
        label="实验室名称"
        rules={[
          {
            required: true,
            message: '请输入实验室名称！',
          },
        ]}
      />
      <ProFormText
          name="labCode"
          label="实验室编码"
          rules={[
            {
              required: true,
              message: '请输入实验室编码！',
            },
          ]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          name="studentMax"
          label="实验容量"
          rules={[
            {
              required: true,
              message: '请输入实验容量！',
            },
          ]}
        />
        <ProFormText
          name="occupy"
          label="占据状态"
          rules={[
            {
              required: true,
              message: '请输入占据状态1/0！',
            },
          ]}
        />
      </ProForm.Group>
      <ProFormText name="description" label="备注" />
    </ModalForm>
  );
}