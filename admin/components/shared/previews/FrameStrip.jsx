import React from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const FrameStrip = ({ listFrame, currentFrame, setCurrentFrame, onAddNewFrame }) => {

  return (
    <div className="framestrip">
      {listFrame.map((item, index) => (
        <div
          key={index}
          onClick={() => setCurrentFrame(item)}
          className={`framestrip__item ${
            currentFrame?.id === item.id ? "framestrip__item--selected" : ""
          } `}
        >
          <div className="framestrip__frame">
            {item.url && item.url !== "" && <img src={item.url} />}
          </div>
          <div className="framestrip__order">
            <span>{index + 1}</span>
          </div>
        </div>
      ))}
      <Button
        icon={<PlusOutlined />}
        className="btn-add-frame"
        onClick={onAddNewFrame}
      />
    </div>
  );
};

export default FrameStrip;