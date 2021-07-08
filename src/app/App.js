import "./styles/styles.scss";

import { useRef, useEffect } from "react";

import { loadModules } from "esri-loader";

function App() {
  const mapRef = useRef();

  useEffect(() => {
    loadModules([
      "esri/Map",
      "esri/config",
      "esri/views/MapView",
      "esri/layers/FeatureLayer",
      "esri/layers/MapImageLayer",
      "esri/widgets/Search",
    ]).then(
      ([
        ArcGISMap,
        esriConfig,
        MapView,
        FeatureLayer,
        MapImageLayer,
        Search,
      ]) => {
        const map = new ArcGISMap({});
        esriConfig.apiKey =
          "AAPKa50cbd71ab6745b2ba76974ebe4d852bPB_Dz8hi2xiW89S90EDHOiL4qtaYbp1QRYLHndBziE9YwxH29D2a1kl9tFcOe1ly";

        const addToView = (layer) => {
          map.add(layer);
        };

        const imagelayer = new MapImageLayer({
          url: "https://gis.vplanas.lt/arcgis/rest/services/Baziniai_zemelapiai/ORTOFOTO_2019_LKS_FULL/MapServer",
        });

        addToView(imagelayer);

        const view = new MapView({
          container: mapRef.current,
          map: map,
          center: [25.29079, 54.69465],
          // zoom: 6,
        });

        const search = new Search({
          view: view,
        });

        view.ui.add(search, "top-right");

        const layer = new FeatureLayer({
          url: "https://services1.arcgis.com/usA3lHW20rGU6glp/ArcGIS/rest/services/Viln_lent_pam_2020_gdb/FeatureServer/0",
          // infoTemplate: popupTemplate,
          objectIdField: "OBJECTID",
          fields: [
            {
              name: "OBJECTID",
              type: "oid",
            },
            {
              name: "url",
              type: "string",
            },
          ],
          renderer: {
            type: "simple",
            symbol: {
              type: "text",
              color: "#5491f5",
              text: "\ue61d",
              font: {
                size: 20,
                family: "CalciteWebCoreIcons",
              },
            },
          },
          popupTemplate: {
            title: "Generic Popup",
            content: "sdsdsd",
          },
        });

        addToView(layer);

        // create a new popupTemplate for the layer
        // const popupTemplate = {
        //   title: "name",
        //   content: "jhjbmn",
        // };

        // layer.popupTemplate = popupTemplate;

        return () => {
          if (view) {
            view.destroy();
          }
        };
      }
    );
  }, []);

  return (
    <div className="App">
      <div className="Container">
        <header className="Header">
          <h1>Gis Task</h1>
        </header>
        <div style={{ width: "100%", height: "80vh" }}>
          <div
            className="webmap"
            ref={mapRef}
            style={{ padding: "0", margin: "0", height: "100%", width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
