import React, { useCallback } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { mappVariablesToTemplate } from "~/utilities/Template";

const FrameStrip = ({
  listFrame,
  currentFrame,
  setCurrentFrame,
  onAddNewFrame,
}) => {
  const scaledWrapper = useCallback(
    (node) => {
      console.log(node);
      if (node === null) {
      } else {
        applyScaling(node);
      }
    },
    [listFrame]
  );

  const applyScaling = (scaledWrapper) => {
    const listContent = scaledWrapper.getElementsByClassName("template");
    for (let index = 0; index < listContent.length; index++) {
      const element =
        listContent[index].getElementsByClassName("template__content")?.[0];
      if (element.style.transform === "") {
        let { width: cw, height: ch } = element?.getBoundingClientRect();
        let { width: ww, height: wh } =
          listContent[index].getBoundingClientRect();
        let scaleAmtX = Math.max(ww / cw, wh / ch);
        let scaleAmtY = scaleAmtX;
        const translateX =
          cw * scaleAmtX > ww
            ? `translateX(${-(cw * scaleAmtX - ww) / 2 / scaleAmtX}px)`
            : "";
        const translateY =
          ch * scaleAmtY > wh
            ? `translateY(${-(ch * scaleAmtY - wh) / 2 / scaleAmtY}px)`
            : "";
        element.style.transform = `scale(${scaleAmtX}, ${scaleAmtY}) ${translateX} ${translateY}`;
      }
    }
  };

  return (
    <div className="framestrip" ref={scaledWrapper}>
      {listFrame.map((item, index) => (
        <div
          key={index}
          onClick={() => setCurrentFrame(item)}
          className={`framestrip__item ${
            currentFrame?._id === item._id ? "framestrip__item--selected" : ""
          } `}
        >
          <div className="framestrip__frame">
            {item.template && (
              <div className="template">
                <div
                  className="template__content"
                  id={item.template._id}
                  dangerouslySetInnerHTML={{
                    __html: mappVariablesToTemplate(item.template, item.values),
                  }}
                ></div>
                <div className="overlay"></div>
              </div>
            )}
            {item.imageUrl && item.imageUrl !== "" && (
              <img src={item.imageUrl} />
            )}
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
