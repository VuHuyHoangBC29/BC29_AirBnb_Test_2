import { Button, Checkbox, Form, Input, DatePicker, Select } from "antd";
import type { DatePickerProps } from "antd";
import React, { useEffect, useState } from "react";
import "./user-form.scss";
// import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  fetchUserDetailedInfoAction,
  updateUserAction,
} from "../../store/reducers/userDetailsReducer";
import moment from "moment";
import { UserGender } from "../../enums/user";
import { createUserAction } from "../../store/reducers/usersListReducer";

export default function UserForm(): JSX.Element {
  const { Option } = Select;

  const navigate = useNavigate();

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const handleChangeOne = (value: string) => {
    console.log(`selected ${value}`);
  };
  const handleChangeTwo = (value: string) => {
    console.log(`selected ${value}`);
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
      lg: { span: 16 },
      xl: { span: 12 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 0,
      },
    },
  };

  const [form] = Form.useForm();

  const params: any = useParams();

  const [state, setState] = useState();

  console.log(params.id);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (params.id) {
      dispatch(fetchUserDetailedInfoAction(params.id));
    }
  }, [params.id]);

  const { userDetail } = useSelector(
    (state: RootState) => state.userDetailsReducer
  );

  useEffect(() => {
    if (userDetail) {
      form.setFieldsValue({
        ...userDetail,
        birthday: moment(userDetail?.birthday),
      });
    }
  }, [userDetail]);

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(moment(date).format("DD/MM/YYYY"));
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);

    const { name, email, password, phone, birthday, gender, role } = values;

    if (params.id) {
      const payload = {
        submitData: {
          submitData: {
            id: 0,
            name,
            email,
            phone,
            birthday: birthday.format("DD/MM/YYYY"),
            gender,
            role,
          },
          id: userDetail!.id,
        },
        callback: navigate,
        destination: "admin/user-management",
      };

      console.log(payload);

      dispatch(updateUserAction(payload));
    } else {
      const payload = {
        submitData: {
          id: 0,
          name,
          email,
          password,
          phone,
          birthday: birthday.format("DD/MM/YYYY"),
          gender,
          role,
        },
        callback: navigate,
      };

      console.log(payload);

      dispatch(createUserAction(payload));
    }
  };

  return (
    <div>
      <Form
        {...formItemLayout}
        form={form}
        name="basic"
        layout="vertical"
        // initialValues={{ remember: true }}
        initialValues={{
          name: "",
          password: "",
          email: "",
          phone: "",
          address: "",
          birthday: "",
          gender: "",
          role: "",
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ padding: 0, width: "90%", margin: "auto" }}
        autoComplete="off"
      >
        <Form.Item
          label="H??? t??n"
          name="name"
          validateTrigger={["onBlur"]}
          rules={[
            {
              required: true,
              message: "H??? t??n kh??ng ???????c b??? tr???ng.",
            },
            {
              pattern: new RegExp(
                "^[a-zA-Z_???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????" +
                  "???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????" +
                  "????????????????????????????????????????????????????????\\s]+$"
              ),
              message: "H??? t??n kh??ng ????ng ?????nh d???ng.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {!params.id && (
          <Form.Item
            label="M???t kh???u"
            name="password"
            validateTrigger={["onBlur"]}
            rules={[
              {
                required: true,
                message: "M???t kh???u kh??ng ???????c b??? tr???ng.",
              },
              {
                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                message:
                  "M???t kh???u ph???i c?? ??t nh???t 8 k?? t???, bao g???m 1 ch??? s???, 1 ch??? in hoa, 1 ch??? th?????ng.",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
        )}

        <Form.Item
          label="Email"
          name="email"
          validateTrigger={["onBlur"]}
          rules={[
            {
              required: true,
              message: "Email kh??ng ???????c b??? tr???ng.",
            },
            {
              pattern: new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$"),
              message: "Email kh??ng ????ng ?????nh d???ng.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="S??? ??i???n tho???i"
          name="phone"
          validateTrigger={["onBlur"]}
          rules={[
            {
              required: true,
              message: "S??? ??i???n tho???i kh??ng ???????c b??? tr???ng.",
            },
            {
              pattern: /^[0-9]+$/,
              message: "S??? ??i???n tho???i kh??ng ????ng ?????nh d???ng.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Ng??y sinh"
          name="birthday"
          validateTrigger={["onBlur"]}
          rules={[
            {
              required: true,
              message: "Ng??y sinh kh??ng ???????c b??? tr???ng.",
            },
          ]}
        >
          <DatePicker onChange={onChange} />
        </Form.Item>

        <Form.Item
          label="Gi???i t??nh"
          name="gender"
          validateTrigger={["onBlur"]}
          rules={[
            {
              required: true,
              message: "Gi???i t??nh kh??ng ???????c b??? tr???ng.",
            },
          ]}
        >
          <Select style={{ width: 120 }} onChange={handleChangeOne}>
            <Option value={true}>Nam</Option>
            <Option value={false}>N???</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Lo???i ng?????i d??ng"
          name="role"
          validateTrigger={["onBlur"]}
          rules={[
            {
              required: true,
              message: "Lo???i ng?????i d??ng kh??ng ???????c b??? tr???ng.",
            },
          ]}
        >
          <Select style={{ width: 120 }} onChange={handleChangeTwo}>
            <Option value="ADMIN">Admin</Option>
            <Option value="USER">User</Option>
          </Select>
        </Form.Item>
        <Form.Item
          // wrapperCol={{ offset: 8, span: 16 }}
          {...tailFormItemLayout}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
