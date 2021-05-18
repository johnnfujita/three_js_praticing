import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const particletexture = textureLoader.load("/textures/particles/2.png")
// /**
//  * Sphere Particle
//  */
// const particlesGeometry = new THREE.SphereGeometry(1, 32, 32);
// const particlesMaterial = new THREE.PointsMaterial({
//     size: 0.02,
//     sizeAttenuation: true
// }) 

// // points
// const particles = new THREE.Points(particlesGeometry, particlesMaterial)
// scene.add(particles)

/**
 * CUstom Particles
 */

const particlesGeometry = new THREE.BufferGeometry()
const count = 50000

const positions = new Float32Array(count * 3);
const colors = new Float32Array(count * 3);
for( let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10
    colors[i] = Math.random()
}

particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
)

particlesGeometry.setAttribute(
    "color",
    new THREE.BufferAttribute(colors, 3)
)
// THE DEPTH TEST SOLUTION DOENS'T WORK CAUSE IT WILL IGNORE WHAT IS IN FRONT OF WHAT alphaTest: 0.001,
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    transparent: true,
    alphaMap: particletexture,
    depthWrite: false,
    sizeAttenuation: true,
    vertexColors: true
})

const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)



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
camera.position.z = 3
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
    // particles.rotation.y = elapsedTime * - 4
    for(let i = 0; i<count; i++) {
        const i3 = i * 3
        const x = particlesGeometry.attributes.position.array[i3]
        // this is very elegant, but not quite efficient, the x adding to the ellapsedtime create the perfect offset
        particlesGeometry.attributes.position.array[i3+1] = Math.sin(elapsedTime + x);
    }

    particlesGeometry.attributes.position.needsUpdate = true
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()