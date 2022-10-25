import React from "react";
import { HiTemplate } from "react-icons/hi";
import { RiLayoutMasonryFill } from "react-icons/ri";
import { FaPager } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from 'next/router'

SidebarLanding.propTypes = {};

const sidebarItems = [
  {
    id: 1,
    title: "Layout",
    url: "/landingpages/layout",
    icon: <RiLayoutMasonryFill />,
  },
  {
    id: 2,
    title: "Image",
    url: "/landingpages/live",
    icon: <FaPager />,
  },
  {
    id: 3,
    title: "Template",
    url: "/landingpages/template",
    icon: <HiTemplate />,
  },

];

function SidebarLanding(props) {
  const router = useRouter()

  return (
    <ul className="sidebar">
        {sidebarItems.map((item, index) => (
        <li
          key={index}
          id={item.id}
          className={router.pathname.includes(item.url) ? 'active' : ''}
        >
          <b></b>
          <b></b>
          <Link href={item.url}>
          <a>
            {item.icon}
            {item.title}
          </a>
          </Link>
        </li>
      ))}
     
    </ul>
  );
}

export default SidebarLanding;
