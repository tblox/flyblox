import { sortBy } from "~/utilities/Array";
import { actionTypes } from "./action";

export const initState = {
  landingPage: [],
  templates: [],
  currentPage: null,
  currentSection: null,
  loadingTemplates: false,
  loadingSavePage: false,
  loadingPageDetails: false,
};

function reducer(state = initState, actions) {
  switch (actions.type) {
    case actionTypes.GET_LANDING_PAGE:
      return {
        ...state,
        landingPage: actions.payload,
      };
    case actionTypes.GET_ALL_TEMPLATE:
      return {
        ...state,
        loadingTemplates: true,
      };
    case actionTypes.GET_ALL_TEMPLATE_SUCCESS:
      return {
        ...state,
        loadingTemplates: false,
        templates: actions.payload,
      };
    case actionTypes.GET_ALL_TEMPLATE_FAILED:
      return {
        ...state,
        loadingTemplates: false,
      };
    case actionTypes.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: actions.payload,
      };
    case actionTypes.SET_CURRENT_SECTION:
      const section = actions.payload;
      const page = JSON.parse(JSON.stringify(state.currentPage));
      const existedSectionIndex = page.sections.findIndex(
        (s) => s.tempID === section.tempID
      );
      if (existedSectionIndex !== -1) {
        page.sections[existedSectionIndex] = actions.payload;
      } else {
        page.sections.push(section);
      }
      return {
        ...state,
        currentPage: page,
        currentSection: actions.payload,
      };
    case actionTypes.SAVE_PAGE_CHANGES:
      return {
        ...state,
        loadingSavePage: true,
      };
    case actionTypes.SAVE_PAGE_CHANGES_SUCCESS:
      const newSections = sortBy(actions.payload.map(sec => {
        return {
          ...sec,
          tempID: sec._id
        }
      }), 'order')
      const  oldPage= JSON.parse(JSON.stringify(state.currentPage));
      oldPage.sections = newSections
      return {
        ...state,
        loadingSavePage: false,
        currentPage: oldPage,
        currentSection: newSections[newSections.length - 1]
      };
    case actionTypes.SAVE_PAGE_CHANGES_FAILED:
      return {
        ...state,
        loadingSavePage: false,
      };
    case actionTypes.GET_PAGE_DETAILS:
      return {
        ...state,
        loadingPageDetails: true,
      };
    case actionTypes.GET_PAGE_DETAILS_SUCCESS:
      const sections = actions.payload?.sections
      const temp = sortBy(sections.map(sec => {
        return {
          ...sec,
          tempID: sec._id
        }
      }), 'order')
      return {
        ...state,
        loadingPageDetails: false,
        currentPage: {...actions.payload, sections: temp},
        currentSection: temp[temp.length - 1]
      };
    case actionTypes.GET_PAGE_DETAILS_FAILED:
      return {
        ...state,
        loadingPageDetails: false,
      };
    default:
      return state;
  }
}

export default reducer;
