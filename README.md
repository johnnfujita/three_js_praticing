# three_js_praticing

### 3 - basic:
    - creates a scene, camera, canvas and mesh of a cube;

### 4 - webpack:
    - Introduces THREE running on a server bundled by webpack


### 5 - transform:
    - Introduces rotations, positions, scale, also quartenions
    - quartenions solve the problem of rotation order, also there is a function that properly define the order of rotation independently of which rotation axis is called first

### 6 - animations:

    - How to dinamicaly set frame by frame, function requestNextFrame is key for looping.
    - gsap library is a nice plus with internal tick
    - Timing sometime is important to normalize the frame rate on all running devices.

### 7 - cameras:
    -Go through all the  existing types of camera.
    - Camera => abstract class no to be instanciated
    - Stereo => VR
    - Array Camer => multiple cameras rendered
    - Cube => 6 renders of surronding, for shadows, environment, refractions.
    - orthographic camera => without perspective
    - perpective => with sense of depth.
    
    -controls:
        - Device orientation (iOS do not support)
        - Fly control: kind of hover around
        - First Person Control (fixed upaxis)
        - PointerLock control (like cs go)
        - Orbit Control: is cool to plane lock
        - Transform Controls: about moving meshes positions by the axes
        - Drag Controls: also About moving meshes freely
        -USE THEM WHENEVER THEY CAN SOLVE YOUR PROBLEM

### 08-full-screen/resizing:
        - just a couple tricks to resize and access full screen using double click
        - also works on safari

### 09 - geometries:
        - built in geometries in threejs (box, plane, cone, circle, cylinder, ring, torus, torusknot,dodecahedron, octahedron, tetrahedron, icosahedron, sphere, shape, tube,extrude, lathe, text)
        -bufferGeometries to create custom geometries
        - using Float32Array
        - explaining faces, positions of vertices, particles
        - uv, normals,position, in particles

# 10 - debug ui:

        - tools so you can debug easily your ui

### 11 - texture:
    - color (albedo): the paint of the texture
    - alpha: greyscale to show more or less of the color
    - height: add topology height to mesh, need subdivions
    - normal: imitates height, but deflecting light, no need for subdivisions
    - ambient occlusion: greyscal, fake shadows, not physically right, grayscale image, helps contrast
    - metalness: add reflectioness, black not metalic, white is metalic ;
    - roughness: mostly right dissipation, works with metalness, white is rough, black is smooth, 
    - based on Physically Based Rendering
    
    - minification filter happens using mipmapping when the renderer pixel is greater then the imagepixel information
    - magninfication filter, for increasing sharpness minicraft effect

12 - materials:

    - there are many material to choose from in three.js.
    - Phong, Lambert, basic, Toon, standard.
    - point material is for particles
    -shadermaterial, rawshader are nice to create custom materials


14 - lights:

    - rectarealight --> only works with standard and physical mesh
    - ambientlight -- min cost
    - pointlight -- moderate cost
    - directional -- moderate cost
    - hemisphere -- min cost
    - spotlight -- high cost 
    - rectlight -- high cost
    -light helper takes the type of the light and give a visual cue

15 - shadow:

    - core is the basic shadow
    - castShadow and receiveShadow to each object
    - only pointlight, spotlight, directional light can support shadow
    - when defining the dimensions, if the values are too small the shadows will be cropped

### 17 particles -

    - Particles are surfaces that can be instantiated as point materials, and behave as sparse repetitive geometries.

### 19 - galaxy-generator -

    - in depth application of particles, some really inspiring solutions to achieve the wanted results

### 20 - physics

    - Can be customized from vanilla three.js
    - usually is better to use a third party physics library
    - a parallel world with the physical properties must be created, in addition to the three.js world, everyframe you take the coordinate from the physical relative object and mirror it in the three.js world.
    
