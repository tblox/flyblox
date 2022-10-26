import React, { useEffect, useState } from "react";
import ContainerDefault from "~/components/layouts/ContainerDefault";
import TableLandingPages from "~/components/shared/tables/TableLandingPages";
import HeaderDashboard from "~/components/shared/headers/HeaderDashboard";
import FormSearchSimple from "~/components/shared/forms/FormSearchSimple";
import { connect, useDispatch } from "react-redux";
import { toggleDrawerMenu } from "~/store/app/action";
import AddNewPageModal from "~/components/elements/landing/modal/addNewPageModal";
import LandingPageRepository from "~/repositories/LandingPageRepository";
import router from "next/router";
import LandingLivePages from "~/components/elements/landing/livePages";
import LivePage from "~/components/elements/landing/livePage";
import { useSelector } from "react-redux";
import PreviewModal from "~/components/elements/landing/modal/previewModal";


const LIVE_PAGES = [
  { title: "page 1" },
  { title: "page 2" },
  { title: "page 3" },
  { title: "page 4" },
  { title: "page 5" },
  { title: "page 6" },
  { title: "page 7" },
  { title: "page 8" },
  { title: "page 9" },
];

const LandingPage = () => {

  const dispatch = useDispatch();

  const [title_contains, setTitle_contains] = useState("");
  const [openModalAddPage, setOpenModalAddPage] = useState(false);
  const [listPage, setListPage] = useState([]);
  const [previewModal, setPreviewModal] = useState(null);
  const {currentSection} = useSelector(store => store.landingPage)
  useEffect(() => {
    dispatch(toggleDrawerMenu(false));
    getListPage();
  }, []);

  const getListPage = () => {
    LandingPageRepository.getListLandingPage().then(res => {
        setListPage(res.data)
    })
  }

  const onOpenModalAddPage = () => {
    setOpenModalAddPage(true)
  };

  const onAddNewPage = ({name, slug}) => {
    LandingPageRepository.addLandingPage({pageName: name, pageSlug: slug}).then(res => {
        setOpenModalAddPage(false)
        onOpenEditPage(res.data.pageId)
    })
  }

  const onOpenEditPage = (pid)=> {
    router.push(`/landingpages/${pid}`)
  }

  const onPreviewPage = (pid)=> {
    LandingPageRepository.getPageDetails({id: pid}).then(res => {
      setPreviewModal(res.data)
    })
  }

  return (
    <ContainerDefault>
      <HeaderDashboard
        title="landingPages"
        description="Martfury Category Listing"
      />
      <section className="ps-dashboard ps-items-listing">
        <div className="ps-section__left">
          <div className="ps-section__header">
            <FormSearchSimple onChange={setTitle_contains} />
            <div className="button ps-section__group">
              <button className="ps-btn success" onClick={onOpenModalAddPage}>
                <i className="icon icon-plus mr-2" />
                New Page
              </button>
            </div>
          </div>
          <div className="ps-section__content">
          <div className="live-pages">
                {listPage.map((page) => (
                  <LivePage
                    key={page._id}
                    onPreview={() =>onPreviewPage(page._id)}
                    title={page.pageName}
                    currentFrame={currentSection}
                    onOpenEditPage={() =>onOpenEditPage(page._id)}
                  />
                ))}
              </div>
          </div>
        </div>
      </section>
      <AddNewPageModal 
      isOpen={openModalAddPage}
      handleClose={() => setOpenModalAddPage(false)}
      onAddNewPage={onAddNewPage}
      />
       <PreviewModal
        isOpen={!!previewModal}
        handleClose={() => setPreviewModal(null)}
        page={previewModal}
      />
    </ContainerDefault>
  );
};

export default connect((state) => state.app)(LandingPage);
