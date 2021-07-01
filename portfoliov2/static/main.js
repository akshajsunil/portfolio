import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();


const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight, 0.1,1000);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth,window.innerHeight);
camera.position.setZ(30);
renderer.render(scene,camera);
function addtorus(x,y,z){
const geometry = new THREE.TorusGeometry(10,3,16,100);
const material = new THREE.MeshStandardMaterial( { color :0xFF6347 } );
const torus = new THREE.Mesh(geometry,material);
torus.position.set(x,y,z);
scene.add(torus);
return torus;
}
var t1 = addtorus(0,10,10);
var t2 = addtorus(-20,-40,-2);
const pointlight = new THREE.PointLight('yellow');
pointlight.position.set(5,5,5);

const gridhelper = new THREE.GridHelper(200,50);

const ambiantlight = new THREE.AmbientLight('blue');
scene.add(pointlight,ambiantlight);

const lighthelper = new THREE.PointLightHelper(pointlight);
scene.add(lighthelper,gridhelper);
const controls = new OrbitControls(camera,renderer.domElement);
function addStar() {
  const geometry = new THREE.SphereGeometry(0.2,24,24);
  const material = new THREE.MeshStandardMaterial({color: 'grey'});
  const star = new THREE.Mesh(geometry,material);
  const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100));
  star.position.set(x,y,z);
  scene.add(star);

  
}
Array(200).fill().forEach(addStar);


const spaceTexture = new THREE.TextureLoader().load('p1.jpg');
scene.background = spaceTexture;
function animate(){
  requestAnimationFrame(animate);
  t2.rotation.x += 0.025;
  t2.rotation.y += 0.004;
  t2.rotation.z += 0.5;
    t1.rotation.x += 0.05;
  t1.rotation.y += -0.004;
  t1.rotation.z += 0.5;
  controls.update();
  renderer.render(scene,camera);
}
animate();