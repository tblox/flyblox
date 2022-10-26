import React, { useCallback, useEffect, useState } from "react";
import HeaderLanding from "~/components/shared/headers/HeaderLanding";
import FrameStrip from "~/components/shared/previews/FrameStrip";
import { BsLayoutTextWindowReverse, BsPlusSquareDotted } from "react-icons/bs";
import ContainerDefault from "~/components/layouts/ContainerDefault";
import HeaderDashboard from "~/components/shared/headers/HeaderDashboard";
import { useDispatch } from "react-redux";
import {
  getAllTemplate,
  savePageChanges,
  setCurrentPage,
  setCurrentSection,
} from "~/store/landingPages/action";
import { useSelector } from "react-redux";
import { HiTemplate } from "react-icons/hi";
import { RiLayoutMasonryFill } from "react-icons/ri";
import { FaPager, FaPython } from "react-icons/fa";
import { useRouter } from "next/router";
import LandingLayout from "~/components/elements/landing/layout";
import LandingImage from "~/components/elements/landing/image";
import LandingTemplate from "~/components/elements/landing/template";
// import LandingLivePages from "~/components/elements/landing/livePages";
import { mappVariablesToTemplate } from "~/utilities/Template";
import PreviewModal from "~/components/elements/landing/modal/previewModal";
import { SECTION_TYPE } from "~/constants";
// import LivePage from "~/components/elements/landing/livePage";

// const LIVE_PAGES = [
//   { title: "page 1" },
//   { title: "page 2" },
//   { title: "page 3" },
//   { title: "page 4" },
//   { title: "page 5" },
//   { title: "page 6" },
//   { title: "page 7" },
//   { title: "page 8" },
//   { title: "page 9" },
// ];

function NewLandingPage(props) {
  const dispatch = useDispatch();
  const router = useRouter();

  const { currentPage, currentSection } = useSelector(
    (store) => store.landingPage
  );
  const [openPreviewPage, setOpenPreviewPage] = useState(false);

  const onSelectTemplate = (template) => {
    const section = JSON.parse(JSON.stringify(currentSection));
    dispatch(
      setCurrentSection({
        tempID: section? section.tempID : (new Date()).getTime(),
        data: {
          templateID: template._id,
          template: template.template,
          formProps: template.defaultValues,
        },
        typeSection: SECTION_TYPE.FORM
      })
    );
    setCurrentTab(sidebarItems[0]);
  };

  const onSelectImage = (imageUrl) => {
    const temp = JSON.parse(JSON.stringify(currentSection));
    dispatch(
      setCurrentSection({ tempID: temp?temp.tempID: (new Date()).getTime(), typeSection: SECTION_TYPE.IMAGE,
        data: {imageUrl}
      })
    );
    setCurrentTab(sidebarItems[0]);
  }

  const sidebarItems = [
    {
      id: 1,
      title: "Layout",
      icon: <RiLayoutMasonryFill />,
      handle: <LandingLayout />,
    },
    {
      id: 2,
      title: "Image",
      icon: <FaPager />,
      handle: <LandingImage  onSelectImage={onSelectImage} />,
    },
    {
      id: 3,
      title: "Template",
      icon: <HiTemplate />,
      handle: <LandingTemplate onSelectTemplate={onSelectTemplate} />,
    },
    // ,
    // {
    //   id: 4,
    //   title: "Live Pages",
    //   icon: <HiTemplate />,
    //   handle: <LandingLivePages onSelectTemplate={onSelectTemplate} />,
    // },
  ];

  const [currentTab, setCurrentTab] = useState(sidebarItems[0]);

  useEffect(() => {
    dispatch(getAllTemplate());
  }, []);

  const onAddNewSection = () => {
    const newSection = { tempID: new Date().getTime() };
    dispatch(setCurrentSection(newSection));
  };

  const onReorderPageSections = (newSections) => {
    const temp = JSON.parse(JSON.stringify(currentPage));
    temp.sections = newSections;
    dispatch(setCurrentPage(temp));
  };

  const onPreviewPage = () => {
    setOpenPreviewPage(true);
  };

  const onSavePageChanges = () => {
    const temp = JSON.parse(JSON.stringify(currentPage))?.sections?.filter(section => section.typeSection===SECTION_TYPE.FORM || section.typeSection === SECTION_TYPE.IMAGE);
    const data = temp.map((section, index) => {
      let data = {}
      if (section.typeSection === SECTION_TYPE.IMAGE ) data = section.data
      else if (section.typeSection === SECTION_TYPE.FORM ) data = {
        templateID: section.data.templateID,
        formProps: section.data.formProps
      }
      return {
        _id: section._id || null,
        order : index + 1,
        typeSection: section.typeSection,
        data,
      }
    })
    console.log({data})
    // dispatch(savePageChanges(data))
  }

  const scaledWrapper = useCallback(
    (node) => {
      if (node === null) {
      } else {
        applyScaling(node);
      }
    },
    [currentSection]
  );

  const applyScaling = (scaledWrapper) => {
    const element = scaledWrapper.getElementsByClassName("content-selected")?.[0];
    if (!element) return;
    if (element.style.transform === "") {
      let { width: cw, height: ch } = element?.getBoundingClientRect();
      let { width: ww, height: wh } = scaledWrapper.getBoundingClientRect();
      let scaleAmtX = cw / ww;
      let scaleAmtY = scaleAmtX;
      const translateX =
        cw * scaleAmtX > ww
          ? `translateX(${-(cw * scaleAmtX - ww) / 2 / scaleAmtX}px)`
          : "";
      console.log(cw, ch, ww, wh, scaleAmtX);
      element.style.transform = `scale(${scaleAmtX}, ${scaleAmtY}) ${translateX}`;
    }
  };

  return (
    <ContainerDefault>
      <HeaderDashboard
        title="landingPages"
        description="Martfury Category Listing"
      />
      <div className="layout">
        <div className="layout__left">
          <ul className="sidebar">
            {sidebarItems.map((item, index) => (
              <li
                key={index}
                id={item.id}
                className={currentTab.id === item.id ? "active" : ""}
              >
                <b></b>
                <b></b>
                <a onClick={() => setCurrentTab(item)}>
                  {item.icon}
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
          <div className="layout__left-content">
            <p>{currentTab.title}</p>
            {currentTab.handle}
          </div>
        </div>

        <div className="layout__right">
          <HeaderLanding onPreview={onPreviewPage} onSaveChanges={onSavePageChanges}/>
          <div className="layout__right-content" ref={scaledWrapper}>
            {!currentSection ? (
              <div className="content-default">
                <p>Add a new section to start</p>
              </div>
            ) : !currentSection.data ? (
              <div className="content-default">
                <BsLayoutTextWindowReverse size={50} />
                <p>Add a template or image from left side to continue</p>
                <div className="content-action">
                  <div
                    onClick={() => setCurrentTab(sidebarItems[1])}
                    className="content-action__item"
                  >
                    <BsPlusSquareDotted size={25} />
                    <span>Add Image</span>
                  </div>
                  <div
                    onClick={() => setCurrentTab(sidebarItems[2])}
                    className="content-action__item"
                  >
                    <BsPlusSquareDotted size={25} />
                    <span>Add Template</span>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="content-selected">
                  {currentSection.typeSection === SECTION_TYPE.FORM ? (
                    <div
                      className="element-view"
                      dangerouslySetInnerHTML={{
                        __html: mappVariablesToTemplate(
                          currentSection.data?.template,
                          currentSection.data?.formProps
                        ),
                      }}
                    ></div>
                  ) : (
                    <div className="element-view"> <img
                    src={currentSection.data?.imageUrl}
                    alt="image"
                  /></div>
                   
                  )}
                  <div className="overlay"></div>
                </div>
              </>
            )}
          </div>
          <FrameStrip
            listFrame={currentPage?.sections || []}
            currentFrame={currentSection}
            setCurrentFrame={(frame) => dispatch(setCurrentSection(frame))}
            onAddNewFrame={onAddNewSection}
            onReorderFrame={onReorderPageSections}
          />
        </div>
      </div>
      <PreviewModal
        isOpen={openPreviewPage}
        handleClose={() => setOpenPreviewPage(false)}
        page={currentPage}
      />
    </ContainerDefault>
  );
}

export default NewLandingPage;
