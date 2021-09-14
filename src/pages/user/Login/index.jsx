import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { message } from 'antd';
import React, { useState, useEffect } from 'react';
import ProForm, { ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { useIntl, Link, history, FormattedMessage, SelectLang, useModel } from 'umi';
import Footer from '@/components/Footer';
import styles from './index.less';
import { useLogin } from '@/hooks/useLogin';

const Login = () => {
  const intl = useIntl();

  const handleLogin = useLogin();

  return (
    <div className={styles.container}>
      <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang />}
      </div>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src="/gcom.svg" />
            </Link>
          </div>
        </div>

        <div className={styles.main}>
          <ProForm
            initialValues={{
              autoLogin: true,
            }}
            submitter={{
              searchConfig: {
                submitText: intl.formatMessage({
                  id: 'pages.login.submit',
                  defaultMessage: 'Submit',
                }),
              },
              render: (_, dom) => dom.pop(),
              submitButtonProps: {
                loading: handleLogin.isLoading,
                size: 'large',
                style: {
                  width: '100%',
                },
              },
            }}
            onFinish={async (values) => {
              //handleSubmit(values);
              handleLogin.mutate(values);
            }}
          >
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.username.placeholder',
                  defaultMessage: 'admin or user',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage id="pages.login.username.required" defaultMessage="" />
                    ),
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.password.placeholder',
                  defaultMessage: '密码: ant.design',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.password.required"
                        defaultMessage="Password required"
                      />
                    ),
                  },
                ]}
              />
            </>

            <div
              style={{
                marginBottom: 24,
              }}
            >
              {/* <ProFormCheckbox noStyle name="autoLogin">
                <FormattedMessage id="pages.login.rememberMe" defaultMessage="" />
              </ProFormCheckbox> */}
            </div>
          </ProForm>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
