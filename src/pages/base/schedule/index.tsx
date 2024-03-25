import { deleteSchedule, listSchedule } from '@/services/api/schedule';
import { convertPageData, orderBy, waitTime } from '@/utils/request';
import { openConfirm } from '@/utils/ui';
import { PlusOutlined, DeleteOutlined, ExportOutlined } from '@ant-design/icons';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef, useState } from 'react';
import InputDialog from './InputDialog';
import { downloadFile } from '@/utils/download-utils';
import { Link } from '@umijs/max';

export default () => {
  const refAction = useRef<ActionType>(null);
  const [selectedRowKeys, selectRow] = useState<number[]>([]);
  const [importVisible, setImportVisible] = useState(false);
  const [schedule, setSchedule] = useState<API.ScheduleVO>();
  const [searchProps, setSearchProps] = useState<API.ScheduleQueryDTO>({});
  const [visible, setVisible] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const columns: ProColumns<API.ScheduleVO>[] = [
    {
      title: '实验安排ID',
      dataIndex: 'id',
      width: 100,
      search: false,
    },
    {
      title: '实验室名称',
      dataIndex: 'labName',
      width: 100,
      render: (dom, record) => {
        return (
          <a
            onClick={() => {
              setSchedule(record);
              setVisible(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: '课程名称',
      dataIndex: 'courseName',
      width: 100,
      search: false,
    },
    {
        title: '教师名称',
        dataIndex: 'teacherName',
        width: 100,
        search: false,
    },
    {
        title: '节次',
        dataIndex: 'courseTime',
        width: 100,
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
        width: 100,
        search: false,
    },
    {
        title: '学期名',
        dataIndex: 'semesterName',
        width: 100,
        search: false,
    },
    {
        title: '学生人数',
        dataIndex: 'studentNum',
        width: 100,
        search: false,
    },
    {
        title: '联系电话',
        dataIndex: 'contactPhone',
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
    {
      title: '操作',
      width: 100,
      fixed: 'right',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [<Link to={`detail?id=${record.id}`}>修改</Link>],
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
            <PlusOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} /> 新建
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
