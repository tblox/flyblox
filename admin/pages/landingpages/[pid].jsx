import React, { useState } from "react";
import HeaderLanding from "~/components/shared/headers/HeaderLanding";
import FrameStrip from "~/components/shared/previews/FrameStrip";
import { RiSearch2Line } from "react-icons/ri";
import { BiUpload } from "react-icons/bi";
import { BsFillPlusSquareFill } from "react-icons/bs";
import ContainerDefault from "~/components/layouts/ContainerDefault";
import HeaderDashboard from "~/components/shared/headers/HeaderDashboard";
import { useDispatch } from "react-redux";
import { setCurrentPage, setCurrentSection } from "~/store/landingPages/action";
import { useSelector } from "react-redux";
import { HiTemplate } from "react-icons/hi";
import { RiLayoutMasonryFill } from "react-icons/ri";
import { FaPager } from "react-icons/fa";
import { useRouter } from "next/router";

const sidebarItems = [
  {
    id: 1,
    title: "Layout",
    icon: <RiLayoutMasonryFill />,
  },
  {
    id: 2,
    title: "Image",
    icon: <FaPager />,
  },
  {
    id: 3,
    title: "Template",
    icon: <HiTemplate />,
  },
];

function LandingPageLayout(props) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [selectedFile, setSelectedFile] = React.useState(null);
  const [textColor, setTextColor] = React.useState("#000000");
  const [colorHex, setColorHex] = React.useState("#FAFD37");
  const [currentTab, setCurrentTab] = useState(sidebarItems[0]);
  //   const [urlImage, setUrlImage] = React.useState("");

  console.log(router.query.pid);
  const { currentPage, currentSection } = useSelector(
    (store) => store.landingPage
  );
  const changeHandler = (event) => {
    if (event.target.files[0]) setSelectedFile(event.target.files[0]);

    if (selectedFile !== null) {
      setUrlImage(URL.createObjectURL(selectedFile));
      console.log(urlImage);
    }
  };

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
            {
              <div className="form__control">
                <div className="form__control__header">
                  <p>Button</p>
                  <BsFillPlusSquareFill />
                </div>
                <div className="form__control__item">
                  <p>Button Text</p>
                  <div className="form__control__item__input">
                    <input
                      type="text"
                      placeholder="Button Text"
                      name="search"
                    ></input>
                  </div>
                </div>
                <div className="form__control__item">
                  <p>Text Color</p>
                  <div className="form__control__item__input">
                    <input
                      className="form__control__item__input--color"
                      type="color"
                      id="text-color"
                      name="text-color"
                      value={textColor}
                    ></input>
                    <input
                      type="text"
                      placeholder="Text Color"
                      name="search"
                      onChange={(e) => setTextColor(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div className="form__control__item">
                  <p>Fill Color</p>
                  <select
                    name="fill-colors"
                    id="fill-colors"
                    defaultValue={"solid"}
                    className="form__control__item__input"
                  >
                    <option value="solid">Solid</option>
                    <option value="dotted">Dotted</option>
                    <option value="dashed">Dashed</option>
                    <option value="double">Double</option>
                    <option value="groove">Groove</option>
                    <option value="ridge">Ridge</option>
                    <option value="inset">Inset</option>
                    <option value="outset">Outset</option>
                    <option value="none">None</option>
                    <option value="hidden">Hidden</option>
                  </select>
                </div>
                <div className="form__control__item">
                  <p>Color Hex</p>
                  <div className="form__control__item__input">
                    <input
                      className="form__control__item__input--color"
                      type="color"
                      id="button-color"
                      name="button-color"
                      value={colorHex}
                    ></input>
                    <input
                      type="text"
                      placeholder="Color Hex"
                      name="color-hex"
                      onChange={(e) => setColorHex(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div className="form__control__item">
                  <p>Button Style</p>
                  <select
                    name="button-styles"
                    id="button-styles"
                    defaultValue={"default"}
                    className="form__control__item__input"
                  >
                    <option value="default">Default</option>
                  </select>
                </div>
                <div className="form__control__item">
                  <p>Form Placement on image #</p>
                  <select
                    name="form-location"
                    id="form-location"
                    defaultValue="left"
                    className="form__control__item__input"
                  >
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                  </select>
                </div>
                <div className="form__control__item">
                  <p>Upload Form Background Image</p>
                  <div className="upload-btn-wrapper">
                    <button class="button__upload">
                      <BiUpload />
                      <p className="button__upload-title">Upload file</p>
                      <p className="button__upload-description">
                        PNG, JPEG, WEBP, SVG
                      </p>
                    </button>
                    <input type="file" name="file" onChange={changeHandler} />
                  </div>
                </div>
              </div>
            }
          </div>
        </div>

        <div className="layout__right">
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

export default LandingPageLayout;
