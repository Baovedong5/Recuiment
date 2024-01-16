import { callRegister } from "@/config/api";
import {
  Button,
  Divider,
  Form,
  Input,
  Select,
  message,
  notification,
} from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "styles/auth.module.scss";
const { Option } = Select;

const RegisterPage = () => {
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const navigate = useNavigate();

  const onFinish = async (values: IUser) => {
    const { name, email, password, age, gender, address } = values;
    setIsSubmit(true);
    const res = await callRegister(
      name,
      email,
      password,
      +age,
      gender,
      address
    );
    setIsSubmit(false);
    if (res?.data?.data?._id) {
      message.success("Đăng ký tài khoản thành công !");
      navigate("/");
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
    <div className={style["register-page"]}>
      <main className={style.main}>
        <div className={style.container}>
          <section className={style.wrapper}>
            <div>
              <h2 className={`${style.text} ${style["text-large"]}`}>
                Đăng Ký Tài Khoản
              </h2>
              <Divider />
            </div>

            <Form name="basic" onFinish={onFinish} autoComplete="off">
              <Form.Item
                labelCol={{ span: 24 }}
                label="Họ tên"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Họ tên không được để trống",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Email"
                name="email"
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
              <Form.Item
                labelCol={{ span: 24 }}
                label="Tuổi"
                name="age"
                rules={[
                  {
                    required: true,
                    message: "Tuổi không được để trống",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Giới tính"
                name="gender"
                rules={[
                  {
                    required: true,
                    message: "Giới tính không được để trống",
                  },
                ]}
              >
                <Select allowClear>
                  <Option value="male">Nam</Option>
                  <Option value="female">Nữ</Option>
                  <Option value="other">Khác</Option>
                </Select>
              </Form.Item>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Địa chỉ"
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Địa chỉ không được để trống",
                  },
                ]}
              >
                <Input />
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
                  <Link to="/register">Đăng ký</Link>
                </span>
              </p>
            </Form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;
