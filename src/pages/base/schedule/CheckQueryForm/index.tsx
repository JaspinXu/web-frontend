/*
 * @Author: JaspinXu sea.xuo@gmail.com
 * @Date: 2024-03-29 22:34:26
 * @LastEditors: JaspinXu sea.xuo@gmail.com
 * @LastEditTime: 2024-03-29 22:41:17
 * @FilePath: \web-frontend\src\pages\base\schedule\CheckQueryForm\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState } from 'react';  
import { Modal, Form, Input, Button } from 'antd';  
  
interface CheckQueryFormProps {  
  visible: boolean;  
  onFinish: (values: any) => void;  
  onCancel: () => void;  
}  
  
const CheckQueryForm: React.FC<CheckQueryFormProps> = ({ visible, onFinish, onCancel }) => {  
  const [form] = Form.useForm();  
  
  const handleFinish = (values: any) => {  
    onFinish(values);  
  };  
  
  return (  
    <Modal  
      title="预置安排"  
      visible={visible}  
      onCancel={onCancel}  
      footer={null}  
    >  
      <Form form={form} onFinish={handleFinish}>  
        <Form.Item name="courseName" label="课程名称" rules={[{ required: true }]}>  
          <Input />  
        </Form.Item>  
        <Form.Item name="teacherName" label="教师名称" rules={[{ required: true }]}>  
          <Input />  
        </Form.Item> 
        <Form.Item name="courseTime" label="节次" rules={[{ required: true }]}>  
          <Input />  
        </Form.Item> 
        <Form.Item name="courseWeek" label="周次" rules={[{ required: true }]}>  
          <Input />  
        </Form.Item> 
        <Form.Item name="courseDay" label="星期" rules={[{ required: true }]}>  
          <Input />  
        </Form.Item> 
        <Form.Item name="studentNum" label="学生人数" rules={[{ required: true }]}>  
          <Input />  
        </Form.Item>  
        <Form.Item name="contactPhone" label="联系电话" rules={[{ required: true }]}>  
          <Input />  
        </Form.Item> 
        <Form.Item name="description" label="备注" rules={[{ required: true }]}>  
          <Input />  
        </Form.Item> 
        <Form.Item>  
          <Button type="primary" htmlType="submit">  
            提交  
          </Button>  
        </Form.Item>  
      </Form>  
    </Modal>  
  );  
};  
  
export default CheckQueryForm;