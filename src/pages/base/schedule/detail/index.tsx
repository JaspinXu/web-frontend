import { getSchedule, updateSchedule } from '@/services/api/schedule';
import { PageContainer, ProForm, ProFormText, ProFormInstance } from '@ant-design/pro-components';
import { history, useSearchParams } from '@umijs/max';
import { message } from 'antd';
import { useEffect, useState, useRef } from 'react';


export default () => {
  const [searchParams] = useSearchParams();
  const form = useRef<ProFormInstance>(null);
  const id: any = searchParams.get('id') || '';
  const [schedule, setSchedule] = useState<API.ScheduleDTO>();

  useEffect(() => {
    getSchedule({ id }).then((result) => {
      setSchedule(result || {});
      form?.current?.setFieldsValue(result);
    });
  }, []);
  const onFinish = async (values: any) => {
    const { labName, courseName, teacherName, courseTime, courseWeek, courseDay, semesterName, studentNum, contactPhone, description, } = values;
    const data: API.ScheduleDTO = {
      id, labName, courseName, teacherName, courseTime, courseWeek, courseDay, semesterName, studentNum, contactPhone, description, 
    };

    try {
      await updateSchedule(data, { throwError: true });
      message.success('保存成功');
      history.push('/base/schedule');
    } catch (ex) {
      return true;
    }
    return true;
  };
  return (
    <PageContainer>
    <ProForm formRef={form} onFinish={(values) => onFinish(values)}>
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
          name="semesterName"
          label="学期名"
          rules={[
            {
              required: true,
              message: '请输入学期名！',
            },
          ]}
      />
      <ProFormText
          name="studentNum"
          label="学生人数"
          rules={[
            {
              required: true,
              message: '请输入学生人数！',
            },
          ]}
      />
    </ProForm.Group>
    <ProForm.Group>
      <ProFormText
          name="courseName"
          label="课程名称"
          rules={[
            {
              required: true,
              message: '请输入课程名称！',
            },
          ]}
      />
      <ProFormText
          name="teacherName"
          label="教师名称"
          rules={[
            {
              required: true,
              message: '请输入教师名称！',
            },
          ]}
      />
      <ProFormText
          name="contactPhone"
          label="联系电话"
          rules={[
            {
              required: true,
              message: '请输入联系电话！',
            },
          ]}
      />
    </ProForm.Group>
    <ProForm.Group>  
      <ProFormText
          name="courseTime"
          label="节次"
          rules={[
            {
              required: true,
              message: '请输入节次！',
            },
          ]}
      />
      <ProFormText
          name="courseWeek"
          label="周次"
          rules={[
            {
              required: true,
              message: '请输入周次！',
            },
          ]}
      />
      <ProFormText
          name="courseDay"
          label="星期"
          rules={[
            {
              required: true,
              message: '请输入星期！',
            },
          ]}
      />
    </ProForm.Group>
    <ProFormText name="description" label="备注" width={660}/>
    </ProForm>
    </PageContainer>
  );
};
