import { Col, Row } from "antd";
import ProfileInfoAvatar from "../../modules/profile-info/profile-info-avatar";
import ProfileInfoForm from "../../modules/profile-info/profile-info-form";

export default function ProfileInfo(): JSX.Element {
  return (
    <div>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 0 }}>
        <Col className="gutter-row" offset={6} span={6}>
          <ProfileInfoAvatar />
        </Col>
        <Col className="gutter-row" span={6}>
          <ProfileInfoForm />
        </Col>
      </Row>
    </div>
  );
}
