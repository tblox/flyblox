import React, { useCallback } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { mappVariablesToTemplate } from "~/utilities/Template";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { SECTION_TYPE } from "~/constants";

const FrameStrip = ({
  listFrame,
  currentFrame,
  setCurrentFrame,
  onAddNewFrame,
  onReorderFrame
}) => {

  const scaledWrapper = useCallback(
    (node) => {
      if (node === null) {
      } else {
        applyScaling(node);
      }
    },
    [listFrame]
  );

  const getListStyle = isDraggingOver => ({
    display: 'flex',
    overflow: 'auto',
  });

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const frames = reorder(
      listFrame,
      result.source.index,
      result.destination.index
    );
    onReorderFrame(frames);
  };

  const reorder = (list, startIndex, endIndex) => {
    console.log({ list, startIndex, endIndex });
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const applyScaling = (scaledWrapper) => {
    const listContent = scaledWrapper.getElementsByClassName("template");
    for (let index = 0; index < listContent.length; index++) {
      const element =
        listContent[index].getElementsByClassName("template__content")?.[0];
      if (element.style.transform === "") {
        let { width: cw, height: ch } = element?.getBoundingClientRect();
        let { width: ww, height: wh } =
          listContent[index].getBoundingClientRect();
        let scaleAmtX = Math.max(ww / cw, wh / ch);
        let scaleAmtY = scaleAmtX;
        const translateX =
          cw * scaleAmtX > ww
            ? `translateX(${-(cw * scaleAmtX - ww) / 2 / scaleAmtX}px)`
            : "";
        const translateY =
          ch * scaleAmtY > wh
            ? `translateY(${-(ch * scaleAmtY - wh) / 2 / scaleAmtY}px)`
            : "";
        element.style.transform = `scale(${scaleAmtX}, ${scaleAmtY}) ${translateX} ${translateY}`;
      }
    }
  };

  return (
    <div className="framestrip" ref={scaledWrapper}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}
            >
              {listFrame.map((item, index) => (
                <Draggable key={item.tempID} draggableId={String(item.tempID)} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div
                        key={index}
                        onClick={() => setCurrentFrame(item)}
                        className={`framestrip__item ${
                          currentFrame?.tempID === item.tempID
                            ? "framestrip__item--selected"
                            : ""
                        } `}
                      >
                        <div className="framestrip__frame">
                          {item.typeSection === SECTION_TYPE.FORM && (
                            <div className="template">
                              <div
                                className="template__content"
                                id={item.data?.templateID}
                                dangerouslySetInnerHTML={{
                                  __html: mappVariablesToTemplate(
                                    item.data?.template,
                                    item.data?.formProps
                                  ),
                                }}
                              ></div>
                              <div className="overlay"></div>
                            </div>
                          )}
                          {item.typeSection === SECTION_TYPE.IMAGE && (
                            <img src={item.data?.imageUrl} />
                          )}
                        </div>
                        <div className="framestrip__order">
                          <span>{index + 1}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Button
        icon={<PlusOutlined />}
        className="btn-add-frame"
        onClick={onAddNewFrame}
      />
    </div>
  );
};

export default FrameStrip;
