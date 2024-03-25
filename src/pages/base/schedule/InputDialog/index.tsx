import { ModalForm, ProForm, ProFormInstance, ProFormText } from '@ant-design/pro-components';
import { message } from 'antd';
import { useEffect, useRef } from 'react';
import { waitTime } from '@/utils/request';
import { addSchedule, updateSchedule } from '@/services/api/schedule';

interface InputDialogProps {
  detailData?: API.ScheduleDTO;
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
    const { labName, courseName, teacherName, courseTime, courseWeek, courseDay, semesterName, studentNum, contactPhone, description } = values;
    const data: API.ScheduleDTO = {
      id: props.detailData?.id,
      labName, courseName, teacherName, courseTime, courseWeek, courseDay, semesterName, studentNum, contactPhone, description,
    };

    try {
      if (props.detailData) {
        await updateSchedule(data, { throwError: true });
      } else {
        await addSchedule(data, { throwError: true });
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
      title={props.detailData ? '修改安排' : '新建安排'}
      open={props.visible}
    >
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
      <ProFormText name="description" label="备注" />
    </ModalForm>
  );
}
