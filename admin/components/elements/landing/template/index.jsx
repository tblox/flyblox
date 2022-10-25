import React, { useCallback, useEffect, useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { setCurrentSection } from "~/store/landingPages/action";
import { useSelector, useDispatch } from "react-redux";
import { mappVariablesToTemplate } from "~/utilities/Template";

function LandingTemplate(props) {
  const dispatch = useDispatch();

  const { templates, currentSection } = useSelector(
    (store) => store.landingPage
  );

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
      };

     
    }
  };

  const onSelectTemplate = (template) => {
    const section = JSON.parse(JSON.stringify(currentSection));
    console.log("a", currentSection)
    dispatch(
      setCurrentSection({
        ...section,
        templateId: template._id,
        template: template.template,
        values: template.defaultValues,
      })
    );
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

export default LandingTemplate;
