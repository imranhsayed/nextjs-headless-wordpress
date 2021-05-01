import { SearchIcon } from '../icons';

const SearchBox = () => {
  return (
    <div className="bg-gradient-to-r from-green-400 to-blue-500">
      <div className="info max-w-xl mx-auto py-10">
        <br/>
        <h2 className="text-center text-white py-4"> 7 products found for: "product"</h2>
        <div className="block relative">
            <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
              <SearchIcon className="h-4 w-4 fill-current text-gray-500"/>
            </span>
          <input
            placeholder="Search"
            className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"/>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
