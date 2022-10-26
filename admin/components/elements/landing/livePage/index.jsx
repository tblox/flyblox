import React, { useCallback } from "react";
import { GrFormView } from "react-icons/gr";
import { mappVariablesToTemplate } from "~/utilities/Template";

function LivePage(props) {
  const { title, currentFrame, onPreview, onOpenEditPage } = props;

  const scaledWrapper = useCallback(
    (node) => {
      if (node === null) {
      } else {
        applyScaling(node);
      }
    },
    [currentFrame]
  );

  const applyScaling = (scaledWrapper) => {
    const element = scaledWrapper.getElementsByClassName("template-view")?.[0];
    if (!element) return;
    if (element.style.transform === "") {
      let { width: cw, height: ch } = element?.getBoundingClientRect();
      let { width: ww, height: wh } = scaledWrapper?.getBoundingClientRect();
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
  };

  return (
    <div className="live-page">
      <div className="preview--btn" onClick={onPreview}>
        <GrFormView className="eye--icon" />
        <span className="preview--text">Preview</span>
      </div>
      <div className="live-page__title">{title}</div>
      <div className="live-page__body" onClick={onOpenEditPage}>
        {/* <div className="live-page__body--wrapper">
          <div className="live-page__body--wrapper-image" ref={scaledWrapper}>
            {currentFrame?.template ? (
              <div
                className="template-view"
                dangerouslySetInnerHTML={{
                  __html: mappVariablesToTemplate(
                    currentFrame?.template,
                    currentFrame?.values
                  ),
                }}
              ></div>
            ) : (
              <img
                className="template-view"
                src={
                  currentFrame?.imageUrl
                    ? URL.createObjectURL(currentFrame?.imageUrl)
                    : ""
                }
                alt="image"
              />
            )}
            <div className="overlay"></div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default LivePage;
