
// eslint-disable-next-line react/prop-types
function Confirmation({onClose, onDelete, isDeleleting}) {
  return (
    <>
      <div className="fixed inset-0 flex w-full items-center justify-center z-50">
        <div className="modal modal-open">
          <div className="modal-box max-w-xs">
            <h3 className="font-bold text-lg">តើអ្នកពិតជាចង់លុបពិតប្រាកដមែនទេ?</h3>
            <p className="py-2">
                ប្រសិនបើអ្នកលុបហើយ គឺលុបជារៀងរហូតមិនអាចយកមកវិញបានទេ!
            </p>

            <div className="modal-action">
              {/* Confirm Button */}
              <button disabled={isDeleleting} onClick={onDelete} className="btn btn-sm text-white btn-error">
                លុប
              </button>

              {/* Cancel Button */}
              <button onClick={onClose} className="btn btn-sm">
                បោះបង់
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Confirmation;
