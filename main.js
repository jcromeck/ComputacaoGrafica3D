import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color( 'white' );
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;
const texture = new THREE.TextureLoader().load('textures/textura.png' );

var input = document.querySelector("#geometry");
const btn = document.getElementById("btn");
var obj;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var objeto = new THREE.Mesh( geometry, material );
scene.add( objeto );

btn.addEventListener("click", function(){
    for( var i = scene.children.length - 1; i >= 0; i--) { 
        obj = scene.children[i];
        scene.remove(obj); 
   }
    switch(input.value){
        case 'Capsula':
            geometry = new THREE.CapsuleGeometry( 1, 1, 4, 8 );
            break;
        case 'Cubo':
            geometry = new THREE.BoxGeometry( 1, 1, 1 );
            break;
        case 'Esfera':
            geometry = new THREE.SphereGeometry( 1, 32, 16 ); 
            break;
        case 'Linha basica':
            material = new THREE.LineBasicMaterial( { color: 0x00ff00});
            break;
        case 'Meshdepth':
            material = new THREE.MeshDepthMaterial( { wireframe: true } );
            break;
        case 'LoadTextura':
            material = material = new THREE.MeshBasicMaterial( { map:texture } );
            break;
        default:
            geometry = new THREE.TorusKnotGeometry( 1, 0.18, 100, 10 );
            material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } ); 
            break;
    }
    objeto = new THREE.Mesh( geometry, material );
    scene.add(objeto);
    render();
});

function animate() {
	requestAnimationFrame( animate );


	objeto.rotation.x += 0.01;
	objeto.rotation.y += 0.01;

	render();
}

function render() {
    renderer.render(scene, camera)
}

if ( WebGL.isWebGLAvailable() ) {

	animate();

} else {

	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );

}