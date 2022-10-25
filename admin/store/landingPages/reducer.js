import { actionTypes } from "./action";

export const initState = {
  landingPage: [],
  templates: [],
  currentPage: null,
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
        currentPage: actions.payload
      }
      case actionTypes.SET_CURRENT_SECTION:
        return {
          ...state,
          currentSection: actions.payload
        }
    default:
      return state;
  }
}

export default reducer;
