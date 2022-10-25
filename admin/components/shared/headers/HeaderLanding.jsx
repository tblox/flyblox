import React from "react";
import PropTypes from "prop-types";
import { AiFillEye } from "react-icons/ai";
import { IoRocketSharp } from "react-icons/io5";
import { BsBroadcast } from "react-icons/bs";

HeaderLanding.propTypes = {};

function HeaderLanding({onPreview}) {
  const [isLive, setLive] = React.useState(false);

  const handleChangeLive = () => {
    setLive(!isLive);
  };

  return (
    <div className="header-landing">
      {isLive ? (
        <button onClick={handleChangeLive} className="button header-landing__live">
          <BsBroadcast className="button__icon" />
          Live
        </button>
      ) : (
        <button onClick={handleChangeLive} className="button header-landing__notlive">
          <BsBroadcast className="button__icon" />
          Not Live
        </button>
      )}

      <div className=" header-landing__group">
        <button className="button">Save Changes</button>
        <button className="button" onClick={onPreview}>
          <AiFillEye />
          Preview
        </button>
        <button className="button">
          <IoRocketSharp />
          Go Live
        </button>
      </div>
    </div>
  );
}

export default HeaderLanding;
