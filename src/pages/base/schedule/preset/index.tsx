// // import { getSchedule, listFreeLab, updateSchedule } from '@/services/api/schedule';
// // import { PageContainer, ProForm, ProFormText, ProFormInstance } from '@ant-design/pro-components';
// // import { history, useSearchParams } from '@umijs/max';
// // import { message } from 'antd';
// // import { useEffect, useState, useRef } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import qs from 'qs';

// // export default () => {
// //   const [searchParams] = useSearchParams();
// //   const form = useRef<ProFormInstance>(null);
// //   const id: any = searchParams.get('id') || '';
// //   const [schedule, setSchedule] = useState<API.ScheduleDTO>();
// //   const navigate = useNavigate();

// //   const onFinish = async (values: any) => {
// //     const { courseName, teacherName, courseTime, courseWeek, courseDay, studentNum, contactPhone, description, } = values;
// //     const data: API.CheckQueryDTO = {
// //       courseName, teacherName, courseTime, courseWeek, courseDay, studentNum, contactPhone, description, 
// //     };
// //       navigate(`/base/schedule/freelab?${qs.stringify(values)}`);
// //   };

// //   return (
// //     <PageContainer>
// //       <ProForm formRef={form} onFinish={(values) => onFinish(values)}>
// //         <ProForm.Group>
// //          <ProFormText
// //           name="courseName"
// //           label="课程名称"
// //           rules={[
// //             {
// //               required: true,
// //               message: '请输入课程名称！',
// //             },
// //           ]}
// //          />
// //          <ProFormText
// //           name="teacherName"
// //           label="教师名称"
// //           rules={[
// //             {
// //               required: true,
// //               message: '请输入教师名称！',
// //             },
// //           ]}
// //          />
// //          <ProFormText
// //           name="studentNum"
// //           label="学生人数"
// //           rules={[
// //             {
// //               required: true,
// //               message: '请输入学生人数！',
// //             },
// //           ]}
// //          />
// //          <ProFormText
// //           name="contactPhone"
// //           label="联系电话"
// //           rules={[
// //             {
// //               required: true,
// //               message: '请输入联系电话！',
// //             },
// //           ]}
// //          />
// //         </ProForm.Group>
// //         <ProForm.Group>
// //          <ProFormText
// //           name="courseTime"
// //           label="节次"
// //           rules={[
// //             {
// //               required: true,
// //               message: '请输入节次！',
// //             },
// //           ]}
// //          />
// //          <ProFormText
// //           name="courseWeek"
// //           label="周次"
// //           rules={[
// //             {
// //               required: true,
// //               message: '请输入周次！',
// //             },
// //           ]}
// //          />
// //          <ProFormText
// //           name="courseDay"
// //           label="星期"
// //           rules={[
// //             {
// //               required: true,
// //               message: '请输入星期！',
// //             },
// //           ]}
// //          />
// //         </ProForm.Group>
// //       <ProFormText name="description" label="备注" />
// //       </ProForm>
// //     </PageContainer>
// //   );
// // };

// import { deleteSchedule, listFreeLab, listSchedule } from '@/services/api/schedule';
// import { convertPageData, orderBy, waitTime } from '@/utils/request';
// import { openConfirm } from '@/utils/ui';
// import { PlusOutlined, DeleteOutlined, ExportOutlined } from '@ant-design/icons';
// import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
// import { Button } from 'antd';
// import { useRef, useState } from 'react';
// import { downloadFile } from '@/utils/download-utils';
// import { Link } from '@umijs/max';
// import { useNavigate } from 'react-router-dom';

// export default () => {
//   const refAction = useRef<ActionType>(null);
//   const [selectedRowKeys, selectRow] = useState<number[]>([]);
//   const [importVisible, setImportVisible] = useState(false);
//   const [freelab, setFreeLab] = useState<API.LabVO>();
//   const [searchProps, setSearchProps] = useState<API.CheckQueryDTO>({});
//   const [visible, setVisible] = useState(false);
//   const [downloading, setDownloading] = useState(false);
//   const navigate = useNavigate()
//   const columns: ProColumns<API.LabVO>[] = [
//     {
//       title: '课程名称',
//       dataIndex: 'courseName',
//       width: 100,
//     },
//     {
//         title: '教师名称',
//         dataIndex: 'teacherName',
//         width: 100,
//     },
//     {
//         title: '节次',
//         dataIndex: 'courseTime',
//         width: 100,
//     },
//     {
//         title: '周次',
//         dataIndex: 'courseWeek',
//         width: 100,
//     },
//     {
//         title: '星期',
//         dataIndex: 'courseDay',
//         width: 100,
//     },
//     {
//         title: '学生人数',
//         dataIndex: 'studentNum',
//         width: 100,
//     },
//     {
//         title: '联系电话',
//         dataIndex: 'contactPhone',
//         width: 100,
//     },
//     {
//       title: '备注',
//       dataIndex: 'description',
//     },
//   ];

//   const handleDelete = async () => {
//     if (!selectedRowKeys?.length) return;
//     openConfirm(`您确定删除${selectedRowKeys.length}条记录吗`, async () => {
//       await deleteSchedule(selectedRowKeys);
//       refAction.current?.reload();
//     });
//   };


//   return (
//     <PageContainer>
//       <ProTable<API.LabVO>
//         actionRef={refAction}
//         rowKey="id"
//         request={async (params = {}, sort) => {
//           const props = {
//             ...params,
//             orderBy: orderBy(sort),
//           };
//           setSearchProps(props);
//           return convertPageData(await listFreeLab(props));
//         }}
//         columns={columns}
//       />
//     </PageContainer>
//   );
// };

import React, { useState, useEffect } from 'react';  
import { Button } from 'antd';  
import axios from 'axios'; // 假设您使用axios作为HTTP客户端  
import CheckQueryForm from './CheckQueryForm';  
  
interface ResultItem {  
  id: number;  
  name: string;  
  // 其他字段...  
}  
  
const ParentComponent: React.FC = () => {  
  const [visible, setVisible] = useState(false);  
  const [results, setResults] = useState<ResultItem[]>([]);  
  const [selectedIds, setSelectedIds] = useState<number[]>([]);  
  
  const handleSubmit = async (values: any) => {  
    try {  
      const response = await axios.post('/api/schedule/listFreeLab', values);  
      setResults(response.data); // 假设后端返回的数据是数组格式  
    } catch (error) {  
      console.error('Error fetching results:', error);  
    } finally {  
      setVisible(false); // 关闭弹出窗口  
    }  
  };  
  
  const handleCheckboxChange = (id: number, checked: boolean) => {  
    if (checked) {  
      setSelectedIds([...selectedIds, id]);  
    } else {  
      setSelectedIds(selectedIds.filter((itemId) => itemId !== id));  
    }  
  };  
  
  const handleSave = async () => {  
    // 准备要提交的数据，可能包括selectedIds和其他新数据  
    const saveData = {  
      selectedIds,  
      // 其他新数据...  
    };  
  
    try {  
      const response = await axios.post('/api/schedule/save', saveData);  
      // 处理保存成功后的逻辑，比如关闭结果窗口等  
    } catch (error) {  
      console.error('Error saving data:', error);  
    }  
  };  
  
  // 假设您有一个展示结果的组件  
  const ResultList = () => {  
    return (  
      <div>  
        {results.map((item) => (  
          <div key={item.id}>  
            <input  
              type="checkbox"  
              checked={selectedIds.includes(item.id)}  
              onChange={(e) => handleCheckboxChange(item.id, e.target.checked)}  
            />  
            {item.name}  
          </div>  
        ))}  
        <Button type="primary" onClick={handleSave}>  
          保存  
        </Button>  
      </div>  
    );  
  };  
  
  return (  
    <div>  
      <Button
type="primary" onClick={() => setVisible(true)}>
打开查询窗口
</Button>
<CheckQueryForm visible={visible} onFinish={handleSubmit} onCancel={() => setVisible(false)} />
{results.length > 0 && <ResultList />}
</div>
);
};

export default ParentComponent;

