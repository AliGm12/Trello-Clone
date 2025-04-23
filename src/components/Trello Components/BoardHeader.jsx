import {
  star,
  automation,
  down,
  calendar,
  filter,
  list,
  organization,
  overflowMenu,
  powerUp,
  share,
  table,
} from "../../assets/icons";

export default function BoardHeader() {
  return (
    <div className="flex justify-between bg-pink-900 backdrop-opacity-10 w-full h-16 items-center px-4">
      <div className="flex items-center gap-3 text-white">
        <h2 className="text-3xl text-white font-bold">Test</h2>
        <span className="text-xs">{star}</span>
        <span>{organization}</span>
        <button className="flex items-center bg-white p-1 gap-1 rounded text-black">{list}Board</button>
        <button className="flex items-center p-1 gap-1 rounded hover:bg-gray-200 transition-all hover:text-black">{table}Table</button>
        <button className="flex items-center p-1 gap-1 rounded hover:bg-gray-200 transition-all hover:text-black">{calendar}Calendar</button>
        <span className="cursor-pointer hover:bg-gray-200 transition-all hover:text-black rounded flex justify-center items-center w-8 h-8 pr-1">{down}</span>
      </div>
      <div className="flex text-white items-center gap-3">
        <span>{powerUp}</span>
        <span>{automation}</span>
        <button className="flex">{filter}Filters</button>
        <span className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer">AG</span>
        <button className="flex bg-white p-1 gap-1 rounded text-black">{share}Share</button>
        <span>{overflowMenu}</span>
      </div>
    </div>
  );
}
