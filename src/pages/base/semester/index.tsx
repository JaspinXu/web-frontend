import { deleteSemester, listSemester } from '@/services/api/semester';
import { convertPageData, orderBy } from '@/utils/request';
import { openConfirm } from '@/utils/ui';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef, useState } from 'react';
import { Link } from '@umijs/max';
import InputDialog from './InputDialog';

export default () => {
  const refAction = useRef<ActionType>(null);
  const [selectedRowKeys, selectRow] = useState<number[]>([]);
  const [semester, setSemester] = useState<API.SemesterVO>();
  const [searchProps, setSearchProps] = useState<API.SemesterQueryDTO>({});
  const [visible, setVisible] = useState(false);
  const columns: ProColumns<API.SemesterVO>[] = [
    {
      title: '学期ID',
      dataIndex: 'id',
      width: 100,
      search: false,
    },
    {
      title: '学期名',
      dataIndex: 'semesterName',
      width: 100,
      render: (dom, record) => {
        return (
          <a
            onClick={() => {
              setSemester(record);
              setVisible(true);
            }}
          >
            {dom}
          </a>
        );
      },
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
      await deleteSemester(selectedRowKeys);
      refAction.current?.reload();
    });
  };


  return (
    <PageContainer>
      <ProTable<API.SemesterVO>
        actionRef={refAction}
        rowKey="id"
        pagination={{
          defaultPageSize: 5,
        }}
        request={async (params = {}, sort) => {
          const props = {
            ...params,
            orderBy: orderBy(sort),
          };
          setSearchProps(props);
          return convertPageData(await listSemester(props));
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setSemester(undefined);
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
        ]}
        columns={columns}
        rowSelection={{
          onChange: (rowKeys) => {
            selectRow(rowKeys as number[]);
          },
        }}
      />
      <InputDialog
        detailData={semester}
        onClose={(result) => {
          setVisible(false);
          result && refAction.current?.reload();
        }}
        visible={visible}
      />
    </PageContainer>
  );
};


