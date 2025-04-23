import { useState } from 'react';
import { filter, plus, rightArrow, table, list } from '../../../assets/icons'

export default function ModalActions({ items, setItems, listId, card }) {
    const [nextListWarning, setNextListWarning] = useState("")
    const [prevListWarning, setPrevListWarning] = useState("")
    const moveToNextList = () => {
        let nextListId = `list-${+listId.slice(5) + 1}`
        if(items.listOrder.findIndex((el)=>el == nextListId) == -1){
            setNextListWarning(true)
        } else {
            let sourceList = items.lists[listId];
            let nextList = items.lists[nextListId];

            let newCardIds = sourceList.cardIds.filter(id => id !== card.cardId);
            let nextListCardIds = [...nextList.cardIds, card.cardId];
            setItems({
                ...items,
                lists : {
                    ...items.lists,
                    [sourceList.id] : {
                        ...sourceList,
                        cardIds : [
                            ...newCardIds
                        ]
                    },
                    [nextListId] : {
                        ...nextList,
                        cardIds : [
                            ...nextListCardIds
                        ]
                    }
                }
            })
        }
    }
    const movetoPrevList = () => {
        let prevListId = `list-${+listId.slice(5) - 1}`
        if(items.listOrder.findIndex((el)=>el == prevListId) == -1){
            setPrevListWarning(true)
        } else {
            let sourceList = items.lists[listId];
            let prevList = items.lists[prevListId];

            let newCardIds = sourceList.cardIds.filter(id => id !== card.cardId);
            let prevListCardIds = [...prevList.cardIds, card.cardId];
            setItems({
                ...items,
                lists : {
                    ...items.lists,
                    [sourceList.id] : {
                        ...sourceList,
                        cardIds : [
                            ...newCardIds
                        ]
                    },
                    [prevListId] : {
                        ...prevList,
                        cardIds : [
                            ...prevListCardIds
                        ]
                    }
                }
            })
        }
    }
  return (
    <div className="flex flex-col gap-2 w-40">
        <button
         onClick={moveToNextList}
         className="flex items-center gap-2 font-medium bg-[rgba(149,148,148,0.2)] text-sm p-[6px] rounded-sm hover:bg-[rgba(149,148,148,0.5)]">
            {rightArrow} Move to Next
        </button>
        <button
         onClick={movetoPrevList}
         className="flex items-center gap-2 font-medium bg-[rgba(149,148,148,0.2)] text-sm p-[6px] rounded-sm hover:bg-[rgba(149,148,148,0.5)]">
            <span className='rotate-180'>{rightArrow}</span> Move to Previous
        </button>
        <button className="flex items-center gap-2 font-medium bg-[rgba(149,148,148,0.2)] text-sm p-[6px] rounded-sm hover:bg-[rgba(149,148,148,0.5)]">
            {list} Members
        </button>
        <button className="flex items-center gap-2 font-medium bg-[rgba(149,148,148,0.2)] text-sm p-[6px] rounded-sm hover:bg-[rgba(149,148,148,0.5)]">
            {filter} Labels
        </button>
        <button className="flex items-center gap-2 font-medium bg-[rgba(149,148,148,0.2)] text-sm p-[6px] rounded-sm hover:bg-[rgba(149,148,148,0.5)]">
            {plus} Checklist
        </button>
        <button className="flex items-center gap-2 font-medium bg-[rgba(149,148,148,0.2)] text-sm p-[6px] rounded-sm hover:bg-[rgba(149,148,148,0.5)]">
            {table} Attachment
        </button>
        {
            nextListWarning 
            &&
            <div className='text-red-600 font-medium text-sm'>There is no next list.</div>
        }
        {
            prevListWarning 
            &&
            <div className='text-red-600 font-medium text-sm'>There is no prev list.</div>
        }
    </div>
  )
}
