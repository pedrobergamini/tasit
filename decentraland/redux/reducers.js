import { combineReducers } from "redux";
import {
  SET_ACCOUNT,
  SELECT_LAND_TO_BUY,
  REMOVE_LAND_FOR_SALE,
  APPEND_LAND_FOR_SALE_TO_LIST,
  PREPEND_LAND_FOR_SALE_TO_LIST,
  SET_ACCOUNT_CREATION_STATUS,
  UPDATE_ACTION_FOR_ACCOUNT_CREATION_STATUS,
  SET_ACCOUNT_CREATION_ACTIONS,
  SET_LOADING_ASSETS_FOR_SALE_IN_PROGRESS,
  ADD_TO_MY_ASSETS_LIST,
  REMOVE_MY_ASSET_FROM_LIST,
  SET_MY_ASSETS_LIST,
} from "./actions";
import { removeFromList } from "@helpers";
import AccountCreationStatus from "@constants/AccountCreationStatus";
const { NOT_STARTED } = AccountCreationStatus;

const removeAssetFromList = (list, toRemove) => {
  const areEqual = (a1, a2) => a1.id === a2.id;
  return removeFromList(list, toRemove, areEqual);
};

// Note: Both asset and assetForSale objects have the `id` field as key
const removeAssetForSaleFromList = removeAssetFromList;

function accountInfo(
  state = {
    account: null,
    creationStatus: NOT_STARTED,
    creationActions: {},
  },
  action
) {
  const {
    type,
    account,
    creationStatus,
    creationStatusAction,
    creationActions,
  } = action;
  switch (type) {
    case SET_ACCOUNT:
      return { ...state, account };
    case SET_ACCOUNT_CREATION_STATUS:
      return { ...state, creationStatus };
    case UPDATE_ACTION_FOR_ACCOUNT_CREATION_STATUS: {
      const { status, action } = creationStatusAction;
      let { creationActions } = state;
      creationActions = { ...creationActions, [status]: action };
      return { ...state, creationActions };
    }
    case SET_ACCOUNT_CREATION_ACTIONS: {
      return { ...state, creationActions };
    }
    default:
      return state;
  }
}

function selectedLandToBuy(state = null, action) {
  const { type, landForSale } = action;
  switch (type) {
    case SELECT_LAND_TO_BUY:
      return landForSale;
    default:
      return state;
  }
}

function assetsForSale(state = { list: [], loadingInProgress: true }, action) {
  const { type, landForSale, loadingInProgress } = action;
  switch (type) {
    case PREPEND_LAND_FOR_SALE_TO_LIST:
      return { ...state, list: [landForSale, ...state.list] };
    case APPEND_LAND_FOR_SALE_TO_LIST:
      return { ...state, list: [...state.list, landForSale] };
    case REMOVE_LAND_FOR_SALE: {
      let { list: assetsForSale } = state;
      const list = removeAssetForSaleFromList(assetsForSale, landForSale);
      return { ...state, list };
    }
    case SET_LOADING_ASSETS_FOR_SALE_IN_PROGRESS:
      return { ...state, loadingInProgress };
    default:
      return state;
  }
}

function myAssets(state = { list: [] }, action) {
  const { type, myAsset, myAssets } = action;
  switch (type) {
    case ADD_TO_MY_ASSETS_LIST:
      return { ...state, list: [myAsset, ...state.list] };
    case REMOVE_MY_ASSET_FROM_LIST: {
      const { list: myAssets } = state;
      const list = removeAssetFromList(myAssets, myAsset);
      return { ...state, list };
    }
    case SET_MY_ASSETS_LIST: {
      const list = myAssets === null ? [] : myAssets;
      return { ...state, list };
    }
    default:
      return state;
  }
}

const decentralandApp = combineReducers({
  accountInfo,
  selectedLandToBuy,
  assetsForSale,
  myAssets,
});

export default decentralandApp;
