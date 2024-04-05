import { deleteSchedule, listSchedule } from '@/services/api/schedule';
import { convertPageData, orderBy, waitTime } from '@/utils/request';
import { openConfirm } from '@/utils/ui';
import { PlusOutlined, DeleteOutlined, ExportOutlined } from '@ant-design/icons';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import React,{ useRef, useState } from 'react';
import InputDialog from './InputDialog';
import { downloadFile } from '@/utils/download-utils';
import { Link } from '@umijs/max';

export default () => {
  const refAction = useRef<ActionType>(null);
  const [selectedRowKeys, selectRow] = useState<number[]>([]);
  const [schedule, setSchedule] = useState<API.ScheduleVO>();
  const [searchProps, setSearchProps] = useState<API.ScheduleQueryDTO>({});
  const [visible, setVisible] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const columns: ProColumns<API.ScheduleVO>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 50,
      search: false,
    },
    {
      title: '实验室',
      dataIndex: 'labName',
      width: 100,
      search: false,
    },
    {
      title: '课程',
      dataIndex: 'courseName',
      width: 150,
    },
    {
        title: '教师',
        dataIndex: 'teacherName',
        width: 100,
    },
    {
        title: '节次',
        dataIndex: 'courseTime',
        width: 80,
        search: false,
    },
    {
        title: '周次',
        dataIndex: 'courseWeek',
        width: 100,
        search: false,
    },
    {
        title: '星期',
        dataIndex: 'courseDay',
        width: 50,
        search: false,
    },
    {
        title: '学期',
        dataIndex: 'semesterName',
        width: 60,
        search: false,
    },
    {
        title: '人数',
        dataIndex: 'studentNum',
        width: 50,
        search: false,
    },
    {
        title: '电话',
        dataIndex: 'contactPhone',
        width: 100,
        search: false,
    },
    {
      title: '操作',
      width: 50,
      fixed: 'right',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [<Link to={`detail?id=${record.id}`}>详情</Link>],
    },
  ];

  const handleDelete = async () => {
    if (!selectedRowKeys?.length) return;
    openConfirm(`您确定删除${selectedRowKeys.length}条记录吗`, async () => {
      await deleteSchedule(selectedRowKeys);
      refAction.current?.reload();
    });
  };

  const handleExport = () => {
    setDownloading(true);
    downloadFile(`/api/schedule/exportSchedule`, searchProps, '实验安排导出表.xls').then(() => {
      waitTime(1000).then(() => setDownloading(false));
    });
  };

  return (
    <PageContainer>
      <ProTable<API.ScheduleVO>
        actionRef={refAction}
        rowKey="id"
        pagination={{
          defaultPageSize: 10,
        }}
        search={{
          labelWidth: 120,
        }}
        request={async (params = {}, sort) => {
          const props = {
            ...params,
            orderBy: orderBy(sort),
          };
          setSearchProps(props);
          return convertPageData(await listSchedule(props));
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setSchedule(undefined);
              setVisible(true);
            }}
          >
            <PlusOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} /> 非校验手动新建
          </Button>,
          <Button
            type="primary"
            key="primary"
            danger
            onClick={handleDelete}
            disabled={!selectedRowKeys?.length}
          >
            <DeleteOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} /> 删除
          </Button>,
          <Button type="default" onClick={handleExport} loading={downloading}>
            <ExportOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} /> 导出
          </Button>,
        ]}
        columns={columns}
        rowSelection={{
          onChange: (rowKeys) => {
            selectRow(rowKeys as number[]);
          },
        }}
      />
      <InputDialog
        detailData={schedule}
        onClose={(result: any) => {
          setVisible(false);
          result && refAction.current?.reload();
        }}
        visible={visible}
      />
    </PageContainer>
  );
};
