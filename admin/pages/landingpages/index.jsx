import React, { useEffect, useState } from "react";
import ContainerDefault from "~/components/layouts/ContainerDefault";
import HeaderDashboard from "~/components/shared/headers/HeaderDashboard";
import { connect, useDispatch } from "react-redux";
import { toggleDrawerMenu } from "~/store/app/action";
import FrameStrip from "~/components/shared/previews/FrameStrip";

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
const LandingPage = () => {
  const dispatch = useDispatch();
  const [title_contains, setTitle_contains] = useState("");
  const [currentSection, setCurrentSection] = useState(null);
  const [listSection, setListSection] = useState(fakeData)
  useEffect(() => {
    dispatch(toggleDrawerMenu(false));
  }, []);

  const onAddNewSection = () => {
    setListSection([...listSection, {id: (new Date()).getTime()}])
  }

  console.log({listSection})

  return (
    <ContainerDefault>
      <HeaderDashboard
        title="landingPages"
        description="Martfury Category Listing"
      />
      <FrameStrip
        listFrame={listSection}
        currentFrame={currentSection}
        setCurrentFrame={setCurrentSection}
        onAddNewFrame={onAddNewSection}
      />
    </ContainerDefault>
  );
};
export default connect((state) => state.app)(LandingPage);
