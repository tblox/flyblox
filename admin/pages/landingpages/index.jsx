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

const LandingPage = () => {

  const dispatch = useDispatch();

  const [title_contains, setTitle_contains] = useState("");
  const [openModalAddPage, setOpenModalAddPage] = useState(false);
  const [listPage, setListPage] = useState([]);

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
        console.log("aaaa",res)
        router.push(`/landingpages/${res.data.pageId}`)
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
            <TableLandingPages title_contains={title_contains} />
          </div>
        </div>
      </section>
      <AddNewPageModal 
      isOpen={openModalAddPage}
      handleClose={() => setOpenModalAddPage(false)}
      onAddNewPage={onAddNewPage}
      />
    </ContainerDefault>
  );
};

export default connect((state) => state.app)(LandingPage);
