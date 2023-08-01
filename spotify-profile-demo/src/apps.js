import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

import sky1 from '../src/img/sky1.jpg';
import sky2 from '../src/img/sky2.jpg';
import sky3 from '../src/img/sky3.jpg';

import { calculateMeans, fetchAudioFeatures, getAccessToken, fetchTopTracks, redirectToAuthCodeFlow } from './script.js';

// First, get the access token
const clientId = "9fa7a16055d9466a9b2952e0a03ac9b6"; // Replace with your client id
const params = new URLSearchParams(window.location.search);
const code = params.get("code");

let means;
async function main() {
  if (!code) {
    redirectToAuthCodeFlow(clientId);
  } else {
    const accessToken = await getAccessToken(clientId, code);
    localStorage.setItem('accessToken', accessToken);

    // Now that you have the access token, you can use it to fetch audio features
    const TopTracks = await fetchTopTracks(accessToken);

    if (TopTracks) {
      const trackIDs = TopTracks.map((track) => track.id);
      const audioFeatures = await fetchAudioFeatures(accessToken, trackIDs);

      if (audioFeatures && audioFeatures.audio_features) {
        means = await calculateMeans(audioFeatures.audio_features);
        //const means = await calculateMeans(audioFeatures.audio_features);
        console.log(means);
        // Now you have the means object, you can use its properties as needed
        console.log("tempo = " + means.tempo);
        console.log("loudness = "+ means.loudness);
        console.log("danceability = "+ means.danceability);
        console.log("valence = "+ means.valence);
        console.log("energy = "+ means.energy);
        console.log("instrumentalness = "+ means.instrumentalness);
        console.log("acousticness = "+ means.acousticness);
        console.log("popularity = "+ means.popularity);
      } else {
        console.log("Failed to fetch audio features.");
      }
    } else {
      console.log("Failed to fetch top tracks.");
    }
  }
}

main();

let mixer;
function showIsland(period) {
    const buttonContainer = document.querySelector('.button-container');
    buttonContainer.style.display = 'none';
    
    const islandContainer = document.getElementById('island-container');
    islandContainer.style.display = 'block';

    const foundationUrl = new URL('../src/assets/foundation.glb', import.meta.url);
    const train1Url = new URL('../src/assets/train1.glb', import.meta.url);
    const train2Url = new URL('../src/assets/train2.glb', import.meta.url);
    const train3Url = new URL('../src/assets/train3.glb', import.meta.url);
    const house1Url = new URL('../src/assets/house1.glb', import.meta.url);
    const house2Url = new URL('../src/assets/house2.glb', import.meta.url);
    const house3Url = new URL('../src/assets/house3.glb', import.meta.url);
    const moun1Url = new URL('../src/assets/smallmountain.glb', import.meta.url);
    const moun2Url = new URL('../src/assets/middlemountain.glb', import.meta.url);
    const moun3Url = new URL('../src/assets/highmountain.glb', import.meta.url);
    const botolUrl = new URL('../src/assets/bottle.glb', import.meta.url);
    const paperUrl = new URL('../src/assets/paper.glb', import.meta.url);
    const flowerUrl = new URL('../src/assets/flower.glb', import.meta.url);
    const flog1Url = new URL('../src/assets/flog1.glb', import.meta.url);
    const flog3Url = new URL('../src/assets/flog3.glb', import.meta.url);
    const flog5Url = new URL('../src/assets/flog5.glb', import.meta.url);
    const foundation2Url = new URL('../src/assets/foundation2.glb', import.meta.url);
    const foundation3Url = new URL('../src/assets/foundation3.glb', import.meta.url);

const renderer = new THREE.WebGL1Renderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

let skyImage;
if (means.valence < 0.3) {
  skyImage = sky1;
} else if (means.valence >= 0.3 && means.valence < 0.6) {
  skyImage = sky2;
} else {
  skyImage = sky3;
}

const textureLoader = new THREE.TextureLoader();
scene.background = textureLoader.load(skyImage);

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(100 ,30 ,250);
orbit.update();

if (period === 'week' || period === 'month' || period === 'all') {

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xFFFFFF,0.8);
scene.add(directionalLight);
directionalLight.position.set(30,50,0);

const assetLoader = new GLTFLoader();

assetLoader.load(foundationUrl.href, function(gltf){
    const model = gltf.scene;
    if(means.danceability < 0.5){
    scene.add(model);
    model.position.set(-12, 0, -12);
    mixer = new THREE.AnimationMixer(model);
    const monkey = gltf.animations;
    const cow = gltf.animations;
    const clip = THREE.AnimationClip.findByName(monkey, 'Armature|mixamo.com|Layer0');
    const clip2 = THREE.AnimationClip.findByName(cow, 'Anim_0');
    const action = mixer.clipAction(clip);
    const action2 = mixer.clipAction(clip2);
    action.play();
    action2.play();
    }
}, undefined, function(error){
    console.error(error);
});

assetLoader.load(foundation2Url.href, function(gltf){
    const model = gltf.scene;
    if(means.danceability > 0.5 && means.danceability <= 0.65){
    scene.add(model);
    model.position.set(-12, 0, -12);
    mixer = new THREE.AnimationMixer(model);
    const monkey = gltf.animations;
    const monkey2 = gltf.animations;
    const monkey3 = gltf.animations;
    const cow = gltf.animations;
    const clip = THREE.AnimationClip.findByName(monkey, 'Armature|mixamo.com|Layer0.002');
    const clip2 = THREE.AnimationClip.findByName(monkey2, 'Armature|mixamo.com|Layer0.004');
    const clip3 = THREE.AnimationClip.findByName(monkey3, 'Armature|mixamo.com|Layer0.003');
    const clip4 = THREE.AnimationClip.findByName(cow, 'Anim_0');
    const action = mixer.clipAction(clip);
    const action2 = mixer.clipAction(clip2);
    const action3 = mixer.clipAction(clip3);
    const action4 = mixer.clipAction(clip4);
    action.play();
    action2.play();
    action3.play();
    action4.play();
    }
}, undefined, function(error){
    console.error(error);
});

assetLoader.load(foundation3Url.href, function(gltf){
    const model = gltf.scene;
    if(means.danceability > 0.65){
    scene.add(model);
    model.position.set(-12, 0, -12);
    mixer = new THREE.AnimationMixer(model);
    const monkey = gltf.animations;
    const monkey2 = gltf.animations;
    const monkey3 = gltf.animations;
    const monkey4 = gltf.animations;
    const monkey5 = gltf.animations;

    const cow = gltf.animations;
    const clip = THREE.AnimationClip.findByName(monkey, 'Armature|mixamo.com|Layer0.002');
    const clip2 = THREE.AnimationClip.findByName(monkey2, 'Armature|mixamo.com|Layer0.004');
    const clip3 = THREE.AnimationClip.findByName(monkey3, 'Armature|mixamo.com|Layer0.003');
    const clip4 = THREE.AnimationClip.findByName(monkey4, 'Armature|mixamo.com|Layer0.005');
    const clip5 = THREE.AnimationClip.findByName(monkey5, 'Armature|mixamo.com|Layer0.006');
    const clip6 = THREE.AnimationClip.findByName(cow, 'Anim_0');
    const action = mixer.clipAction(clip);
    const action2 = mixer.clipAction(clip2);
    const action3 = mixer.clipAction(clip3);
    const action4 = mixer.clipAction(clip4);
    const action5 = mixer.clipAction(clip5);
    const action6 = mixer.clipAction(clip6);
    
    action.play();
    action2.play();
    action3.play();
    action4.play();
    action5.play();
    action6.play();
    }
}, undefined, function(error){
    console.error(error);
});

assetLoader.load(house1Url.href, function(gltf){
    const model = gltf.scene;
    model.name = 'house1'; 
    if(means.loudness <= -4.7){
    scene.add(model);
    model.position.set(-12, 10, -12);
    }
 }, undefined, function(error){
     console.error(error);
 });

assetLoader.load(house2Url.href, function(gltf){
    const model = gltf.scene;
    model.name = 'house2'; 
    if(means.loudness > -4.7 && means.loudness <= -4.3){
    scene.add(model);
    model.position.set(-12, 10, -12);
    }
 }, undefined, function(error){
     console.error(error);
 });

 assetLoader.load(house3Url.href, function(gltf){
    const model = gltf.scene;
    model.name = 'house3'; 
    if(means.loudness > -4.3){
    scene.add(model);
    model.position.set(-12, 10, -12);
    }
 }, undefined, function(error){
     console.error(error);
 });

assetLoader.load(train1Url.href, function(gltf){
   const model = gltf.scene;
   model.name = 'train1'; // train1の名前に応じて修正
   if(means.tempo <= 125){
   scene.add(model);
   model.position.set(-12, 0, -12);
   }
}, undefined, function(error){
    console.error(error);
});

assetLoader.load(train2Url.href, function(gltf){
    const model = gltf.scene;
    model.name = 'train2'; // train3の名前に応じて修正
    if(means.tempo > 125 && means.tempo <= 135){
    scene.add(model);
    model.position.set(-12, 0, -12);
    }
}, undefined, function(error){
    console.error(error);
});

assetLoader.load(train3Url.href, function(gltf){
    const model = gltf.scene;
    model.name = 'train3'; // train3の名前に応じて修正
    if(means.tempo > 135){
    scene.add(model);
    model.position.set(-12, 0, -12);
    }
}, undefined, function(error){
    console.error(error);
});

assetLoader.load(moun1Url.href, function(gltf){
    const model = gltf.scene;
    model.name = 'moun1'; 
    if(means.energy <= 0.7){
    scene.add(model);
    model.position.set(-12, 0, -12);
    }
 }, undefined, function(error){
     console.error(error);
 });

assetLoader.load(moun2Url.href, function(gltf){
    const model = gltf.scene;
    model.name = 'moun2'; 
    if(means.energy > 0.7 && means.energy <= 0.85){
    scene.add(model);
    model.position.set(-12, 0, -12);
    }
 }, undefined, function(error){
     console.error(error);
 });

 assetLoader.load(moun3Url.href, function(gltf){
    const model = gltf.scene;
    model.name = 'moun3'; 
    if(means.energy > 0.85){
    scene.add(model);
    model.position.set(-12, 0, -12);
    }
 }, undefined, function(error){
     console.error(error);
 });

 assetLoader.load(botolUrl.href, function(gltf){
    const model = gltf.scene;
    model.name = 'bottle'; 
    if(means.acousticness <= 0.01){
    scene.add(model);
    model.position.set(-12, 0, -12);
    }
 }, undefined, function(error){
     console.error(error);
 });

 assetLoader.load(paperUrl.href, function(gltf){
    const model = gltf.scene;
    model.name = 'paper'; 
    if(means.acousticness > 0.12 && means.acousticness <= 0.15){
    scene.add(model);
    model.position.set(-12, 0, -12);
    }
 }, undefined, function(error){
     console.error(error);
 });

assetLoader.load(flowerUrl.href, function(gltf){
    const model = gltf.scene;
    model.name = 'flower'; 
    if(means.acousticness > 0.15){
    scene.add(model);
    model.position.set(-12, 0, -12);
    }
 }, undefined, function(error){
     console.error(error);
 });

 assetLoader.load(flog1Url.href, function(gltf){
    const model = gltf.scene;
    model.name = 'flog1'; 
    if(means.instrumentalness <= 0.01){
    scene.add(model);
    model.position.set(-12, 0, -12);
    }
 }, undefined, function(error){
     console.error(error);
 });

 assetLoader.load(flog3Url.href, function(gltf){
    const model = gltf.scene;
    model.name = 'flog3'; 
    if(means.instrumentalness > 0.01 && means.instrumentalness <= 0.1){
    scene.add(model);
    model.position.set(-12, 0, -12);
    }
 }, undefined, function(error){
     console.error(error);
 });

 assetLoader.load(flog5Url.href, function(gltf){
    const model = gltf.scene;
    if(means.instrumentalness > 0.1){
    model.name = 'flog5'; 
    scene.add(model);
    model.position.set(-12, 0, -12);
 }
 }, undefined, function(error){
     console.error(error);
 });

const clock = new THREE.Clock();
const delta = clock.getDelta();
function animate(time){
    const delta = clock.getDelta();
    update(delta);
    renderer.render(scene,camera);
}

function update(delta) {
    if (mixer) {
        mixer.update(delta)
        const train1 = scene.getObjectByName('train1'); // train1の名前に応じて修正
        if (train1) {
           train1.rotation.y += delta * 2 * Math.PI / 13; // 10秒で1周するように回転させる
        }
    }
    if (mixer) {
            mixer.update(delta)
            const train1 = scene.getObjectByName('train2'); // train1の名前に応じて修正
            if (train1) {
               train1.rotation.y += delta * 2 * Math.PI / 8; // 10秒で1周するように回転させる
            }
        }
    if (mixer) {
        mixer.update(delta)
        const train3 = scene.getObjectByName('train3'); // train1の名前に応じて修正
        if (train3) {
            train3.rotation.y += delta * 2 * Math.PI / 4; // 10秒で1周するように回転させる
        }
    }
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
    }
}

// Get references to the button elements
const weekButton = document.getElementById('week-button');
const monthButton = document.getElementById('month-button');
const allButton = document.getElementById('all-button');

allButton.addEventListener('click', function() {
    showIsland('all');
});