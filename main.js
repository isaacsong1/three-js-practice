// JavaScript File
import * as THREE from 'three';


// Basic Green Cube (no shading, no lights, rigged edges)
// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );

// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const material = new THREE.MeshPhongMaterial({color: 0x44aa88});  // greenish blue

// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

// camera.position.z = 5;

// function animate() {
// 	requestAnimationFrame( animate );

// 	cube.rotation.x += 0.01;
// 	cube.rotation.y += 0.01;

// 	renderer.render( scene, camera );

//     {
//         const color = 0xFFFFFF;
//         const intensity = 3;
//         const light = new THREE.DirectionalLight(color, intensity);
//         light.position.set(-1, 2, 4);
//         scene.add(light);
//     }
// }

// animate();

// Cube #2: With lighting
function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({antialias: true, canvas});

    const fov = 75;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;

    const scene = new THREE.Scene();

    {
        const color = 0xFFFFFF;
        const intensity = 3;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        scene.add(light);
    }

    // Simple Cube
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    // No lighting
    // const material = new THREE.MeshBasicMaterial({color: 0x44aa88});
    // With Lighting
    // const material = new THREE.MeshPhongMaterial({color: 0x44aa88});  // greenish blue
    // const cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);

    // Three Cubes
    function makeInstance(geometry, color, x) {
        const material = new THREE.MeshPhongMaterial({color});

        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        cube.position.x = x;

        return cube;
    }

    const cubes = [
        makeInstance(geometry, 0x44aa88,  0),
        makeInstance(geometry, 0x8844aa, -2),
        makeInstance(geometry, 0xaa8844,  2),
    ];


    

    // function render(time) {
    //     time *= 0.001;  // convert time to seconds

    //     cube.rotation.x = time;
    //     cube.rotation.y = time;

    //     renderer.render(scene, camera);

    //     requestAnimationFrame(render);
    // }

    // Spin Three Cubes at different rates
    function render(time) {
        time *= 0.001;  // convert time to seconds

        cubes.forEach((cube, ndx) => {
            const speed = 1 + ndx * .1;
            const rot = time * speed;
            cube.rotation.x = rot;
            cube.rotation.y = rot;
        });
        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
    
}




main();