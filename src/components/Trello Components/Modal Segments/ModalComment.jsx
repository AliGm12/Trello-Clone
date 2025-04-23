import  { useRef } from "react";
import { activity } from "../../../assets/icons";

export default function ModalComment({ items, setItems, listId, card }) {
  const textAreaRef = useRef(null)
  const createComment = (event) => {
    if(event.code == "Enter"){
      event.preventDefault()
      let commentArr = card.comment.slice();
      commentArr = [...commentArr,textAreaRef.current.value]
      textAreaRef.current.value = ""
      setItems({
        ...items,
        cards : {
          ...items.cards,
          [card.cardId] : {
            ...card,
            comment : [
              ...commentArr
            ]
          }
        }
      })
      console.log(textAreaRef.current.value, card, commentArr,items);
    }
  }
  return (
    <div className="flex flex-col gap-2 mt-5">
      <div className="flex justify-between ">
        <div className="flex gap-3 relative -left-9">
          <span> {activity} </span>
          <span className="font-medium"> Activity </span>
        </div>
        <div>
          <button className="font-medium bg-[rgba(149,148,148,0.2)] p-1 rounded-sm">
            Show details
          </button>
        </div>
      </div>
      <div className="flex gap-2 relative -left-9 w-[106.5%]">
        <span className="bg-blue-600 rounded-full w-8 h-8 flex items-center font-medium justify-center cursor-pointer">
          AG
        </span>
        <textarea
          className="px-2 h-9 pt-2 bg-[rgba(0,0,0,0.4)] rounded-lg text-sm w-full"
          onKeyDown={(e)=>{createComment(e)}}
          ref={textAreaRef}
          placeholder="Write a comment..."
        ></textarea>
      </div>
    {
      card.comment.map((comment, index)=>{

        return(
          <div key={index} className="flex gap-2 text-gray-300 mb-2 w-full">
            <div>
              <span className="bg-blue-600 rounded-full w-8 h-8 flex items-center font-medium justify-center cursor-pointer">AG</span>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Ali Golmaryami</span>
                  <span className="text-xs">Just now</span>
              </div>
              <div className="bg-[rgba(0,0,0,0.4)] rounded-lg p-2 w-full">
                  {comment}
              </div>
              <div className="flex gap-1 text-xs ">
                <button>. Edit</button>
                <button>. Delete</button>
              </div>
            </div>
          </div>
        )
      })
    }
    </div>
  );
}
