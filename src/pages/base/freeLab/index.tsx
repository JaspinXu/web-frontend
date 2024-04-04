import { addScheduleAuto, deleteSchedule, listFreeLab, listSchedule } from '@/services/api/schedule';
import { convertPageData, orderBy, waitTime } from '@/utils/request';
import { openConfirm } from '@/utils/ui';
import { PlusOutlined, DeleteOutlined, ExportOutlined } from '@ant-design/icons';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { Modal, Button, Form, Input } from 'antd';
import { isNull } from 'lodash';
import React,{ useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default () => {
  const refAction = useRef<ActionType>(null);
  const [selectedRowKeys, selectRow] = useState<number[]>([]);
  const [importVisible, setImportVisible] = useState(false);
  const [lab, setLab] = useState<API.LabVO>();
  const [searchProps, setSearchProps] = useState<API.CheckQueryDTO>({});
  const [searchParams, setSearchParams] = useState<API.CheckQueryDTO>({});
  const [visible, setVisible] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const navigate = useNavigate();

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
      width: 100,
      search: false,
    },
    {
      title: '实验室编码',
      dataIndex: 'labCode',
      width: 100,
      search: false,
    },
    {
      title: '占据状态',
      dataIndex: 'occupy',
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
    {
      title: '创建人',
      dataIndex: 'createdByDesc',
      width: 100,
      search: false,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      width: 150,
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
      await addScheduleAuto(saveProps);
    });
  };


  return (
    <PageContainer>
      <Form onFinish={handleSearch}>  
      <Form.Item name="courseName" label="课程名称">  
        <Input />  
      </Form.Item>  
      <Form.Item name="teacherName" label="教师名称">  
        <Input />  
      </Form.Item>
      <Form.Item name="courseTime" label="节次">  
        <Input />  
      </Form.Item>
      <Form.Item name="courseWeek" label="周次">  
        <Input />  
      </Form.Item>
      <Form.Item name="courseDay" label="星期">  
        <Input />  
      </Form.Item>
      <Form.Item name="studentNum" label="学生人数">  
        <Input />  
      </Form.Item>
      <Form.Item name="contactPhone" label="联系电话">  
        <Input />  
      </Form.Item>
      <Form.Item>  
        <Button type="primary" htmlType="submit">  
          提交  
        </Button>  
      </Form.Item>  
    </Form>
      <ProTable<API.LabVO>
        actionRef={refAction}
        rowKey="id"
        pagination={{
          defaultPageSize: 10,
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



