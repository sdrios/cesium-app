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
} from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";

export default {
  name: "Map",
  mounted: () => {
    const viewer = new Viewer("cesiumContainer", {
      terrainProvider: createWorldTerrain(),
    });

    // var tileset = new Cesium3DTileset({
    //   url: IonResource.fromAssetId(40866),
    // });
    //viewer.scene.primitives.add(tileset);
    //viewer.zoomTo(tileset);

    let satelliteSource = new CzmlDataSource.load("../data/ISS.czml").then(
      (source) => {
        console.log("SATELLITE ENTITY", source.entities.getById("Satellite/ISS"));
        viewer.dataSources.add(source);
        //viewer.trackedEntity = source.entities.getById("Satellite/ISS");
      }
    );

    let targetSource = new CzmlDataSource.load("../data/targets.czml");
    viewer.dataSources.add(targetSource);
  },
};
</script>

<style scoped>
div#cesiumContainer {
  height: 100vh;
  width: 100vw;
}
</style>