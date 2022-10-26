import React from "react";
import { Modal } from "antd";
import { mappVariablesToTemplate } from "~/utilities/Template";

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
          return section.template ? (
            <div
              dangerouslySetInnerHTML={{
                __html: mappVariablesToTemplate(
                  section.template,
                  section.values
                ),
              }}
            ></div>
          ) : section.imageUrl ? (
            <img
              src={section.imageUrl}
              alt="image"
            />
          ) : null;
        })}
      </div>
    </Modal>
  );
}

export default PreviewModal;
