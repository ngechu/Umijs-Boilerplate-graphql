import React, { useRef } from 'react';
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Tag, Space, Menu, Dropdown } from 'antd';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import request from 'umi-request';
import { PageContainer } from '@ant-design/pro-layout';

const columns = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: 'Table Header',
    dataIndex: 'title',
    copyable: true,
    ellipsis: true,
    tip: '标题过长会自动收缩',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: 'Bugs',
    dataIndex: 'state',
    filters: true,
    onFilter: true,
    valueType: 'select',
    valueEnum: {
      all: { text: '全部', status: 'Default' },
      open: {
        text: 'Bug Fix',
        status: 'Error',
      },
      closed: {
        text: '已解决',
        status: 'Success',
        disabled: true,
      },
      processing: {
        text: '解决中',
        status: 'Processing',
      },
    },
  },
  {
    title: 'Type',
    dataIndex: 'labels',
    search: false,
    renderFormItem: (_, { defaultRender }) => {
      return defaultRender(_);
    },
    render: (_, record) => (
      <Space>
        {record.labels.map(({ name, color }) => (
          <Tag color={color} key={name}>
            {name}
          </Tag>
        ))}
      </Space>
    ),
  },
  {
    title: 'Date',
    key: 'showTime',
    dataIndex: 'created_at',
    valueType: 'date',
    sorter: true,
    hideInSearch: true,
  },
  {
    title: 'Time',
    dataIndex: 'created_at',
    valueType: 'dateRange',
    hideInTable: true,
    search: {
      transform: (value) => {
        return {
          startTime: value[0],
          endTime: value[1],
        };
      },
    },
  },
  {
    title: 'option',
    valueType: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          let _a;
          (_a = action === null || action === void 0 ? void 0 : action.startEditable) === null ||
          _a === void 0
            ? void 0
            : _a.call(action, record.id);
        }}
      >
        Edit
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        Check
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => (action === null || action === void 0 ? void 0 : action.reload())}
        menus={[
          { key: 'copy', name: 'copy' },
          { key: 'delete', name: 'delete' },
        ]}
      />,
    ],
  },
];

export default () => {
  const actionRef = useRef();
  return (
    <PageContainer>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        request={async (params = {}, sort, filter) => {
          console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', sort, filter);
          return request(
            'https://proapi.azurewebsites.net/github/issues',
            {
              params,
            },
            filter,
            sort,
          );
        }}
        editable={{
          type: 'multiple',
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        form={{
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return { ...values, created_at: [values.startTime, values.endTime] };
            }
            return values;
          },
        }}
        pagination={{
          pageSize: 10,
        }}
        dateFormatter="string"
        headerTitle="Advanced Form"
        // toolBarRender={() => [
        //   <Button key="button" icon={<PlusOutlined />} type="primary">
        //     ToolBar
        //   </Button>,
        // ]}
      />
    </PageContainer>
  );
};
