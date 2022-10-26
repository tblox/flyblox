import React, { useEffect, useState } from "react";
import { Modal, Input, Form, Button } from "antd";

function AddNewPageModal({ isOpen, handleClose, onAddNewPage }) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  useEffect(() => {
    console.log("aa");
    setName("");
    setSlug("");
  }, [isOpen]);

  return (
    <Modal
      title="Add New Page"
      className="newpage-modal"
      open={isOpen}
      centered
      onCancel={handleClose}
      footer={[
        <Button
          type="primary"
          onClick={() => onAddNewPage({ name, slug })}
          disabled={name==="" || slug===""}
        >
          Submit
        </Button>,
      ]}
    >
      <div className="newpage">
        <Form
          name="basic"
          autoComplete="off"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <Form.Item
            label="Page name"
            rules={[{ required: true, message: "Please input page name!" }]}
          >
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Page slug"
            rules={[{ required: true, message: "Please input page slug!" }]}
          >
            <Input value={slug} onChange={(e) => setSlug(e.target.value)} />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}

export default AddNewPageModal;
