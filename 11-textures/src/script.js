import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// import imageSource from "../static/textures/door/color.jpg"

// console.log(imageSource)

/**
 * webpack load image url neat
 */


/// LOADING MANUAL
// const image = new Image()
// const texture = new THREE.Texture(image)
// image.onload = () => {
//     texture.needsUpdate = true
// }
// image.src = "/textures/door/color.jpg"

/// TextureLoader (it can load more than one texture)
const loadingManager = new THREE.LoadingManager();

loadingManager.onStart = () => {
    console.log("start")
}

loadingManager.onLoaded= () => {
    console.log("loade")
}

loadingManager.onProgress = () => {
    console.log("progress")
}
loadingManager.onError = () => {
    console.log("error")
}


const textureLoader = new THREE.TextureLoader(loadingManager);
const texture = textureLoader.load('/textures/door/color.jpg'
// ,
// () => {
//     console.log("load")
// }, () => {
//     console.log("prog")
// }, () => {
//     console.log("'failed")
// }
);
const minecraftTexture = textureLoader.load("/textures/minecraft.png")

const alphaTexture = textureLoader.load("/textures/door/alpha.jpg")
const heightTexture = textureLoader.load("/textures/door/height.jpg")
const normalTexture = textureLoader.load("/textures/door/normal.jpg")
const ambientOcclusionTexture = textureLoader.load("/textures/door/ambientOcclusion.jpg")
const metalnessTexture = textureLoader.load("/textures/door/metalness.jpg")
const roughnessTexture = textureLoader.load("/textures/door/roughness.jpg")

// texture.repeat.x = 2
// texture.repeat.y = 2
// texture.wrapS = THREE.MirroredRepeatWrapping;
// texture.wrapT = THREE.MirroredRepeatWrapping;

// texture.offset.x = 0.4
// texture.rotation = Math.PI / 4
// texture.center.y = 0.5
// texture.center.x = 0.5

// nearestFilter is important no need mipmaps for minfilters
// minecraftTexture.minFilter = THREE.NearestFilter

minecraftTexture.magFilter = THREE.NearestFilter


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
// const geometry = new THREE.BoxGeometry(1, 1, 1)
const geometry = new THREE.SphereBufferGeometry(1,32,32);
const material = new THREE.MeshBasicMaterial({ map: minecraftTexture })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 1
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()