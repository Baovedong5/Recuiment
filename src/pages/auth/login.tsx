import { callLogin } from "@/config/api";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setUserLoginInfo } from "@/redux/slice/accountSlice";
import { Button, Divider, Form, Input, message, notification } from "antd";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import style from "styles/auth.module.scss";

interface IValues {
  username: string;
  password: string;
}

const LoginPage = () => {
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(
    (state) => state.account.isAuthenticated
  );

  let location = useLocation();
  let params = new URLSearchParams(location.search);
  const callback = params?.get("callback");

  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = "/";
    }
  }, []);

  const onFinish = async (values: IValues) => {
    const { username, password } = values;
    setIsSubmit(true);
    const res = await callLogin(username, password);
    setIsSubmit(false);
    if (res?.data?.data) {
      localStorage.setItem(
        "access_token",
        res.data.data?.access_token as string
      );
      dispatch(setUserLoginInfo(res.data.data?.user));
      message.success("Đăng nhập thành công");
      window.location.href = callback ? callback : "/";
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description:
          res.data.message && Array.isArray(res.data.message)
            ? res.data.message[0]
            : res.data.message,
        duration: 5,
      });
    }
  };

  return (
    <div className={style["login-page"]}>
      <main className={style.main}>
        <div className={style.container}>
          <section className={style.wrapper}>
            <div>
              <h2 className={`${style.text} ${style["text-large"]}`}>
                Đăng Nhập
              </h2>
              <Divider />
            </div>

            <Form name="basic" onFinish={onFinish} autoComplete="off">
              <Form.Item
                labelCol={{ span: 24 }}
                label="Email"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Email không được để trống",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Mật khẩu"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Mật khẩu không được để trống",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={isSubmit}>
                  Đăng nhập
                </Button>
              </Form.Item>
              <Divider>Or</Divider>
              <p className={`${style.text} ${style["text-normal"]}`}>
                Chưa có tài khoản ?
                <span style={{ marginLeft: "0.8rem" }}>
                  <Link to="/register">Đăng Ký</Link>
                </span>
              </p>
            </Form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
