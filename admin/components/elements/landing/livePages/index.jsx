import React, { useCallback } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { mappVariablesToTemplate } from "~/utilities/Template";

function LandingLivePages({ onSelectTemplate }) {
  const { templates } = useSelector((store) => store.landingPage);

  const scaledWrapper = useCallback(
    (node) => {
      if (node === null) {
      } else {
        applyScaling(node);
      }
    },
    [templates]
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
        console.log(cw, ch, ww, wh);
        element.style.transform = `scale(${scaleAmtX}, ${scaleAmtY}) ${translateX}`;
      }
    }
  };

  return (
    <>
      <div className="form__control__item__input m-4 mt-30">
        <RiSearch2Line />
        <input type="text" placeholder="Search Templates" name="search"></input>
      </div>
      <div className="templates" ref={scaledWrapper}>
        {templates?.map((template, index) => (
          <div className="template" key={template._id}>
            <div
              className="template__content"
              id={template._id}
              dangerouslySetInnerHTML={{
                __html: mappVariablesToTemplate(
                  template.template,
                  template.defaultValues
                ),
              }}
            ></div>
            <div
              className="overlay"
              onClick={() => onSelectTemplate(template)}
            ></div>
          </div>
        ))}
      </div>
    </>
  );
}

export default LandingLivePages;
