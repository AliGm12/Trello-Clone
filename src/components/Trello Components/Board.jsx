import  { useState, useEffect, useRef } from "react";
import { DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import { plus } from "../../assets/icons";
import TaskModal from "./TaskModal";

// static obj of lists and cards
const groupData = {
    lists : {
        "list-1" : {id : "list-1", title : "To Do", cardIds : ["card-1", "card-2", "card-3"], addTask : false, taskValue : "",taskWarning: ""},
        "list-2" : {id : "list-2", title : "Doing", cardIds : ["card-4", "card-5"], addTask : false, taskValue : "",taskWarning: ""},
        "list-3" : {id : "list-3", title : "Done", cardIds : ["card-6"], addTask : false, taskValue : "",taskWarning: ""}
    },
    cards : {
        "card-1" : { cardId: "card-1", cardTitle : "Playing Guitar", comment : []},
        "card-2" : { cardId: "card-2", cardTitle : "Playing Piano", comment : []},
        "card-3" : { cardId: "card-3", cardTitle : "Playing Tennis", comment : []},
        "card-4" : { cardId: "card-4", cardTitle : "Playing Basketball", comment : []},
        "card-5" : { cardId: "card-5", cardTitle : "Playing Valleyball", comment : []},
        "card-6" : { cardId: "card-6", cardTitle : "Playing Football", comment : []},
    },
    listOrder : ["list-1", "list-2", "list-3"]
};

const Board = () => {
    const [items, setItems] = useState(groupData);
    const [addList, setAddlist] = useState(false);
    const [listValue, setListValue] = useState("");
    const [warning,setWarning] = useState("");
    const [selectedTask,setSelectedTask] = useState(null); // null = modal closed
    const myAddListElement = useRef(null);
    const myAddTaskElements = useRef({});

    // Add this to your component
    useEffect(() => {
        console.log('addList state changed:', items, selectedTask);
    }, [items,selectedTask]);

    const onDragEnd = (result) => {
        // outside the Source and Dest
        if(!result.destination) return;
        //  same Source and Dest and index
        if(result.destination.droppableId === result.source.droppableId
            && result.destination.index === result.source.index
        ) return;
        //catching source and dest list.
        let sourceList = items.lists[result.source.droppableId];
        let destinationList = items.lists[result.destination.droppableId];
        // same Source and Dest (NOT the same index)
        if(result.destination.droppableId === result.source.droppableId){
            let newCardIds = sourceList.cardIds.slice()
            newCardIds.splice(result.source.index,1);
            newCardIds.splice(result.destination.index,0,result.draggableId);

            const newList = {
                ...sourceList,
                cardIds : newCardIds
            }
            setItems({
                ...items,
                lists : {
                    ...items.lists,
                    [newList.id] : newList

                }  
            })
            // different Source and Dest 
        }else{
            let newCardIds = sourceList.cardIds.slice();
            let newCardDestIds = destinationList.cardIds.slice();
            newCardIds.splice(result.source.index, 1);
            newCardDestIds.splice(result.destination.index, 0, result.draggableId);
            // rewrite the lists
            const newSourceList = {
                ...sourceList,
                cardIds : newCardIds
            }
            const newDestList = {
                ...destinationList,
                cardIds : newCardDestIds  
            }
            setItems({
                ...items,
                lists : {
                    ...items.lists,
                    [newSourceList.id] : newSourceList,
                    [newDestList.id] : newDestList
                }
            })
        }

    }

    const handleSave = () => {
        const inputLength = myAddListElement.current.value.length;
        // Validate input:  (3 characters or less or empty)
        if(inputLength == 0){
            setWarning("Please enter a name for the list.");
        } else if (inputLength <= 3){
            setWarning("List name must be more than 3 characters.");
        } 
        // Add validated list to lists object
        else {
            let max = +Object.keys(items.lists)[0].slice(5);
            for(let key in items.lists){
                if( +key.slice(5) > max ){
                    max = +key.slice(5)
                }
            }
            let key = `list-${max + 1}`;
            let newList = {
                [key] : {
                    id : key,
                    title : myAddListElement.current.value,
                    cardIds : []
                }
            }
            setItems({
                ...items,
                lists : {
                    ...items.lists,
                    ...newList
                },
                listOrder : [
                    ...items.listOrder,
                    key
                ]
            })
            // Hide the add list menu, clear warning messages, and reset the input value
            setAddlist(false);
            setWarning("");
            setListValue("");
        }

    }
    const addCard = (list, card) => {
        const inputValue = myAddTaskElements.current[list.id].value;
        // Validate input:  (3 characters or less or empty)
        if(inputValue.length == 0){
            setItems({
                ...items,
                lists : {
                    ...items.lists,
                    [list.id] : {
                        ...list,
                        taskWarning : "Please enter a name for the task."
                    }
                }
            })
        } else if (inputValue.length <= 3){
            setItems({
                ...items,
                lists : {
                    ...items.lists,
                    [list.id] : {
                        ...list,
                        taskWarning : "Task name must be more than 3 characters."
                    }
                }
            })
        } 
        
        else {
            console.log(list,card);
            let max = +Object.keys(items.cards)[0].slice(5);
            for(let key in items.cards){
                if( +key.slice(5) > max ){
                    max = +key.slice(5)
                }
            }
            let key = `card-${max + 1}`;
            let newTask = {
                [key] : {
                    cardId : key,
                    cardTitle : inputValue,
                    comment : []
                }
            }
            setItems({
                ...items,
                cards : {
                    ...items.cards,
                    ...newTask
                },
                lists : {
                    ...items.lists,
                    [list.id] : {
                        ...list,
                        taskWarning : "",
                        taskValue : "",
                        addTask : false,
                        cardIds : [
                            ...list.cardIds,
                            key
                        ]
                    }
                }
            })
        }
    }

    const handleCancel = () => {
        setAddlist(false);
    }
    const findListId = (card) => {
        for(let key in items.lists){
            let cardIds = items.lists[key].cardIds;
            if(cardIds.findIndex((cardId)=>cardId == card) != -1){
                return key
            }
        }

    }

  return (
    <>
    <DragDropContext onDragEnd={onDragEnd}>
        <div className="overflow-scrollbar flex items-start overflow-y-auto h-[90%] gap-6 p-6">
        {
            items.listOrder.map(listId=>{
                const list = items.lists[listId];
                const cards = list.cardIds.map(card=>items.cards[card])
                // console.log(cards);

                return (
                    <Droppable key={list.id} droppableId={list.id}>
                    {
                        (dropZone)=>{
                            // console.log(dropZone);
                            return (
                                <div className="bg-black w-64 min-h-52 shadow-lg rounded-lg flex-shrink-0 p-4">
                                    <h2 className="mb-3 text-gray-200">{list.title}</h2>
                                    <div className=" text-white min-h-40"
                                    ref={dropZone.innerRef}
                                    {...dropZone.droppableProps}>
                                        {
                                            cards.map((card,index)=>{
                                                return (
                                                    <Draggable key={card.cardId} draggableId={card.cardId} index={index}>
                                                    {
                                                        (dragItem)=>{
                                                            // console.log(dragItem);
                                                            return (
                                                                <div
                                                                className="bg-slate-800 rounded-md p-2 mb-2 text-gray-300"
                                                                onClick={()=>{setSelectedTask(card.cardId)}}
                                                                ref={dragItem.innerRef} 
                                                                {...dragItem.dragHandleProps}
                                                                {...dragItem.draggableProps}>
                                                                    {card.cardTitle}
                                                                </div>
                                                            )
                                                        }
                                                    }
                                                    </Draggable>
                                                )
                                            })
                                        }
                                        {
                                            dropZone.placeholder
                                        }
                                    </div>
                                    {
                                        list.addTask ? (
                                            <div className="flex flex-col gap-4">
                                                <input
                                                    className="bg-gray-800 border-2 border-blue-400 hover:border-black rounded text-gray-300  pt-1 pb-9 text-sm px-2"
                                                    value={list.taskValue}
                                                    ref={(el) => (myAddTaskElements.current[list.id] = el)}
                                                    placeholder="Enter a title of paste a link"
                                                    onChange={(e) =>{
                                                        setItems({
                                                            ...items,
                                                            lists : {
                                                                ...items.lists,
                                                                [list.id] : {
                                                                    ...list,
                                                                    taskValue : e.currentTarget.value

                                                                }
                                                            }
                                                        })
                                                        
                                                    } }
                                                />
                                                {
                                                    list.taskWarning && <span className="text-red-700 text-sm">{list.taskWarning}</span>
                                                }
                                                <div className="flex gap-2 items-center">
                                                    <button onClick={()=>{addCard(list,cards)}} className="bg-blue-400 p-1 text-sm font-medium px-2 rounded" >Add card</button>
                                                    <button onClick={()=>{
                                                        setItems({
                                                                ...items,
                                                                lists : {
                                                                    ...items.lists,
                                                                    [list.id] : {
                                                                        ...list,
                                                                        addTask : false
                                                                        }
                                                                    }
                                                                })
                                                    }} className="text-gray-300">
                                                        <svg width="20" height="20" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12Z" fill="currentColor"></path></svg>
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div 
                                            className="flex items-center p-2 text-sm text-gray-400 font-medium gap-3 cursor-pointer hover:bg-gray-700 rounded-lg"
                                            onClick={()=>{
                                                
                                                setItems({
                                                    ...items,
                                                    lists : {
                                                        ...items.lists,
                                                        [list.id] : {
                                                            ...list,
                                                            addTask : true
                                                        }
                                                    }
                                                })
                                            }}
                                        >
                                            { plus }
                                            <span>Add a task</span>
                                        </div> 
                                        )
                                    }
                                </div>
                            )
                        }
                    }
                    </Droppable>
                )
            })
        }
        <div className="w-64 ">
        {addList ? (
            <div className="flex flex-col bg-black rounded-xl w-64 px-3 py-2 gap-2">
            <input
                className="bg-gray-800 outline-blue-400 rounded text-gray-300 text-base py-1 px-3"
                value={listValue}
                ref={myAddListElement}
                placeholder="+ Add another list"
                onChange={(e) =>{
                    setListValue(e.target.value);
                    setWarning("");
                } }
            />
            {
                warning && <span className="text-red-700 text-sm">{warning}</span>
            }
            <div className="flex gap-2 items-center">
                <button className="bg-blue-400 p-1 px-2 rounded" onClick={handleSave}>Add list</button>
                <button onClick={handleCancel} className="text-gray-300">
                    <svg width="20" height="20" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12Z" fill="currentColor"></path></svg>
                </button>
            </div>
            </div>
        ) : (
            <span className="bg-[rgba(255,255,255,0.3)] p-4 cursor-pointer w-full text-nowrap flex rounded-xl text-gray-200 backdrop-blur-md" onClick={() => setAddlist(true)}>+ Add another list</span>
        )}
        </div>
    </div>
    </DragDropContext>
    {
        selectedTask 
            && 
        <TaskModal
         items={items}
         setItems={setItems}
         card={items.cards[selectedTask]}
         onClose={()=>{setSelectedTask(null)}}
         listId={findListId(selectedTask)}
        /> 
    }
    </>
  );
};

export default Board;