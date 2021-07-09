import "./styles/styles.scss";

import { useRef, useEffect } from "react";
import { setDefaultOptions, loadModules } from "esri-loader";

setDefaultOptions({ css: true });

function App() {
  const mapRef = useRef();

  useEffect(() => {
    loadModules([
      "esri/Map",
      "esri/layers/FeatureLayer",
      "esri/config",
      "esri/views/MapView",
      "esri/layers/MapImageLayer",
      "esri/widgets/Search",
    ]).then(
      ([
        ArcGISMap,
        FeatureLayer,
        esriConfig,
        MapView,
        MapImageLayer,
        Search,
      ]) => {
        const map = new ArcGISMap({});

        esriConfig.apiKey =
          "AAPKa50cbd71ab6745b2ba76974ebe4d852bPB_Dz8hi2xiW89S90EDHOiL4qtaYbp1QRYLHndBziE9YwxH29D2a1kl9tFcOe1ly";

        const addToView = (layer) => {
          map.add(layer);
        };

        const view = new MapView({
          container: mapRef.current,
          map: map,
          center: [25.29079, 54.69465],
          // zoom: 6,
        });

        const imagelayer = new MapImageLayer({
          url: "https://gis.vplanas.lt/arcgis/rest/services/Baziniai_zemelapiai/ORTOFOTO_2019_LKS_FULL/MapServer",
        });

        addToView(imagelayer);

        const layer = new FeatureLayer({
          url: "https://services1.arcgis.com/usA3lHW20rGU6glp/ArcGIS/rest/services/Viln_lent_pam_2020_gdb/FeatureServer/0",
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
            title: "{zmogus}",
            content: "Kažkoks tekstas apie žmogų",
          },
        });

        addToView(layer);

        const sources = {
          layer: layer,
          searchFields: ["zmogus"],
          displayField: "zmogus",
          exactMatch: false,
          outFields: ["zmogus"],
          name: "Zmogus",
          placeholder: "Pav: Basanavičius",
        };

        const search = new Search({
          view: view,
          sources: [sources],
        });

        view.ui.add(search, "top-right");

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
        <div
          style={{ width: "100%", height: "80vh", backgroundColor: "#c1c1c1" }}
        >
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
