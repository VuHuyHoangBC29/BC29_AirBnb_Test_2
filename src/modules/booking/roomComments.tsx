import { CloseOutlined } from "@ant-design/icons";
import { Button, List, Rate } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentAction } from "../../store/reducers/commentsListReducer";
import { AppDispatch, RootState } from "../../store/store";

export default function RoomComments() {
  const dispatch = useDispatch<AppDispatch>();

  const { roomDetails } = useSelector(
    (state: RootState) => state.roomDetailsReducer
  );

  const { commentsList } = useSelector(
    (state: RootState) => state.commentsListReducer
  );

  const { userInfo } = useSelector(
    (state: RootState) => state.authenticationReducer
  );

  const commentsListByRoomId = commentsList.filter((ele, idx) => {
    return ele.maPhong === roomDetails?.id;
  });

  const commentsByUserId = commentsListByRoomId.filter((ele, idx) => {
    return ele.maNguoiBinhLuan === userInfo?.id;
  });

  console.log(commentsByUserId);

  const roomCommentsData = commentsListByRoomId.map((ele, idx) => {
    return {
      maNguoiBinhLuan: ele.maNguoiBinhLuan,
      maBinhLuan: ele.id,
      title: (
        <div>
          <Rate disabled defaultValue={ele.saoBinhLuan} /> -{" "}
          <span>{ele.ngayBinhLuan}</span>
        </div>
      ),
      description: `${ele.noiDung} <br/> ${ele.ngayBinhLuan}`,
    };
  });

  return (
    <div>
      <h5>Bình luận</h5>
      <List
        itemLayout="horizontal"
        dataSource={roomCommentsData}
        renderItem={(item) => (
          <>
            <List.Item>
              <List.Item.Meta
                title={<div>{item.title}</div>}
                description={
                  <p dangerouslySetInnerHTML={{ __html: item.description }} />
                }
              />
              {item.maNguoiBinhLuan === userInfo?.id && (
                <Button
                  onClick={() => {
                    dispatch(deleteCommentAction(item.maBinhLuan));
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <CloseOutlined />
                </Button>
              )}
            </List.Item>
          </>
        )}
      />
    </div>
  );
}
