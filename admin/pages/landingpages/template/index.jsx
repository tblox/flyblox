import React from "react";
import PropTypes from "prop-types";
import HeaderLanding from "~/components/shared/headers/HeaderLanding";
import SidebarLanding from "~/components/shared/menus/SidebarLanding";
import FrameStrip from "~/components/shared/previews/FrameStrip";
import { RiSearch2Line } from "react-icons/ri";
import { BiUpload } from "react-icons/bi";
import { BsFillPlusSquareFill } from "react-icons/bs";
import ContainerDefault from "~/components/layouts/ContainerDefault";
import HeaderDashboard from "~/components/shared/headers/HeaderDashboard";

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
  const [currentSection, setCurrentSection] = React.useState(null);
  const [listSection, setListSection] = React.useState(fakeData);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [textColor, setTextColor] = React.useState("#000000");
  const [colorHex, setColorHex] = React.useState("#FAFD37");
  //   const [urlImage, setUrlImage] = React.useState("");

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
            <div >
                <RiSearch2Line /> 
                 <input type="text" placeholder="Search Templates" name="search"></input>
            </div>
            <img src="https://pandagila.com/wp-content/uploads/2020/09/apa-itu-landing-page.png" alt="image" />
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
