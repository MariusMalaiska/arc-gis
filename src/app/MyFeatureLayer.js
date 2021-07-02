// import React, { useEffect, useRef } from "react";
// import { loadModules } from "esri-loader";

// export const WebMapView = () => {
//   const mapRef = useRef();

//   useEffect(() => {
//     // lazy load the required ArcGIS API for JavaScript modules and CSS
//     loadModules(
//       [
//         "esri/Map",
//         "esri/views/MapView",
//         "esri/Graphic",
//         "esri/layers/GraphicsLayer",
//       ],
//       { css: true }
//     ).then(([ArcGISMap, MapView, Graphic, GraphicsLayer]) => {
//       const map = new ArcGISMap({
//         basemap: "topo-vector",
//       });
//       const trailsLayer = new FeatureLayer({
//         url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails_Styled/FeatureServer/0"
//       });

//       map.add(trailsLayer, 0);
//     }
//   },[])
