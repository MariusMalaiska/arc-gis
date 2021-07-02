import "./styles/styles.scss";

import { useRef, useEffect } from "react";

import { loadModules } from "esri-loader";

function App() {
  const mapRef = useRef();

  useEffect(() => {
    loadModules([
      "esri/Map",
      "esri/views/MapView",
      "esri/Graphic",
      "esri/layers/GraphicsLayer",
      "esri/layers/FeatureLayer",
      "esri/Basemap",
      "esri/layers/MapImageLayer",
      "esri/widgets/Search",
    ]).then(
      ([
        ArcGISMap,
        MapView,
        Graphic,
        GraphicsLayer,
        FeatureLayer,
        Basemap,
        MapImageLayer,
        Search,
      ]) => {
        const map = new ArcGISMap({});

        const layer = new MapImageLayer({
          url: "https://gis.vplanas.lt/arcgis/rest/services/Baziniai_zemelapiai/ORTOFOTO_2019_LKS_FULL/MapServer",
        });

        map.add(layer);

        const view = new MapView({
          container: mapRef.current,
          map: map,
          center: [25.29079, 54.69465],
          // zoom: 6,
        });

        // const searchWidget = new Search({
        //   view: view,
        // });

        // view.ui.add(searchWidget, {
        //   position: "top-right",
        // });

        // map.add(searchWidget);

        // const popupTrailheads = {
        //   title: "Trailhead",
        //   content: "<b>ZMOGUS:</b> {ZMOGUS}<br>",
        // };

        // const trailheads = new FeatureLayer({
        //   url: "https://services1.arcgis.com/usA3lHW20rGU6glp/ArcGIS/rest/services/Viln_lent_pam_2020_gdb/FeatureServer/0",
        //   outFields: ["ZMOGUS"],
        //   popupTemplate: popupTrailheads,
        // });

        // map.add(trailheads);

        const myLayer = new FeatureLayer({
          url: "https://services1.arcgis.com/usA3lHW20rGU6glp/ArcGIS/rest/services/Viln_lent_pam_2020_gdb/FeatureServer/0",
        });

        map.add(myLayer);

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
          <div ref={mapRef}></div>
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
