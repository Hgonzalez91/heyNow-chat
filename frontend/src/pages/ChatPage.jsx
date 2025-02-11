import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

function ChatPage() {
  return (
    <div className="h-full flex gap-1">
      <div className="bg-white w-70 h-screen rounded-r-2xl">
        <h1 className="text-black text-2xl font-bold p-2 w-full text-center">
          Chats
        </h1>
      </div>
      <div className="bg-[#c350a5] w-full h-screen flex flex-col rounded-l-2xl">
        <div className="bg-[#73318b] w-full h-full rounded-tl-2xl"></div>
        <form action="" className="flex flex-row">
          <input
            className="bg-white w-full h-10 m-2 text-slate-600 flex items-center p-2 rounded-2xl outline-none"
            placeholder="Write your message"
          />
          <button className="bg-[#ff9e56] w-11 h-10 mr-2 my-2 flex items-center justify-center rounded-2xl cursor-pointer hover:bg-[#DC7F39]">
            <FontAwesomeIcon className="text-[19px] mr-1" icon={faPaperPlane} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatPage;
