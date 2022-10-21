import React from "react";
import PropTypes from "prop-types";
import { HiTemplate } from "react-icons/hi";
import { RiLayoutMasonryFill } from "react-icons/ri";
import { FaPager } from "react-icons/fa";
import Link from "next/link";

SidebarLanding.propTypes = {};

const sidebarItems = [
  {
    id: 1,
    title: "Template",
    url: "/landingpages/layout",
    icon: <HiTemplate />,
  },
  {
    id: 2,
    title: "Layout",
    url: "/landingpages/layout",
    icon: <RiLayoutMasonryFill />,
  },
  {
    id: 3,
    title: "Live Pages",
    url: "/landingpages/layout",
    icon: <FaPager />,
  },
];

function SidebarLanding(props) {
  const [isActive, setIsActive] = React.useState(1);

  return (
    <ul className="sidebar">
     
        {sidebarItems.map((item, index) => (
        <li
          key={index}
          id={item.id}
          onClick={() => setIsActive(item.id)}
          className={isActive === item.id ? "active" : ""}
        >
          <b></b>
          <b></b>
          <a>
            {item.icon}
            {item.title}
          </a>
        </li>
      ))}
     
    </ul>
  );
}

export default SidebarLanding;
