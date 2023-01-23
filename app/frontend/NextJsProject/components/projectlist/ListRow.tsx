const ListRow = ({ name, owner, created_at, status }) => {
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0 w-10 h-10">
            <img
              className="w-full h-full rounded-full"
              src="https://cdn1.vectorstock.com/i/1000x1000/67/75/document-plan-icon-digital-red-vector-18086775.jpg"
              alt=""
            />
          </div>
          <div className="ml-3">
            <p className="text-gray-900 whitespace-no-wrap">{name}</p>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{owner}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{created_at}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">details</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
          <span
            aria-hidden
            className={`absolute inset-0 bg-${
              status == "Active" ? "green-200" : "red-200"
            } opacity-50 rounded-full`}
          ></span>
          <span className="relative">{status}</span>
        </span>
      </td>
    </tr>
  );
};

export default ListRow;
