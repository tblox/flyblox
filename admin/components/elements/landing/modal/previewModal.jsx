import React from "react";
import { Modal } from "antd";
import { mappVariablesToTemplate } from "~/utilities/Template";
import { SECTION_TYPE } from "~/constants";

function PreviewModal({ isOpen, handleClose, page }) {

  return (
    <Modal
      title="Preview Page"
      className="preview-modal"
      open={isOpen}
      centered
      onCancel={handleClose}
      footer={[]}
    >
      <div className="preview-page">
        {page?.sections?.map((section) => {
          return section.typeSection === SECTION_TYPE.FORM ? (
            <div
              dangerouslySetInnerHTML={{
                __html: mappVariablesToTemplate(
                  section.data?.template,
                  section.data?.formProps
                ),
              }}
            ></div>
          ) : section.typeSection === SECTION_TYPE.IMAGE ? (
            <img
              src={section.data?.imageUrl}
              alt="image"
            />
          ) : null;
        })}
      </div>
    </Modal>
  );
}

export default PreviewModal;
