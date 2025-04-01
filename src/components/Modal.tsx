import "@/assets/css/components/Modal.css";
function Modal({
  children,
  modalTitle,
  modalId,
}: {
  children: React.ReactNode;
  modalTitle: string;
  modalId: string;
}) {
  return (
    <>
      <div
        className="modal fade"
        tabIndex={-1}
        id={modalId}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{modalTitle}</h5>
              <i className="bi bi-x-lg" data-bs-dismiss="modal"></i>
            </div>
            <div className="modal-body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
