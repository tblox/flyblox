import React, { useState } from "react";
import { BiUpload } from "react-icons/bi";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import UploadImage from "~/repositories/UploadImage";
import { setCurrentSection } from "~/store/landingPages/action";

function LandingLayout({}) {

  const dispatch = useDispatch();
  const { currentSection } = useSelector((store) => store.landingPage);

  const onChangeTemplateValue = (property, value) => {
    const section = JSON.parse(JSON.stringify(currentSection))
    const values = section.values
    values[property] = value
    console.log(section.values)
    dispatch(setCurrentSection(section))
  }

  const onUploadImage = (event) => {
    event.preventDefault();
    const file = event.target.files?.[0]
    if(file) {
      UploadImage.uploadImage({image: file}).then(res => {
        onChangeTemplateValue("urlImage", res.data.imageUrl)
    })
    }
  };

  return (
    <>
    {
      currentSection?.values ? 
      <div className="form__control">
      <div className="form__control__header">
        <p>Button</p>
        <BsFillPlusSquareFill />
      </div>
      <div className="form__control__item">
        <p>Button Text</p>
        <div className="form__control__item__input">
          <input type="text" value={currentSection?.values.textBtn} onChange={(e)=>onChangeTemplateValue("textBtn", e.target.value)} placeholder="Button Text" name="search"></input>
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
            value={currentSection?.values.textColor}
            onChange={(e)=>onChangeTemplateValue("textColor", e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="Text Color"
            name="search"
            value={currentSection?.values.textColor}
            onChange={(e)=>onChangeTemplateValue("textColor", e.target.value)}
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
        <p>Button Color</p>
        <div className="form__control__item__input">
          <input
            className="form__control__item__input--color"
            type="color"
            id="button-color"
            name="button-color"
            value={currentSection?.values.bgColor}
            onChange={(e)=>onChangeTemplateValue("bgColor", e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="Color Hex"
            name="color-hex"
            value={currentSection?.values.bgColor}
            onChange={(e)=>onChangeTemplateValue("bgColor", e.target.value)}
          ></input>
        </div>
      </div>
      {/* <div className="form__control__item">
        <p>Button Style</p>
        <select
          name="button-styles"
          id="button-styles"
          defaultValue={"default"}
          className="form__control__item__input"
        >
          <option value="default">Default</option>
        </select>
      </div> */}
      <div className="form__control__item">
        <p>Form Placement on image #</p>
        <select
          name="form-location"
          id="form-location"
          value={currentSection?.values.location}
          onChange={e => onChangeTemplateValue("location", e.target.value)}
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
            <p className="button__upload-description">PNG, JPEG, WEBP, SVG</p>
          </button>
          <input type="file" name="file" onChange={onUploadImage} />
        </div>
      </div>
    </div> : <></>
    }
  </>
  )
}

export default LandingLayout;
