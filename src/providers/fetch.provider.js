import { useCallback, useState , createContext} from "react";

const FetchContext = createContext({});

function FetchProvider({ children }) {
  const [response, setResponse] = useState([]);
  const [error, setErroor] = useState(null);
  const [loading, setLoading] = useState(false);

  const getResponse = useCallback(async () => {
    setLoading(true);
    try {
      let results = await fetch(
        "https://gis.vplanas.lt/arcgis/rest/services/Baziniai_zemelapiai/ORTOFOTO_2019_LKS_FULL/MapServer",
        {
          method: "GET",
          headers: {
            // "Content-Type": "application/json",
            // "Api-Key":"AAPK77074f3afe604ea68f7e0975b85d5b01utVMSD8g5dFAp3RegGQpI-w0RClvurX_Ah-UniDDgxsj00VFxj6D-ph3zVaMENGP"
   
          },
        }
      );
    //   const data = await results.json();
    //   setResponse(data);
      console.log(results);
    } catch (e) {
      setErroor("Something went wrong unable to contact server");
      console.log(await e);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <FetchContext.Provider
      value={{ getResponse, response, error, loading }}
    >
      {children}
    </FetchContext.Provider>
  );
}

export { FetchProvider, FetchContext };
