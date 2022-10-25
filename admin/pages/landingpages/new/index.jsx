import React, { useEffect, useState } from "react";
import HeaderLanding from "~/components/shared/headers/HeaderLanding";
import FrameStrip from "~/components/shared/previews/FrameStrip";
import { RiSearch2Line } from "react-icons/ri";
import { BiUpload } from "react-icons/bi";
import { BsLayoutTextWindowReverse } from "react-icons/bs";
import ContainerDefault from "~/components/layouts/ContainerDefault";
import HeaderDashboard from "~/components/shared/headers/HeaderDashboard";
import { useDispatch } from "react-redux";
import { getAllTemplate, setCurrentPage, setCurrentSection } from "~/store/landingPages/action";
import { useSelector } from "react-redux";
import { HiTemplate } from "react-icons/hi";
import { RiLayoutMasonryFill } from "react-icons/ri";
import { FaPager } from "react-icons/fa";
import { useRouter } from "next/router";
import LandingLayout from "~/components/elements/landing/layout";
import LandingImage from "~/components/elements/landing/image";
import LandingTemplate from "~/components/elements/landing/template";
import { mappVariablesToTemplate } from "~/utilities/Template";


function NewLandingPage(props) {

    const sidebarItems = [
        {
          id: 1,
          title: "Layout",
          icon: <RiLayoutMasonryFill />,
          handle: <LandingLayout />
        },
        {
          id: 2,
          title: "Image",
          icon: <FaPager />,
          handle: <LandingImage />
        },
        {
          id: 3,
          title: "Template",
          icon: <HiTemplate />,
          handle: <LandingTemplate />
        },
      ];

      
  const dispatch = useDispatch();
  const router = useRouter();

  const [currentTab, setCurrentTab] = useState(sidebarItems[0]);

  console.log(router.query.pid)
  const { currentPage, currentSection } = useSelector(
    (store) => store.landingPage
  );

  useEffect(() => {
    dispatch(getAllTemplate());
  }, []);

  const onAddNewSection = () => {
    const newSection = { _id: new Date().getTime() };
    dispatch(setCurrentSection(newSection));
  };

  console.log(currentSection);
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
          <HeaderLanding />
          <div className="layout__right-content">
            {
              !currentSection ? <div className="content-default">
              <p>Add a new section to start</p>
            </div>
            :(!currentSection.template && !currentSection.imageUrl) ? (
              <div className="content-default">
                <BsLayoutTextWindowReverse size={50}/>
                <p>Add a template or image from left side to continue</p>
              </div>
            ) : (
              <>
              <div className="content-selected">
                {
                  currentSection.template ? <div dangerouslySetInnerHTML={{__html: mappVariablesToTemplate(currentSection.template, currentSection.values)}}></div>
                  : <img
                  src={currentSection.imageUrl ? URL.createObjectURL(currentSection.imageUrl) : ""}
                  alt="image"
                />
                }
              </div>
              <div className="overlay"></div>
              </>
            )
            }
          </div>
          <FrameStrip
            listFrame={currentPage?.sections || []}
            currentFrame={currentSection}
            setCurrentFrame={(frame) => dispatch(setCurrentSection(frame))}
            onAddNewFrame={onAddNewSection}
          />
        </div>
      </div>
    </ContainerDefault>
  );
}

export default NewLandingPage;
