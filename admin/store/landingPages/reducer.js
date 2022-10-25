import { actionTypes } from "./action";

export const initState = {
  landingPage: [],
  templates: [],
  currentPage: {
    name: "abc",
    sections: [],
  },
  currentSection: null,
  loadingTemplates: false,
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
      const existedSectionIndex = page.sections.findIndex((s) => s._id === section._id);
      if (existedSectionIndex !== -1) {
        page.sections[existedSectionIndex] = actions.payload
      } else {
        page.sections.push(section);
      }
      return {
        ...state,
        currentPage: page,
        currentSection: actions.payload,
      };
    default:
      return state;
  }
}

export default reducer;
