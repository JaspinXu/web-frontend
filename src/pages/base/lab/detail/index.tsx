import { getLab, updateLab } from '@/services/api/lab';
import { PageContainer, ProForm, ProFormText, ProFormInstance } from '@ant-design/pro-components';
import { history, useSearchParams } from '@umijs/max';
import { message } from 'antd';
import { useEffect, useState, useRef } from 'react';

export default () => {
  const [searchParams] = useSearchParams();
  const form = useRef<ProFormInstance>(null);
  const id: any = searchParams.get('id') || '';
  const [lab, setLab] = useState<API.LabDTO>();

  useEffect(() => {
    getLab({ id }).then((result) => {
      setLab(result || {});
      form?.current?.setFieldsValue(result);
    });
  }, []);
  const onFinish = async (values: any) => {
    const { labName, labCode, studentMax, occupy, description } = values;
    const data: API.LabDTO = {
      id,
      labName,
      labCode,
      studentMax,
      occupy,
      description,
    };

    try {
      await updateLab(data, { throwError: true });
      message.success('保存成功');
      history.push('/base/lab');
    } catch (ex) {
      return true;
    }
    return true;
  };
  return (
    <PageContainer>
      <ProForm formRef={form} onFinish={(values) => onFinish(values)}>
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
        <ProForm.Group>
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
          <ProFormText
            name="studentMax"
            label="实验容量"
            rules={[
              {
                required: true,
                message: '请输入实验室容量！',
              },
            ]}
          />
          <ProFormText
            name="occupy"
            label="占据状态"
            rules={[
              {
                required: true,
                message: '请输入实验室是否被占用！',
              },
            ]}
          />
        </ProForm.Group>
        <ProFormText name="description" label="备注" />
      </ProForm>
    </PageContainer>
  );
};
