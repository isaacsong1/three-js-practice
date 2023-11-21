import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { ParametricGeometry } from 'three/addons/geometries/ParametricGeometry.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

function main() {

	const canvas = document.querySelector( '#c' );
	const renderer = new THREE.WebGLRenderer( { antialias: true, canvas } );

	const fov = 40;
	const aspect = 2; // the canvas default
	const near = 0.1;
	const far = 1000;
	const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
	camera.position.z = 120;

	const scene = new THREE.Scene();
    // scene.background = new THREE.Color( 0xAAAAAA );

    {

		const color = 0xFFFFFF;
		const intensity = 3;
		const light = new THREE.DirectionalLight( color, intensity );
		light.position.set( - 1, 2, 4 );
		scene.add( light );

	}

    {

		const color = 0xFFFFFF;
		const intensity = 3;
		const light = new THREE.DirectionalLight( color, intensity );
		light.position.set( 1, - 2, - 4 );
		scene.add( light );

	}

    const objects = [];
    const spread = 15;

    function addObject(x, y, obj) {
        obj.position.x = x * spread;
        obj.position.y = y * spread;

        scene.add(obj);
        objects.push(obj);
    }

    function createMaterial() {
        const material = new THREE.MeshPhongMaterial({
            side: THREE.DoubleSide,
        });

        const hue = Math.random()
        const saturation = 1;
        const luminance = 0.5;
        material.color.setHSL(hue, saturation, luminance);

        return material
    }

    function addSolidGeometry(x, y, geometry) {
        const mesh = new THREE.Mesh(geometry, createMaterial());
        addObject(x, y, mesh)
    }

    function addLineGeometry( x, y, geometry ) {

		const material = new THREE.LineBasicMaterial( { color: 0x000000 } );
		const mesh = new THREE.LineSegments( geometry, material );
		addObject( x, y, mesh );

	}

	{
        // CUBE
		const width = 8;
		const height = 8;
		const depth = 8;
		addSolidGeometry( - 2, 2, new THREE.BoxGeometry( width, height, depth ) );

	}

	{
        // 2D CIRCLE
		const radius = 7;
		const segments = 24;
		addSolidGeometry( - 1, 2, new THREE.CircleGeometry( radius, segments ) );

	}

	{
        // CONE
		const radius = 6;
		const height = 8;
		const segments = 16;
		addSolidGeometry( 0, 2, new THREE.ConeGeometry( radius, height, segments ) );

	}

    {
        // CYLINDER
		const radiusTop = 4;
		const radiusBottom = 4;
		const height = 8;
		const radialSegments = 12;
		addSolidGeometry( 1, 2, new THREE.CylinderGeometry( radiusTop, radiusBottom, height, radialSegments ) );

	}

	{
        // DODECAHEDRON
		const radius = 7;
		addSolidGeometry( 2, 2, new THREE.DodecahedronGeometry( radius ) );

	}

    {
        // HEART
		const shape = new THREE.Shape();
		const x = - 2.5;
		const y = - 5;
		shape.moveTo( x + 2.5, y + 2.5 );
		shape.bezierCurveTo( x + 2.5, y + 2.5, x + 2, y, x, y );
		shape.bezierCurveTo( x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5 );
		shape.bezierCurveTo( x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5 );
		shape.bezierCurveTo( x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5 );
		shape.bezierCurveTo( x + 8, y + 3.5, x + 8, y, x + 5, y );
		shape.bezierCurveTo( x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5 );

		const extrudeSettings = {
			steps: 2,
			depth: 2,
			bevelEnabled: true,
			bevelThickness: 1,
			bevelSize: 1,
			bevelSegments: 2,
		};

		addSolidGeometry( - 2, 1, new THREE.ExtrudeGeometry( shape, extrudeSettings ) );

	}

    {
        // ICOSAHEDRON
		const radius = 7;
		addSolidGeometry( - 1, 1, new THREE.IcosahedronGeometry( radius ) );

	}

	{
        // LAMP SHADE
		const points = [];
		for ( let i = 0; i < 10; ++ i ) {

			points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 3 + 3, ( i - 5 ) * .8 ) );

		}

		addSolidGeometry( 0, 1, new THREE.LatheGeometry( points ) );

    }

    {
        // OCTAHEDRON
		const radius = 7;
		addSolidGeometry( 1, 1, new THREE.OctahedronGeometry( radius ) );

	}

    {
        // ELEPHANT TRUNK SHAPE
		/*
    from: https://github.com/mrdoob/three.js/blob/b8d8a8625465bd634aa68e5846354d69f34d2ff5/examples/js/ParametricGeometries.js

    The MIT License

    Copyright © 2010-2018 three.js authors

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.

    */
		function klein( v, u, target ) {

			u *= Math.PI;
			v *= 2 * Math.PI;
			u = u * 2;

			let x;
			let z;

			if ( u < Math.PI ) {

				x = 3 * Math.cos( u ) * ( 1 + Math.sin( u ) ) + ( 2 * ( 1 - Math.cos( u ) / 2 ) ) * Math.cos( u ) * Math.cos( v );
				z = - 8 * Math.sin( u ) - 2 * ( 1 - Math.cos( u ) / 2 ) * Math.sin( u ) * Math.cos( v );

			} else {

				x = 3 * Math.cos( u ) * ( 1 + Math.sin( u ) ) + ( 2 * ( 1 - Math.cos( u ) / 2 ) ) * Math.cos( v + Math.PI );
				z = - 8 * Math.sin( u );

			}

			const y = - 2 * ( 1 - Math.cos( u ) / 2 ) * Math.sin( v );

			target.set( x, y, z ).multiplyScalar( 0.75 );

		}

		const slices = 25;
		const stacks = 25;
		addSolidGeometry( 2, 1, new ParametricGeometry( klein, slices, stacks ) );

	}

	{
        // 2D SQUARE
		const width = 9;
		const height = 9;
		const widthSegments = 2;
		const heightSegments = 2;
		addSolidGeometry( - 2, 0, new THREE.PlaneGeometry( width, height, widthSegments, heightSegments ) );

	}
	
    {
        // TYPE OF SPHERE
		const verticesOfCube = [
			- 1, - 1, - 1, 1, - 1, - 1, 1, 1, - 1, - 1, 1, - 1,
			- 1, - 1, 1, 1, - 1, 1, 1, 1, 1, - 1, 1, 1,
		];
		const indicesOfFaces = [
			2, 1, 0, 0, 3, 2,
			0, 4, 7, 7, 3, 0,
			0, 1, 5, 5, 4, 0,
			1, 2, 6, 6, 5, 1,
			2, 3, 7, 7, 6, 2,
			4, 5, 6, 6, 7, 4,
		];
		const radius = 7;
		const detail = 2;
		addSolidGeometry( - 1, 0, new THREE.PolyhedronGeometry( verticesOfCube, indicesOfFaces, radius, detail ) );

	}

    {
        // 2D DONUT
		const innerRadius = 2;
		const outerRadius = 7;
		const segments = 18;
		addSolidGeometry( 0, 0, new THREE.RingGeometry( innerRadius, outerRadius, segments ) );

	}

	{
        // 2D HEART
		const shape = new THREE.Shape();
		const x = - 2.5;
		const y = - 5;
		shape.moveTo( x + 2.5, y + 2.5 );
		shape.bezierCurveTo( x + 2.5, y + 2.5, x + 2, y, x, y );
		shape.bezierCurveTo( x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5 );
		shape.bezierCurveTo( x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5 );
		shape.bezierCurveTo( x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5 );
		shape.bezierCurveTo( x + 8, y + 3.5, x + 8, y, x + 5, y );
		shape.bezierCurveTo( x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5 );
		addSolidGeometry( 1, 0, new THREE.ShapeGeometry( shape ) );

	}

	{
        // TYPE OF SPHERE
		const radius = 7;
		const widthSegments = 12;
		const heightSegments = 8;
		addSolidGeometry( 2, 0, new THREE.SphereGeometry( radius, widthSegments, heightSegments ) );

	}

    {
        // TETRAHEDRON
		const radius = 7;
		addSolidGeometry( - 2, - 1, new THREE.TetrahedronGeometry( radius ) );

	}

    {
        // TEXT TO 3D
		const loader = new FontLoader();
		// promisify font loading
		function loadFont( url ) {

			return new Promise( ( resolve, reject ) => {

				loader.load( url, resolve, undefined, reject );

			} );

		}

		async function doit() {

			const font = await loadFont( 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json' ); 
			const geometry = new TextGeometry( 'three.js', {
				font: font,
				size: 3.0,
				height: .2,
				curveSegments: 12,
				bevelEnabled: true,
				bevelThickness: 0.15,
				bevelSize: .3,
				bevelSegments: 5,
			} );
			const mesh = new THREE.Mesh( geometry, createMaterial() );
			geometry.computeBoundingBox();
			geometry.boundingBox.getCenter( mesh.position ).multiplyScalar( - 1 );

			const parent = new THREE.Object3D();
			parent.add( mesh );

			addObject( - 1, - 1, parent );

		}

		doit();

	}

    {
        // TORUS
		const radius = 5;
		const tubeRadius = 2;
		const radialSegments = 8;
		const tubularSegments = 24;
		addSolidGeometry( 0, - 1, new THREE.TorusGeometry( radius, tubeRadius, radialSegments, tubularSegments ) );

	}

	{
        // TORUS KNOT
		const radius = 3.5;
		const tube = 1.5;
		const radialSegments = 8;
		const tubularSegments = 64;
		const p = 2;
		const q = 3;
		addSolidGeometry( 1, - 1, new THREE.TorusKnotGeometry( radius, tube, tubularSegments, radialSegments, p, q ) );

	}

    {
        // SINE CURVE
		class CustomSinCurve extends THREE.Curve {

			constructor( scale ) {

				super();
				this.scale = scale;

			}
			getPoint( t ) {

				const tx = t * 3 - 1.5;
				const ty = Math.sin( 2 * Math.PI * t );
				const tz = 0;
				return new THREE.Vector3( tx, ty, tz ).multiplyScalar( this.scale );

			}

		}

		const path = new CustomSinCurve( 4 );
		const tubularSegments = 20;
		const radius = 1;
		const radialSegments = 8;
		const closed = false;
		addSolidGeometry( 2, - 1, new THREE.TubeGeometry( path, tubularSegments, radius, radialSegments, closed ) );

	}

    {
        // CUBE EDGES ONLY
		const width = 8;
		const height = 8;
		const depth = 8;
		const thresholdAngle = 15;
		addLineGeometry( - 1, - 2, new THREE.EdgesGeometry(
			new THREE.BoxGeometry( width, height, depth ),
			thresholdAngle ) );

	}

	{
        // CUBE WIREFRAME
		const width = 8;
		const height = 8;
		const depth = 8;
		addLineGeometry( 1, - 2, new THREE.WireframeGeometry( new THREE.BoxGeometry( width, height, depth ) ) );

	}
    
	function resizeRendererToDisplaySize( renderer ) {

		const canvas = renderer.domElement;
		const pixelRatio = window.devicePixelRatio;
		const width = canvas.clientWidth * pixelRatio | 0;
		const height = canvas.clientHeight * pixelRatio | 0;
		const needResize = canvas.width !== width || canvas.height !== height;
		if ( needResize ) {

			renderer.setSize( width, height, false );

		}

		return needResize;

	}

	function render( time ) {

		time *= 0.001;

		if ( resizeRendererToDisplaySize( renderer ) ) {

			const canvas = renderer.domElement;
			camera.aspect = canvas.clientWidth / canvas.clientHeight;
			camera.updateProjectionMatrix();

		}

		objects.forEach( ( obj, ndx ) => {

			const speed = 0.1 + ndx * 0.05;
			const rot = time * speed;
			obj.rotation.x = rot;
			obj.rotation.y = rot;

		} );

		renderer.render( scene, camera );

		requestAnimationFrame( render );

	}

	requestAnimationFrame( render );

}

main();
