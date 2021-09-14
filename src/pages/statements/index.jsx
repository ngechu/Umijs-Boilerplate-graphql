import React, { useRef } from 'react';
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Tag, Space, Menu, Dropdown } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { useStatements } from '@/hooks/useStatements';
import NumberFormat from 'react-number-format';

const columns = [
  {
    title: 'Date',
    key: 'showTime',
    dataIndex: 'date',
    valueType: 'date',
    sorter: true,
    hideInSearch: true,
  },
  {
    title: 'Serial',
    key: 'postingSerialNumber',
    dataIndex: 'postingSerialNumber',
    valueType: 'postingSerialNumber',
    sorter: true,
    hideInSearch: true,
  },
  {
    title: 'Narrative',
    key: 'narrative',
    dataIndex: 'narrative',
    valueType: 'narrative',
    sorter: true,
    hideInSearch: true,
  },

  {
    title: 'Credit(KES)',
    key: 'credit',
    dataIndex: 'credit',
    valueType: 'credit',
    render: (_, record) => {
      return (
        <NumberFormat
          value={record?.credit}
          displayType={'text'}
          thousandSeparator={true}
          decimalScale={2}
        />
      );
    },
    sorter: true,
    hideInSearch: true,
  },
  {
    title: 'Debit(KES)',
    key: 'debit',
    dataIndex: 'debit',
    valueType: 'debit',
    render: (_, record) => {
      return (
        <NumberFormat
          value={record?.debit}
          displayType={'text'}
          thousandSeparator={true}
          decimalScale={2}
        />
      );
    },
    sorter: true,
    hideInSearch: true,
  },
  {
    title: 'Balance(KES)',
    key: 'balance',
    // dataIndex: 'balance',
    // valueType: 'balance',
    render: (_, record) => {
      return (
        <NumberFormat
          value={record?.balance}
          displayType={'text'}
          thousandSeparator={true}
          decimalScale={2}
        />
      );
    },
    sorter: true,
    hideInSearch: true,
  },

  {
    title: 'Search',
    dataIndex: 'date',
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
];

const Statements = () => {
  const actionRef = useRef();
  return (
    <PageContainer>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        request={async (params = {}, sort, filter) => {
          console.log(sort, filter);
          try {
            const data = await useStatements();
            return {
              data: data?.getAllTransaction,
              success: true,
            };
          } catch (error) {
            console.log(error);
            return {
              date: null,
              success: false,
            };
          }
        }}
        editable={{
          type: 'multiple',
        }}
        rowKey="id"
        rowSelection={{}}
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
        headerTitle="Statement of account"
        toolBarRender={() => []}
      />
    </PageContainer>
  );
};

export default Statements;
