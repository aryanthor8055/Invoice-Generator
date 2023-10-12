import { createSlice } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";

const generateID = () => {
  let id = 1;
  return () => {
    return id++;
  };
};

const getId = generateID();

const getInitialInvoice = () => {
  return {
    currency: "$",
    currentDate: "",
    invoiceNumber: getId(),
    dateOfIssue: "",
    billTo: "",
    billToEmail: "",
    billToAddress: "",
    billFrom: "",
    billFromEmail: "",
    billFromAddress: "",
    notes: "",
    total: "0.00",
    subTotal: "0.00",
    taxRate: "",
    taxAmmount: "0.00",
    discountRate: "",
    discountAmmount: "0.00",
    items: [
      {
        id: "0",
        name: "",
        description: "",
        price: "1.00",
        quantity: 1,
      },
    ],
  };
};

const initialState = {
  showInvoiceModal: false,

  currentInvoice: getInitialInvoice(),

  currrentEditIndex: null,

  invoicesList: [],
};

export const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    saveInvoice: (state) => {
      let list = cloneDeep(state.invoicesList);
      if (state.currrentEditIndex !== null) {
        list = [
          ...list.filter((_, i) => i !== state.currrentEditIndex),
        ];
        state.currrentEditIndex = null;
      }
      state.invoicesList = [state.currentInvoice, ...list];
      state.currentInvoice = getInitialInvoice();
    },

    changeInvoice: (state, action) => {
      state.currentInvoice = { ...state.currentInvoice, ...action.payload };
    },

    deleteInvoice: (state, action) => {
      state.invoicesList = [
        ...state.invoicesList.filter((_, i) => i !== action.payload),
      ];
    },

    setShowInvoiceModal: (state, action) => {
      state.showInvoiceModal = action.payload;
    },

    editInvoice: (state, action) => {
      state.currrentEditIndex = action.payload;
      state.currentInvoice = state.invoicesList[action.payload];
    },
  },
});

export const {
  saveInvoice,
  changeInvoice,
  setShowInvoiceModal,
  deleteInvoice,
  editInvoice,
} = invoiceSlice.actions;

export const invoiceState = (state) => state.invoice;

export default invoiceSlice.reducer;
