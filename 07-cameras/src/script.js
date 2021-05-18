import './style.css'
import * as THREE from 'three'

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"; 
/**
 *  Cursor 
 */
// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}


window.addEventListener("resize", (e)=> {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
})
const cursor = {
    x: 0,
    y: 0
}
window.addEventListener("mousemove", (e)=> {
    cursor.x = (e.clientX / sizes.width - 0.5)* 2;
    cursor.y = (e.clientY / sizes.height - 0.5) * 2;
    console.log(cursor.x)
})

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')


// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)


window.addEventListener("dblclick", () => {

    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if(!fullscreenElement) {
        if(canvas.requestFullscreen) {
            canvas.requestFullscreen();
        }
        else if (canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen();
        }
    }
    else {
        if(document.exitFullscreen) {
            document.exitFullscreen();
        }
        else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
})
// // Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)


// ORTHO CAMERA
const aspectRatio = sizes.width /sizes.height;
// console.log(aspectRatio)
// const camera = new THREE.OrthographicCamera(
//     -1 * aspectRatio,
//     1 * aspectRatio,
//     1,
//     -1,
//     0.1,
//     100
// )

// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 2
camera.lookAt(mesh.position)
scene.add(camera)


const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true;
// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    // camera.position.x = cursor.x * 3;
    
    // Manual fly view kind of
    // camera.position.y = cursor.y * -3;
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2
    // lookAt must be after 
    // camera.lookAt(mesh.position)

    // Update objects
    // mesh.rotation.y = elapsedTime;

    // Render
    renderer.render(scene, camera)
    // need to update the controls when using the damping
    controls.update()
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()