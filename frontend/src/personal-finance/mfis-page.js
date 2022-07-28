import axios from "axios";
import { useState } from "react";

function MfisPage() {
  // VARIABLES AND FUNCTIONS------------------------
  const [isLoading, setLoading] = useState(null);
  const [mfiListResult, setMfiListResult] = useState(null);

  const callServerMfi = () => {
    console.log("In call server mfi function..."); 
    setLoading(true);
    axios
      .post("http://127.0.0.1:5000/mfi")
      .then((res) => {
        console.log("Receiving server mfi output:", res);
        setMfiListResult(res);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  };

  console.log("Mfi list result", mfiListResult);
  console.log("Is loading", isLoading);

  // BODY / CALLS TO FUNCTIONS----------------------------------------------

  let mfiListData; 
  if (mfiListResult !== null){
    mfiListData = mfiListResult.data.data;  
  }

  console.log("Mfi list data:", mfiListData); 

  // CONTENTS-----------------------------------------
  let contents;

  if (mfiListResult !== null){
  contents = (<>
  <button onClick={() => callServerMfi()}>Call server MFIs</button>
  <>MFIs</>
  {/* <>{mfiListData}</> */}
  <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Address</th>
            <th>Tel</th>
            <th>Email</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {
            mfiListData.map((value, key) => {
              return (
                <tr key={key}>
                  <td>{value.No}</td>
                  <td>{value.Name}</td>
                  <td>{value.Address}</td>
                  <td>{value.Tel}</td>
                  <td>{value.Email}</td>
                  <td>{value.Website}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
  
  </>);} else {
    contents = (<>
      <button onClick={() => callServerMfi()}>Call server MFIs</button>
      <>MFIs</><>No list yet</></>); 
  }

  return contents;
}

export default MfisPage;
