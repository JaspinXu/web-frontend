import { deleteLab, listLab } from '@/services/api/lab';
import { convertPageData, orderBy } from '@/utils/request';
import { openConfirm } from '@/utils/ui';
import { PlusOutlined, DeleteOutlined, ExportOutlined } from '@ant-design/icons';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef, useState } from 'react';
import { Link } from '@umijs/max';
import InputDialog from './InputDialog';

export default () => {
  const refAction = useRef<ActionType>(null);
  const [selectedRowKeys, selectRow] = useState<number[]>([]);
  const [lab, setLab] = useState<API.LabVO>();
  const [searchProps, setSearchProps] = useState<API.LabQueryDTO>({});
  const [visible, setVisible] = useState(false);
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
      render: (dom, record) => {
        return (
          <a
            onClick={() => {
              setLab(record);
              setVisible(true);
            }}
          >
            {dom}
          </a>
        );
      },
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
      await deleteLab(selectedRowKeys);
      refAction.current?.reload();
    });
  };


  return (
    <PageContainer>
      <ProTable<API.LabVO>
        actionRef={refAction}
        rowKey="id"
        pagination={{
          defaultPageSize: 5,
        }}
        search={{
          labelWidth: 120,
        }}
        scroll={{ x: 100 }}
        request={async (params = {}, sort) => {
          const props = {
            ...params,
            orderBy: orderBy(sort),
          };
          setSearchProps(props);
          return convertPageData(await listLab(props));
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setLab(undefined);
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
        detailData={lab}
        onClose={(result) => {
          setVisible(false);
          result && refAction.current?.reload();
        }}
        visible={visible}
      />
    </PageContainer>
  );
};


