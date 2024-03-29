import { useEffect, useState } from "react";
import axios from "axios";

function useMfiList() {
    const [mfiListState, setMfiListState] = useState({
      status: "loading",
      results: null,
      error: null,
    });
   
    useEffect(() => {
      async function callServerMfi() {
        setMfiListState({
          status: "loading",
          results: null,
          error: null,
        });
        
        try {
            axios
                .post(/* Insert backend service address MFIs */)
                .then((res) => {
                console.log("Receiving server mfi output:", res);
                setMfiListState({
                    status: "success",
                    results: res.data.data,
                    error: null,
                    });
                })
                .catch((err) => console.error(err));
        } catch (error) {
          console.error(error);
          setMfiListState({ status: "error", data: null, error });
        }
      }
      callServerMfi();
    },[]); 

    const { status, results, error } = mfiListState;
  
    return {
      status,
      results,
      error,
    };
  }
  
  export default useMfiList;