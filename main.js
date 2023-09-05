import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color( 'white' );
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;
const texture = new THREE.TextureLoader().load('textures/textura.png' );
//camera.lookAt(scene.position);

var input = document.querySelector("#geometry");
const btn = document.getElementById("btn");
var obj;

//const loader = new THREE.GLTFLoader();
//loader.load('modelos/modeloexterno.glb', (gltf) => {
//    const model = gltf.scene;
//});

let spotLight = initSpotLight();

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
        case 'capsula':
            geometry = new THREE.CapsuleGeometry( 1, 1, 4, 8 );
            break;
        case 'Cubo':
            geometry = new THREE.BoxGeometry( 1, 1, 1 );
            break;
        case 'cubo':
            geometry = new THREE.BoxGeometry( 1, 1, 1 );
            break;
        case 'Esfera':
            geometry = new THREE.SphereGeometry( 1, 32, 16 ); 
            break;
        case 'esfera':
            geometry = new THREE.SphereGeometry( 1, 32, 16 ); 
            break;
        case 'Linha Basica':
            material = new THREE.LineBasicMaterial( { color: 0x00ff00});
            break;
        case 'linha basica':
            material = new THREE.LineBasicMaterial( { color: 0x00ff00});
            break;
        case 'Mesh Depth':
            material = new THREE.MeshDepthMaterial( { wireframe: true } );
            break;
        case 'mesh depth':
            material = new THREE.MeshDepthMaterial( { wireframe: true } );
            break;
        case 'Load Textura':
            material = material = new THREE.MeshBasicMaterial( { map:texture } );
            break;
        case 'load textura':
            material = material = new THREE.MeshBasicMaterial( { map:texture } );
            break;
        //case 'luz':
        //    scene.add(spotLight);
        //    break;
        //case 'modelo externo':
        //    scene.add(model);
        //    break;
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

function initSpotLight() {
    let spotLight = new THREE.SpotLight(0xFFFFFF);
    spotLight.position.set(-20, 40, -15);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
    spotLight.shadow.camera.far = 130;
    spotLight.shadow.camera.near = 40;
    return spotLight;
}


if ( WebGL.isWebGLAvailable() ) {

	animate();

} else {

	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );

}