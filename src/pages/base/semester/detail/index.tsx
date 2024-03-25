import { getSemester, updateSemester } from '@/services/api/semester';
import { PageContainer, ProForm, ProFormText, ProFormInstance } from '@ant-design/pro-components';
import { history, useSearchParams } from '@umijs/max';
import { message } from 'antd';
import { useEffect, useState, useRef } from 'react';

export default () => {
  const [searchParams] = useSearchParams();
  const form = useRef<ProFormInstance>(null);
  const id: any = searchParams.get('id') || '';
  const [semester, setSemester] = useState<API.SemesterDTO>();

  useEffect(() => {
    getSemester({ id }).then((result) => {
      setSemester(result || {});
      form?.current?.setFieldsValue(result);
    });
  }, []);
  const onFinish = async (values: any) => {
    const { semesterName } = values;
    const data: API.SemesterDTO = {
      id,
      semesterName,
    };

    try {
      await updateSemester(data, { throwError: true });
      message.success('保存成功');
      history.push('/base/semester');
    } catch (ex) {
      return true;
    }
    return true;
  };
  return (
    <PageContainer>
      <ProForm formRef={form} onFinish={(values) => onFinish(values)}>
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
        <ProFormText />
      </ProForm>
    </PageContainer>
  );
};
