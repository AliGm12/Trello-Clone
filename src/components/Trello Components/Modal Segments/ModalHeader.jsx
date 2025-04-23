import { circle, down, eye, plus} from '../../../assets/icons'
import ModalDescription from './ModalDescription'
import ModalComment from './ModalComment'

export default function ModalHeader({items, listId, card, setItems}) {
  return (
    <div className="flex flex-col gap-2 p-8 pl-10 w-full">
        <h1 className="flex items-center gap-4 text-xl font-medium relative -left-9">
        {" "}
        {circle} {card.cardTitle}
        </h1>
        <div className="flex gap-1 items-center text-xs text-gray-300">
            <span>in list </span>
            <span className="flex font-medium items-center px-1 bg-[rgba(121,121,121,0.7)] rounded">
                {" "}
                {items.lists[listId].title}
                {down}
            </span>
            <span>{eye}</span>
        </div>
        <div className="flex gap-4 mt-5 text-xs text-gray-300">
            <div className="flex flex-col gap-2">
                <span>Members</span>
                <div className="flex gap-1">
                <span className="bg-blue-600 rounded-full w-8 h-8 flex items-center font-medium justify-center cursor-pointer">
                    AG
                </span>
                <span className="bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer">
                    {plus}
                </span>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <span>Notifications</span>
                <button className="flex items-center gap-1 rounded bg-gray-700 p-2 text-sm">
                {eye} Watching {down}
                </button>
            </div>
        </div>
        <ModalDescription />
        <ModalComment items={items} setItems={setItems} listId={listId} card={card}/>
    </div>
  )
}
