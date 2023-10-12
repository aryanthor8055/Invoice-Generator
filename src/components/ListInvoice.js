import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  deleteInvoice,
  editInvoice,
  invoiceState,
  setShowInvoiceModal,
} from "../store/invoice/invoiceSlice";
import InvoiceModal from "./InvoiceModal";
import { useNavigate } from "react-router-dom";
import { BiTrash, BiEditAlt } from "react-icons/bi";
import { Button, Card, Col, Row } from "react-bootstrap";

export default function ListInvoice() {
  const { invoicesList, showInvoiceModal } = useSelector(invoiceState);

  const Navigate = useNavigate();

  const dispatch = useDispatch();

  const openModal = (e, i) => {
    e.stopPropagation();
    dispatch(setShowInvoiceModal(i));
  };

  const closeModal = () => dispatch(setShowInvoiceModal(false));

  const deleteInvoiceHandler = (e, i) => {
    e.stopPropagation();
    dispatch(deleteInvoice(i));
  };

  const editInvoiceHandler = (e, i) => {
    e.stopPropagation();
    dispatch(editInvoice(i));
    Navigate("/edit-invoice");
  };

  return (
    <div className="w-75">
      <div className="d-flex flex-column ">
        <Button
          variant="success"
          className="d-block w-100 mt-4 mb-4"
          onClick={() => Navigate("/create-invoice")}
        >
          Create Invoice
        </Button>
        <Card className="p-4 p-xl-5 my-3 my-xl-4">
          {invoicesList.map(
            (
              {
                invoiceNumber,
                billFrom,
                currency,
                total,
                billTo,
                billToAddress,
                billToEmail,
                billFromAddress,
                billFromEmail,
                dateOfIssue,
              },
              i
            ) => (
              <div
                className="d-flex w-100 gap-4"
                role="button"
                key={i}
                onClick={(e) => openModal(e, i)}
              >
                <div className="d-flex flex-row justify-content-between align-items-start bg-light w-100 p-4">
                  <div className="">
                    <h4 className="fw-bold my-2">
                      {billFrom || "John Uberbacher"}
                    </h4>
                    <h6 className="fw-bold text-secondary mb-1">
                      Invoice #: {invoiceNumber || ""}
                    </h6>
                  </div>

                  <div className="text-end ms-auto">
                    <h6 className="fw-bold mt-1 mb-2">Amount&nbsp;Due:</h6>
                    <h5 className="fw-bold text-secondary">
                      {" "}
                      {currency} {total}
                    </h5>
                  </div>
                  <div
                    className="text-center d-flex flex-row justify-content-between align-items-center bg-light h-100"
                    style={{ minWidth: "50px", marginLeft: "20px" }}
                  >
                    <BiEditAlt
                      onClick={(e) => editInvoiceHandler(e, i)}
                      style={{
                        height: "33px",
                        width: "33px",
                        padding: "7.5px",
                      }}
                      className="text-white mt-1 btn btn-danger"
                    />
                  </div>
                  <div
                    className="text-center d-flex flex-row justify-content-between align-items-center bg-light h-100"
                    style={{ minWidth: "50px" }}
                  >
                    <BiTrash
                      onClick={(e) => deleteInvoiceHandler(e, i)}
                      style={{
                        height: "33px",
                        width: "33px",
                        padding: "7.5px",
                      }}
                      className="text-white mt-1 btn btn-danger"
                    />
                  </div>
                </div>
              </div>
            )
          )}
        </Card>
      </div>
      {showInvoiceModal !== false && (
        <InvoiceModal showModal={showInvoiceModal} closeModal={closeModal} />
      )}
    </div>
  );
}
