<template>
  <div id="cesiumContainer"></div>
</template>

<script>
window.CESIUM_BASE_URL = "/Cesium/";
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
} from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import "regenerator-runtime/runtime";

export default {
  name: "Map",
  mounted: () => {
    const viewer = new Viewer("cesiumContainer", {
      terrainProvider: createWorldTerrain(),
    });

    const loadData = async () => {
      let satellite = await viewer.dataSources.add(
        new CzmlDataSource.load("../data/ISS.czml")
      );
      let target = await viewer.dataSources.add(
        new CzmlDataSource.load("../data/targets.czml")
      );
      return { satellite: satellite, target: target };
    };

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
    });

    // let satelliteSource = new CzmlDataSource.load("../data/ISS.czml").then(
    //   (source) => {
    //     viewer.dataSources.add(source);
    //     let satelliteEntity = source.entities.getById("Satellite/ISS");
    //     console.log("SATELLITE ENTITY", satelliteEntity);
    //     //viewer.trackedEntity = source.entities.getById("Satellite/ISS");
    //   }
    // );
    // let targetSource = new CzmlDataSource.load("../data/targets.czml").then(
    //   (source) => {
    //     viewer.dataSources.add(source);
    //     let targetEntity = source.entities.getById("Facility/Target");
    //     console.log("TARGET ENTITY", satelliteEntity);
    //     let targetPosition = targetEntity.position;
    //   }
    // );
  },
};
</script>

<style scoped>
div#cesiumContainer {
  height: 100vh;
  width: 100vw;
}
</style>