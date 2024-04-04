import { addScheduleAuto, listFreeLab, } from '@/services/api/schedule';
import { convertPageData, } from '@/utils/request';
import { openConfirm } from '@/utils/ui';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, Form, Input, Row, Col, Space, message, Card } from 'antd';
import React,{ useRef, useState } from 'react';

export default () => {
  const refAction = useRef<ActionType>(null);
  const [selectedRowKeys, selectRow] = useState<number[]>([]);
  const defaultCheck: API.CheckQueryDTO ={
      courseTime: "Xu",
      courseWeek: "Zhao",
      courseDay: "Bin",
  };
  const [searchParams, setSearchParams] = useState<API.CheckQueryDTO>(defaultCheck);

  const handleSearch = (newSearchParams: API.CheckQueryDTO) => {  
    setSearchParams(newSearchParams);  
    refAction.current?.reload();
  };
  const fetchData = async (params: API.CheckQueryDTO) => {     
      const response = await listFreeLab(params);   
      return convertPageData(response); 
  };
  const columns: ProColumns<API.LabVO>[] = [
    {
      title: '实验室ID',
      dataIndex: 'id',
      width: 100,
      search: false,
    },
    {
      title: '实验室名称',
      dataIndex: 'labName',
      width: 200,
      search: false,
    },
    {
      title: '实验室编码',
      dataIndex: 'labCode',
      width: 100,
      search: false,
    },
    {
      title: '实验容量',
      dataIndex: 'studentMax',
      width: 100,
      search: false,
    },
    {
      title: '备注',
      dataIndex: 'description',
      search: false,
    },
  ];


  const toSave = async () => {
    if (!selectedRowKeys?.length) return;
    openConfirm(`您确定创建${selectedRowKeys.length}条新安排吗`, async () => {
    const searchKeys: API.SelectedKeysDTO = {
      selectedFreeLabKeys: selectedRowKeys
    };
    const saveProps: { queryDTO?: API.CheckQueryDTO | undefined; keysDTO?: API.SelectedKeysDTO | undefined; } = {  
      queryDTO: searchParams, 
      keysDTO: searchKeys,
    }
    try {
        await addScheduleAuto(saveProps, { throwError: true });
    } catch (ex) {}
    message.success('保存成功,请前往实验安排管理部分查看!');
    });
  };


  return (
    <PageContainer>
    <Card style={{  
      marginBottom: 20,
    }}>
      <Form  onFinish={handleSearch}>  
      <Row>
      <Col>
      <Space size={20}>
      <Form.Item name="courseName" label="课程名称">  
        <Input />  
      </Form.Item> 
      <Form.Item name="teacherName" label="教师名称">  
        <Input />  
      </Form.Item>
      <Form.Item name="studentNum" label="学生人数">  
        <Input />  
      </Form.Item>
      <Form.Item name="contactPhone" label="联系电话">  
        <Input />  
      </Form.Item>
      </Space> 
      </Col>
      </Row>
      <Row>
      <Space size={28}>
      <Form.Item>
      </Form.Item>
      <Form.Item>
      </Form.Item>
      </Space>
      <Space size={48}>
      <Form.Item name="courseTime" label="节次">  
        <Input />  
      </Form.Item>
      <Form.Item name="courseWeek" label="周次">  
        <Input />  
      </Form.Item>
      <Form.Item name="courseDay" label="星期">  
        <Input />  
      </Form.Item>
      <Form.Item name="description" label="备注">  
        <Input />  
      </Form.Item>
      </Space>
      <Space size={926}>
      <Form.Item>
      </Form.Item>
      <Form.Item>
      </Form.Item>
      </Space>
      <Space size={10}>
      <Form.Item>  
        <Button danger type="default" htmlType="reset">  
          重置  
        </Button>  
      </Form.Item>
      <Form.Item>  
        <Button type="primary" htmlType="submit">  
          提交  
        </Button>  
      </Form.Item>
      </Space>
      </Row> 
    </Form>
    </Card>
      <ProTable<API.LabVO>
        actionRef={refAction}
        rowKey="id"
        pagination={{
          defaultPageSize: 20,
        }}
        search={false}
        request={async (params) => {  
          const combinedParams = { ...searchParams, ...params };  
          return fetchData(combinedParams);  
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={toSave}
            disabled={!selectedRowKeys?.length}
          >
             保存
          </Button>,
        ]}
        columns={columns}
        rowSelection={{
          onChange: (rowKeys) => {
            selectRow(rowKeys as number[]);
          },
        }}
      />
    </PageContainer>
  );
};



