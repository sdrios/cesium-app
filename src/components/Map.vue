<template>
  <div id="cesiumContainer"></div>
</template>

<script>
//define cesium path
window.CESIUM_BASE_URL = "/Cesium/";
//import cesium objects
import {
  CzmlDataSource,
  Cesium3DTileset,
  createWorldTerrain,
  IonResource,
  Viewer,
  viewerCesiumNavigationMixin,
  Color,
  ColorMaterialProperty,
  PositionPropertyArray,
  ReferenceProperty,
  Cartesian3,
  CallbackProperty,
} from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css"; //cesium CSS
import "regenerator-runtime/runtime"; //enable use of async

export default {
  name: "Map",
  //set up viewer once component has mounted
  mounted: () => {
    const viewer = new Viewer("cesiumContainer", {
      terrainProvider: createWorldTerrain(),
    });

    //async function to load all CZML data
    const loadData = async () => {
      let satellite = await viewer.dataSources.add(
        new CzmlDataSource.load("../data/ISS.czml")
      );
      let target = await viewer.dataSources.add(
        new CzmlDataSource.load("../data/targets.czml")
      );
      return { satellite: satellite, target: target };
    };

    //handle map functionality once data has loaded
    loadData().then((data) => {
      console.log(data);
      let satelliteEntities = data.satellite.entities;
      let satelliteEntity = satelliteEntities.getById("Satellite/ISS");
      let satellitePosition = satelliteEntity.position;
      let targetEntities = data.target.entities;
      let targetEntity = targetEntities.getById("Facility/Target");
      let targetPosition = targetEntity.position;
      console.log(satellitePosition);
      console.log(targetPosition);

      //add polyline target tracking
      viewer.entities.add({
        polyline: {
          followSurface: false,
          //FEATURE IN PROGRESS - conditionally show polyline if satellite is within certain distance of target
          // show: new CallbackProperty(()=>{
          //create buffer of certain distance around target point
          //check satellite position at given time
          //if satellite position overlaps target buffer, show polyline - return true
          //else hide polyline - return false
          // }),
          positions: new PositionPropertyArray([
            new ReferenceProperty(satelliteEntities, "Satellite/ISS", [
              "position",
            ]),
            new ReferenceProperty(targetEntities, "Facility/Target", [
              "position",
            ]),
          ]),
          material: new ColorMaterialProperty(Color.YELLOW.withAlpha(0.25)),
        },
      });

      //viewer.trackedEntity = satelliteEntity; //track satellite entity
      // viewer.zoomTo(viewer.entities); //set viewer extent to both entities (only works if satellite entity is not tracked)
    });
  },
};
</script>

<style scoped>
div#cesiumContainer {
  height: 100vh;
  width: 100vw;
}
</style>