import {
  Button,
  Checkbox,
  Form,
  Input,
  DatePicker,
  Select,
  Image,
  notification,
  InputNumber,
  Switch,
  Row,
  Col,
} from "antd";
import type { DatePickerProps } from "antd";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
//   import { fetchPostLocationsAction } from "../../store/reducers/locationPostReducer";
import { useNavigate, useParams } from "react-router-dom";
import { fetchLocationsListAction } from "../../store/reducers/locationsListReducer";
import { createRoomAction } from "../../store/reducers/roomsListReducer";
import {
  fetchRoomDetailsAction,
  updateRoomAction,
} from "../../store/reducers/roomDetailsReducer";

export default function RoomForm(): JSX.Element {
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const params = useParams();

  const dispatch = useDispatch<AppDispatch>();

  const [image, setImage] = useState<string>("");

  useEffect(() => {
    dispatch(fetchLocationsListAction());
  }, []);

  const { locationsList } = useSelector(
    (state: RootState) => state.locationsListReducer
  );

  useEffect(() => {
    if (params.id) {
      dispatch(fetchRoomDetailsAction(parseInt(params.id)));
    }
  }, [params.id]);

  const { roomDetails } = useSelector(
    (state: RootState) => state.roomDetailsReducer
  );

  useEffect(() => {
    if (roomDetails) {
      form.setFieldsValue({
        ...roomDetails,
      });

      setImage(roomDetails.hinhAnh);
    }
  }, [roomDetails]);
  //
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

  const onFinish = (values: any) => {
    for (const key in values) {
      if (values[key] === undefined) {
        values[key] = false;
      }
    }

    if (params.id) {
      values.id = +params.id;
      values.hinhAnh = image;
      const payload = {
        submitData: {
          submitData: values,
          id: +params.id,
        },
        callback: navigate,
      };

      dispatch(updateRoomAction(payload));
    } else {
      values.id = 0;
      values.hinhAnh = image;
      const payload = {
        submitData: values,
        callback: navigate,
      };
      dispatch(createRoomAction(payload));
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const hanldeChangeImage = (event: any) => {
    const file = event.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = (event: any) => {
      setImage(event.target.result);
      // setSendfile(file);
    };
  };
  return (
    <Form
      {...formItemLayout}
      form={form}
      name="basic"
      layout="vertical"
      // initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      style={{ padding: 0, width: "90%", margin: "auto" }}
      autoComplete="off"
    >
      <Form.Item
        label="T???nh th??nh"
        name="maViTri"
        validateTrigger={["onBlur"]}
        rules={[
          {
            required: true,
            message: "T???nh th??nh kh??ng ???????c b??? tr???ng!",
          },
        ]}
      >
        <Select placeholder="Ch???n t???nh th??nh">
          {locationsList.map((ele) => {
            return (
              <Select.Option key={ele.id} value={ele.id}>
                {ele.tinhThanh}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>

      <Form.Item
        label="T??n ph??ng"
        name="tenPhong"
        rules={[{ required: true, message: "T??n ph??ng kh??ng ???????c b??? tr???ng!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="H??nh kh??ch"
        name="khach"
        validateTrigger={["onBlur"]}
        rules={[
          { required: true, message: "Vui l??ng ??i???n s??? kh??ch." },
          {
            pattern: /^[0-9]+$/,
            message: "S??? kh??ch kh??ng ????ng ?????nh d???ng",
          },
          { min: 1, message: "S??? kh??ch ph???i l???n h??n 0", type: "number" },
          {
            max: 10,
            message: "S??? kh??ch ph???i kh??ng ???????c l???n h??n 10",
            type: "number",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        label="Ph??ng ng???"
        name="phongNgu"
        validateTrigger={["onBlur"]}
        rules={[
          { required: true, message: "Vui l??ng ??i???n s??? ph??ng ng???." },
          {
            pattern: /^[0-9]+$/,
            message: "S??? ph??ng ng??? kh??ng ????ng ?????nh d???ng",
          },
          { min: 1, message: "S??? ph??ng ng??? ph???i l???n h??n 0", type: "number" },
          {
            max: 10,
            message: "S??? ph??ng ng??? ph???i kh??ng ???????c l???n h??n 10",
            type: "number",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        label="Gi?????ng"
        name="giuong"
        validateTrigger={["onBlur"]}
        rules={[
          { required: true, message: "Vui l??ng ??i???n s??? gi?????ng." },
          {
            pattern: /^[0-9]+$/,
            message: "S??? gi?????ng kh??ng ????ng ?????nh d???ng",
          },
          { min: 1, message: "S??? gi?????ng ph???i l???n h??n 0", type: "number" },
          {
            max: 10,
            message: "S??? gi?????ng ph???i kh??ng ???????c l???n h??n 10",
            type: "number",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        label="Ph??ng t???m"
        name="phongTam"
        validateTrigger={["onBlur"]}
        rules={[
          { required: true, message: "Vui l??ng ??i???n s??? ph??ng t???m." },
          {
            pattern: /^[0-9]+$/,
            message: "S??? ph??ng t???m kh??ng ????ng ?????nh d???ng",
          },
          { min: 1, message: "S??? ph??ng t???m ph???i l???n h??n 0", type: "number" },
          {
            max: 10,
            message: "S??? ph??ng t???m ph???i kh??ng ???????c l???n h??n 10",
            type: "number",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        label="M?? t???"
        name="moTa"
        rules={[{ required: true, message: "M?? t??? kh??ng ???????c b??? tr???ng!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Gi?? ti???n"
        name="giaTien"
        validateTrigger={["onBlur"]}
        rules={[
          { required: true, message: "Vui l??ng ??i???n gi?? ti???n." },
          {
            pattern: /^[0-9]+$/,
            message: "Gi?? ti???n kh??ng ????ng ?????nh d???ng",
          },
          { min: 1, message: "Gi?? ti???n ph???i l???n h??n 0", type: "number" },
          {
            max: 200,
            message: "Gi?? ti???n ph???i kh??ng ???????c l???n h??n 200",
            type: "number",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>

      <div>
        <Row>
          <Col span={6}>
            <Form.Item label="M??y gi???t" valuePropName="checked" name="mayGiat">
              <Checkbox defaultChecked={true} />
            </Form.Item>

            <Form.Item label="B??n l??" valuePropName="checked" name="banLa">
              <Checkbox defaultChecked={true} />
            </Form.Item>

            <Form.Item label="Tivi" valuePropName="checked" name="tivi">
              <Checkbox defaultChecked={true} />
            </Form.Item>

            <Form.Item label="??i???u h??a" valuePropName="checked" name="dieuHoa">
              <Checkbox defaultChecked={true} />
            </Form.Item>

            <Form.Item label="Wifi" valuePropName="checked" name="wifi">
              <Checkbox defaultChecked={true} />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label="B???p" valuePropName="checked" name="bep">
              <Checkbox defaultChecked={true} />
            </Form.Item>

            <Form.Item label="????? xe" valuePropName="checked" name="doXe">
              <Checkbox defaultChecked={true} />
            </Form.Item>

            <Form.Item label="H??? b??i" valuePropName="checked" name="hoBoi">
              <Checkbox defaultChecked={true} />
            </Form.Item>

            <Form.Item label="B??n ???i" valuePropName="checked" name="banUi">
              <Checkbox defaultChecked={true} />
            </Form.Item>
          </Col>
        </Row>
      </div>
      <Form.Item label="H??nh ???nh">
        <Input type="file" onChange={hanldeChangeImage} />
        <Image
          src={image}
          style={{ padding: "50px" }}
          alt="pic"
          onChange={hanldeChangeImage}
        />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
