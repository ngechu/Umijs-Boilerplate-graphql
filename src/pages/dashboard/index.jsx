import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography, Row, Col, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { TinyArea, TinyColumn, Progress } from '@ant-design/charts';
import { useIntl, FormattedMessage } from 'umi';
import NumberFormat from 'react-number-format';
import { DualAxes, Line, Pie } from '@ant-design/charts';
import { useDashboardCards } from '@/hooks/dashboardHooks/useDashboardCards';
import moment from 'moment';

const { Meta } = Card;

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 8,
  xl: 8,
  style: {
    marginBottom: 24,
  },
};
const cards = {
  fontSize: 'clamp(2rem, calc(12vw), 3vw)',
  display: 'flex',
  gap: '.4vw',
  boxSizing: 'border-box',
  overflow: 'hidden',
};

export default () => {
  //Dashboard cards data
  const { isLoading, data } = useDashboardCards();
  console.log(data);

  const lineConfig = {
    data: data?.getAllOrderSummary,
    xField: 'date',
    yField: 'totalAmount',
    seriesField: 'status',
    xAxis: { type: 'time' },
    yAxis: {
      label: {
        formatter: function formatter(v) {
          return ''.concat(v).replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
            return ''.concat(s, ',');
          });
        },
      },
    },
  };
  const intl = useIntl();
  const formattedDateData = data?.getAllJournalSummary.map((e) => ({
    ...e,
    date: moment(e.date).format('YYYY-MM-DD'),
  }));
  const config = {
    data: [formattedDateData, formattedDateData],
    xField: 'date',
    yField: ['credit', 'debit'],
    geometryOptions: [
      { geometry: 'column' },
      {
        geometry: 'line',
        lineStyle: { lineWidth: 2 },
      },
    ],
  };

  /// pie charts

  const pieConfig = {
    appendPadding: 10,
    data: data?.getAllOrderSummaryByCountry,
    angleField: 'totalCount',
    colorField: 'country',
    radius: 0.75,
    label: {
      type: 'spider',
      labelHeight: 28,
      content: '{name}\n{percentage}',
    },
    interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
  };
  return (
    <>
      <Row justify="space-between" gutter={24}>
        <Col {...topColResponsiveProps}>
          <Card
            extra={
              <Tooltip title="Total balance over some time">
                <InfoCircleOutlined />
              </Tooltip>
            }
            loading={isLoading}
          >
            <Meta title="Balance" />

            <h2 style={{ ...cards }}>
              <strong>KES </strong>

              <NumberFormat
                value={data?.getTotalJournalSummary[0]?.balance}
                displayType={'text'}
                thousandSeparator={true}
                decimalScale={2}
              />
            </h2>
          </Card>
        </Col>

        <Col {...topColResponsiveProps}>
          <Card
            extra={
              <Tooltip title="Total debit over some time">
                <InfoCircleOutlined />
              </Tooltip>
            }
            loading={isLoading}
          >
            <Meta title="Total Debit" />

            <h2 style={{ ...cards }}>
              <strong>KES </strong>

              <NumberFormat
                value={data?.getTotalJournalSummary[0]?.debit}
                displayType={'text'}
                thousandSeparator={true}
                decimalScale={2}
              />
            </h2>
          </Card>
        </Col>
        <Col {...topColResponsiveProps}>
          <Card
            extra={
              <Tooltip title="Total credit over some time">
                <InfoCircleOutlined />
              </Tooltip>
            }
            loading={isLoading}
          >
            <Meta title="Total Credit" />

            <h2 style={{ ...cards }}>
              <strong>KES </strong>

              <NumberFormat
                value={data?.getTotalJournalSummary[0]?.credit}
                displayType={'text'}
                thousandSeparator={true}
                decimalScale={2}
              />
            </h2>
          </Card>
        </Col>
      </Row>
      <Row justify="space-between" gutter={[8, 8]}>
        {' '}
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <Card title="Order by Date and Status" loading={isLoading}>
            {' '}
            <Line {...lineConfig} />
          </Card>{' '}
        </Col>{' '}
        <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
          <Card title="Balance" loading={isLoading}>
            {' '}
            <DualAxes {...config} />
          </Card>
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <Card title="Summary" loading={isLoading}>
            {' '}
            <Pie {...pieConfig} />
          </Card>
        </Col>
      </Row>
    </>
  );
};
