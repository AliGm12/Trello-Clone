import { remove } from "../../assets/icons";
import ModalActions from "./Modal Segments/ModalActions";
import ModalHeader from "./Modal Segments/ModalHeader";

export default function TaskModal({ card, onClose, listId, items, setItems }) {
  return (
    <div className="flex items-center justify-center absolute top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.6)]  pb-30">
      <div className="overflow-scrollbar2 w-[800px] h-[650px] mb-10 relative top-[3%]  bg-[#3c3d3e] rounded-2xl border-[1px] overflow-y-auto border-[rgba(255,255,255,0.4)] text-gray-300 p-4">
        <div className="flex flex-col justify-between">
          <div className="flex justify-between">
            {/* Header and Left Side-bar */}
            <ModalHeader card={card} items={items} setItems={setItems} listId={listId} />
            {/* Right Side-bar */}
            <div className="flex flex-col items-center justify-center gap-14 self-start">
              <span
                className="flex items-center justify-center hover:bg-[rgba(121,121,121,0.7)] transition-all self-end rounded-full w-10 h-10 cursor-pointer"
                onClick={onClose}
              >
                {remove}
              </span>

              <ModalActions card={card} items={items} setItems={setItems} listId={listId}/>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
