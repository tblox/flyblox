import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import PropTypes from "prop-types";
import HeaderLanding from "~/components/shared/headers/HeaderLanding";
import SidebarLanding from "~/components/shared/menus/SidebarLanding";
import FrameStrip from "~/components/shared/previews/FrameStrip";
import { RiSearch2Line } from "react-icons/ri";
import { BiUpload } from "react-icons/bi";
import { BsFillPlusSquareFill } from "react-icons/bs";
import ContainerDefault from "~/components/layouts/ContainerDefault";
import HeaderDashboard from "~/components/shared/headers/HeaderDashboard";
import { getAllTemplate, setCurrentPage } from "~/store/landingPages/action";
import { useSelector, useDispatch } from "react-redux";

Layout.propTypes = {};

const fakeData = [
  {
    id: 1,
    url: "https://img.freepik.com/free-psd/e-learning-landing-page-template-design_23-2149118530.jpg?w=2000",
  },
  {
    id: 2,
    url: "https://i.pngimg.me/thumb/f/720/402aef8eed294c6180ae.jpg",
  },
  {
    id: 3,
    url: "https://media.sproutsocial.com/uploads/2020/02/landing-page-examples.svg",
  },
  {
    id: 4,
    url: "https://1030z2bnst92zo6j523feq9e-wpengine.netdna-ssl.com/wp-content/uploads/2019/10/word-image-68.png",
  },
  {
    id: 5,
    url: "https://pandagila.com/wp-content/uploads/2020/09/apa-itu-landing-page.png",
  },
  {
    id: 6,
  },
];

function Layout(props) {
  const dispatch = useDispatch();

  const [currentSection, setCurrentSection] = React.useState(null);
  const [listSection, setListSection] = React.useState(fakeData);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [textColor, setTextColor] = React.useState("#000000");
  const [colorHex, setColorHex] = React.useState("#FAFD37");
  //   const [urlImage, setUrlImage] = React.useState("");

  const { templates, currentPage } = useSelector((store) => store.landingPage);
  useEffect(() => {
    dispatch(getAllTemplate());
  }, []);
  const scaledWrapper = useCallback((node) => {
    console.log(node);
    if (node === null) {
    } else {
      applyScaling(node);
    }
  }, [templates]);

  const changeHandler = (event) => {
    if (event.target.files[0]) setSelectedFile(event.target.files[0]);

    if (selectedFile !== null) {
      setUrlImage(URL.createObjectURL(selectedFile));
      console.log(urlImage);
    }
  };

  const onAddNewSection = () => {
    setListSection([...listSection, { id: new Date().getTime() }]);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const applyScaling = (scaledWrapper) => {
    const listContent = scaledWrapper.getElementsByClassName("template");

    for (let index = 0; index < listContent.length; index++) {
      const element = listContent[index].getElementsByClassName("template__content")?.[0];
      let { width: cw, height: ch } = element?.getBoundingClientRect();
      let { width: ww, height: wh } =
        listContent[index].getBoundingClientRect();
      let scaleAmtX = Math.max(ww / cw, wh / ch);
      let scaleAmtY = scaleAmtX;
      const translateX= cw*scaleAmtX > ww ? `translateX(${-(cw*scaleAmtX - ww)/2/scaleAmtX}px)` : ''
      element.style.transform = `scale(${scaleAmtX}, ${scaleAmtY}) ${translateX}`;
    }
  };

  const onSelectTemplate = () => {
    console.log("select template");
    dispatch(setCurrentPage(["aaa"]))
  };

  return (
    <ContainerDefault>
      <HeaderDashboard
        title="landingPages"
        description="Martfury Category Listing"
      />
      <div className="layout">
        <div className="layout__left">
          <SidebarLanding />
          <div className="layout__left-content">
            <p>Templates</p>
            <div className="m-4 form__control__item__input">
              <RiSearch2Line />
              <input
                type="text"
                placeholder="Search Templates"
                name="search"
              ></input>
            </div>
            <div className="templates" ref={scaledWrapper}>
              {templates?.map((template, index) => (
                <div className="template" key={template._id}>
                  <div
                    className="template__content"
                    id={template._id}
                    dangerouslySetInnerHTML={{
                      __html: template.template,
                    }}
                  ></div>
                  <div
                    className="template__overlay"
                    onClick={onSelectTemplate}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="layout__right" id="aaa">
          <HeaderLanding />
          <div className="layout__right-content">
            {!selectedFile ? (
              <div className="content-default">
                <img src="/public/img/imageDefault.svg" alt="Default Image" />
                <p>Add a template or image from left side to continue</p>
              </div>
            ) : (
              <div className="content-selected">
                <img
                  src={selectedFile ? URL.createObjectURL(selectedFile) : ""}
                  alt="image"
                />
              </div>
            )}
          </div>
          <FrameStrip
            listFrame={listSection}
            currentFrame={currentSection}
            setCurrentFrame={setCurrentSection}
            onAddNewFrame={onAddNewSection}
          />
        </div>
      </div>
    </ContainerDefault>
  );
}

export default Layout;
