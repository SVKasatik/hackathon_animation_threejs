import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GUI } from 'dat.gui'
import { gsap } from 'gsap'

const gui = new GUI()

//Creating the scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('#2C2C2C')
// const spaceTexture = new THREE.TextureLoader().load('images/space.jpg')
// scene.background = spaceTexture
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)


const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// window.addEventListener('wheel', onMouseWheel)

// let y = 0
// let position = 0

// function onMouseWheel(event) {
//   // y = event.deltaY
//   car.rotation.x += 0.01
// }

//Additing the Objects
// const geometry = new THREE.BoxGeometry(1, 3, 1, 1)
// const cubeTexture = new THREE.TextureLoader().load('images/cube.jpg')
// const material = new THREE.MeshBasicMaterial({ map: cubeTexture })
// const cube = new THREE.Mesh(geometry, material)
// cube.position.z = 0
// cube.rotation.y = 0
// cube.rotation.x = 0
// scene.add(cube)

// const geometry1 = new THREE.SphereGeometry( 1, 14, 14 );
// const cubeTexture1 = new THREE.TextureLoader().load('images/sphere.jpg');
// const material1 = new THREE.MeshBasicMaterial({ map: cubeTexture1 });
// const sphere = new THREE.Mesh( geometry1, material1 );
// sphere.position.z = 0
// sphere.rotation.y = 0
// sphere.rotation.x = 0
// scene.add( sphere );

let tl = gsap.timeline()

const loader = new GLTFLoader()
loader.load('audi/scene.gltf', function (gltf) {
  let car = gltf.scene.children[0]
  car.position.x = 0
  car.position.x = 0
  car.position.z = 0

  gltf.scene.scale.set(1,1,1)
  gltf.scene.rotation.set(0,0,0)
  scene.add(gltf.scene)

  gui.add(car.rotation, 'x').min(-20).max(20)
  gui.add(car.rotation, 'y').min(-20).max(20)
  gui.add(car.rotation, 'z').min(-20).max(20)

  tl.to(gltf.scene.rotation, {y:1.7, duration:1})
  tl.to(gltf.scene.scale, {x: 0.25, y:1.7, z:0.25, duration:1})
  tl.to(gltf.scene.scale, {x: 1.7, y:0.25, z:1.7, duration:1})
  tl.to(gltf.scene.scale, {x: 1.7, y:1.7, z:1.7, duration:1})
  tl.to(gltf.scene.scale, {x: 0.5, y:0.5, z:0.5, duration:1})
  tl.to(gltf.scene.position, {x: 5})
})


// Added planeGeometry

// const planeGeometry = new THREE.PlaneGeometry(20, 20, 32, 32)
// const planeMaterial = new THREE.MeshStandardMaterial({
//   color: 0x2fa1d6,
//   metalness: 1,
//   roughness: 0.5,
//   shininess: 180,
//   specular: 0x111111,
// })
// const plane = new THREE.Mesh(planeGeometry, planeMaterial)
// plane.rotation.x = -7.85
// plane.rotation.y = 0
// plane.receiveShadow = true
// scene.add(plane)

// gui.add(plane.rotation, 'x').min(-20).max(20)
// gui.add(plane.rotation, 'y').min(-20).max(20)
// gui.add(plane.rotation, 'z').min(-20).max(20)

const controls = new OrbitControls(camera, renderer.domElement)
// camera.position.set( 0, 20, 100 );
camera.position.y = 2
camera.position.z = 2
camera.position.x = 3
camera.lookAt(0, 0, 0)
controls.enableDamping = true
controls.minDistance = 3
controls.update()

gui.add(camera.position, 'x').min(-4).max(7)
gui.add(camera.position, 'y').min(-4).max(7)
gui.add(camera.position, 'z').min(-4).max(7)

//Light
const light = new THREE.DirectionalLight(0xffffff, 3)
light.position.set(2, 2, 20)
light.lookAt(0, -1, 0)
// light.castShadow = true;
// light.shadow.camera.near = 1;
// light.shadow.camera.far = 10;
// light.shadow.camera.right = 1;
// light.shadow.camera.left = - 1;
// light.shadow.camera.top	= 1;
// light.shadow.camera.bottom = - 1;

light.shadow.mapSize.width = 1024
light.shadow.mapSize.height = 1024
scene.add(light)

const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

gui.add(light.position, 'x').min(-4).max(7)
gui.add(light.position, 'y').min(-4).max(7)
gui.add(light.position, 'z').min(-4).max(7)

const spotLight = new THREE.SpotLight(0xffffff)
spotLight.angle = Math.PI / 5
spotLight.penumbra = 0.2
spotLight.position.set(2, 3, 3)
spotLight.castShadow = true
spotLight.shadow.camera.near = 3
spotLight.shadow.camera.far = 10
spotLight.shadow.mapSize.width = 1024
spotLight.shadow.mapSize.height = 1024
// spotLight.scene.rotation.set(1,1,1)
// tl.to(spotLight.scene.rotation, {y:4.7, duration:1})
scene.add(spotLight)

//Rendering the scene
function animate() {
  requestAnimationFrame(animate)
  // position +=y
  // camera.position.y = position
  light.rotation.position += 0.01
  light.rotation.y += 0.01
  renderer.render(scene, camera)
  controls.update()
}
animate()
