// import axios from "axios";
// import { useState } from "react";

import ErrorMessage from "../common/error-message";
import LoadingSpinner from "../common/loading-spinner";
import useMfiList from "../data/hooks/use-mfi-list";

function MfisPage() {
  
  let contents;
  const mfiListInfo = useMfiList(); 
  console.log("mfiListInfo", mfiListInfo); 

  if (mfiListInfo.status === "loading"){
    contents = <LoadingSpinner />;
  }
  if (mfiListInfo.status === "error") {
    contents = (
      <ErrorMessage>Something went wrong. Please try again.</ErrorMessage>
    );
  }
  // If don't have this, will try to render the below on null results before they've been set
  if (mfiListInfo.results === null || mfiListInfo.results === undefined){
    contents = <></>;
  } 
  else {
    contents = (<>
  
      <div className="flex flex-col text-center w-full mb-0 py-10">
              <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">
                LICENSED MICROFINANCE INSTITUTIONS
              </h2>
              <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
                Access a list of Sri Lanka's licensed MFIs
              </h1>
            </div>
    
            
      <div className="lg:w-1/1 w-full mx-auto overflow-auto">
      <table className="table-auto w-full text-left whitespace-no-wrap">
            <thead>
              <tr>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">#</th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Name</th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Address</th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Tel</th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Email</th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br">Website</th>
              </tr>
            </thead>
            <tbody>
              {
                mfiListInfo.results.map((value, key) => {
                  return (
                    <tr key={key}>
                      <td className="border-t-2 border-gray-200 px-4 py-3 text-xs">{value.No}</td>
                      <td className="border-t-2 border-gray-200 px-4 py-3 text-xs">{value.Name}</td>
                      <td className="border-t-2 border-gray-200 px-4 py-3 text-xs">{value.Address}</td>
                      <td className="border-t-2 border-gray-200 px-4 py-3 text-xs">{value.Tel}</td>
                      <td className="border-t-2 border-gray-200 px-4 py-3 text-xs">{value.Email}</td>
                      <td className="border-t-2 border-gray-200 px-4 py-3 text-xs"><a href={value.Website} target="_blank" rel="noreferrer"><button className="inline-flex items-center bg-indigo-500 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-xs mt-4 md:mt-0">Link to website</button></a></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          </div>
          <div className="text-gray-900 text-sm italic mt-2 mb-5 py-2 text-center">
                Source: Central Bank of Sri Lanka
              </div>
      </>);
  }

  return contents;
}

export default MfisPage;
