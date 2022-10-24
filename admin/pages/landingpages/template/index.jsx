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
import { getAllTemplate } from "~/store/landingPages/action";
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

  const { templates } = useSelector((store) => store.landingPage);
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

  const onSelectTemplate = () => {
    console.log("select template");
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
      console.log(scaleAmtX,-(cw*scaleAmtX - ww)/2,cw*scaleAmtX - ww, ww, cw*scaleAmtX)
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
          <SidebarLanding />
          <div className="layout__left-content">
            <p>Templates</p>
            <div>
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
                      __html: `<!DOCTYPE html>
                      <html lang="en">
                      <head>
                          <meta charset="UTF-8">
                          <meta http-equiv="X-UA-Compatible" content="IE=edge">
                          <meta name="viewport" content="width=device-width, initial-scale=1.0">
                          <link href='https://fonts.googleapis.com/css?family=Work Sans' rel='stylesheet'>
                          <title>Document</title>
                      </head>
                      
                      <style>
                          * {
                              box-sizing: border-box;
                          }
                      
                          .container {
                              background: #fafaf7;
                              background-image: url("https://img.freepik.com/free-vector/flat-design-abstract-background_23-2149116123.jpg?w=2000");
                              background-size: cover;
                              font-family: 'Work Sans';
                              font-size: 12px;
                              min-height: 600px;
                              min-width: 1200px;
                              display: flex;
                              justify-content: center;
                          }
                      
                          .main {
                              width: 350px;
                              padding: 20px;
                          }
                      
                          .tab-form {
                              background: linear-gradient(to right, #3f58d7, #d2208c);
                              padding: 25px;
                              color: #FFFFFF;
                          }
                      
                          .label {
                              font-size: 15px;
                              margin-bottom: 20px;
                          }
                      
                          .form-input {
                              margin-bottom: 20px;
                          }
                      
                          .form-label {
                              margin: 5px 0;
                          }
                      
                          .tab-form input[type="text"],
                          .tab-form input[type="password"] {
                              width: 100%;
                              padding: 10px;
                              border: none;
                          }
                      
                          input::placeholder {
                              font-size: 12px;
                              color: rgb(193, 188, 188);
                          }
                      
                          input[type="checkbox"] {
                              margin-left: 0;
                          }
                      
                          .form-checkbox {
                              display: flex;
                              margin-bottom: 20px;
                          }
                      
                          .submit-btn {
                              width: 100%;
                              background-color: #E8D426;
                              text-align: center;
                              padding: 10px;
                              outline: none;
                              border: none;
                              border-radius: 4px;
                              font-weight: 600;
                              cursor: pointer;
                          }
                      
                          .tab-label {
                              padding: 20px;
                              display: flex;
                              font-size: 22px;
                              font-weight: 700;
                              color: rgb(165, 157, 157);
                              justify-content: space-around;
                          }
                          .tab-label div {
                              cursor: pointer;
                          }
                          .selected-tab {
                              background: linear-gradient(to top,  #3f58d7, #d2208c);
                            -webkit-background-clip: text;
                            -webkit-text-fill-color: transparent;
                          }
                          .hidden {
                              display: none;
                          }
                      </style>
                      
                      <body>
                          <div class="container">
                              <div class="main">
                                  <div class="tab-label" id="tabs">
                                      <div class="tab" id="tab-login" onclick="onClickTab('tab-login')"><span>Login</span></div>
                                      <div class="tab selected-tab" id="tab-register" onclick="onClickTab('tab-register')"><span>Register</span></div>
                                  </div>
                                  <div class="tab-form hidden" id="tab-login-form">
                                      <div class="label">
                                          <label>Login To Account</label>
                                      </div>
                                      <div class="form-input">
                                          <div class="form-label">*Email</div>
                                          <input type="text" placeholder="Email" />
                                      </div>
                                      <div class="form-input">
                                          <div class="form-label">*Password</div>
                                          <input type="password" placeholder="Password" />
                                      </div>
                                      <button class="submit-btn" type="submit">Login</button>
                                  </div>
                                  <div class="tab-form" id="tab-register-form">
                                      <div class="label">
                                          <label>Create An Account</label>
                                      </div>
                                      <div class="form-input">
                                          <div class="form-label">*Name</div>
                                          <input type="text" placeholder="Name" />
                                      </div>
                                      <div class="form-input">
                                          <div class="form-label">*Username</div>
                                          <input type="text" placeholder="Username" />
                                      </div>
                                      <div class="form-input">
                                          <div class="form-label">*Email</div>
                                          <input type="text" placeholder="Email" />
                                      </div>
                                      <div class="form-input">
                                          <div class="form-label">*Password</div>
                                          <input type="password" placeholder="Password" />
                                      </div>
                                      <div class="form-checkbox">
                                          <input type="checkbox" />
                                          <label style="line-height:19px;">I accept terms and conditions</label>
                                      </div>
                                      <button class="submit-btn" type="submit">Get Started Now</button>
                                  </div>
                                
                              </div>
                          </div>
                      </body>
                      
                      <script>
                          const onClickTab = (tab) => {
                              const listTab = document.querySelectorAll('.tab')
                              listTab.forEach(element => {
                                  element.classList.remove("selected-tab")
                              });
                              const selectedTab = document.getElementById(tab)
                              selectedTab.classList.add("selected-tab")
                      
                              const listForm = document.querySelectorAll(".tab-form")
                              listForm.forEach(element => {
                                  element.classList.add("hidden")
                              });
                              const selectedForm = document.getElementById(tab + "-form")
                              selectedForm.classList.remove("hidden")
                          }
                      </script>
                      </html>`,
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
