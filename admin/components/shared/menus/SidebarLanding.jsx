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
    title: "Live Pages",
    url: "/landingpages/live",
    icon: <FaPager />,
  },
  {
    id: 2,
    title: "Template",
    url: "/landingpages/template",
    icon: <HiTemplate />,
  },
  {
    id: 3,
    title: "Layout",
    url: "/landingpages/layout",
    icon: <RiLayoutMasonryFill />,
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
