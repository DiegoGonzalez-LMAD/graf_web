import * as THREE from 'three';
import { OrbitControls } from '/node_modules/three/examples/jsm/controls/OrbitControls.js';
import { FBXLoader } from '/node_modules/three/examples/jsm/loaders/FBXLoader.js';
import {texturaDron} from '/Modelos/PER_PRIN/PP_1/scriptTXT_PP1.js'
import {texturaDron2} from '/Modelos/PER_PRIN/PP_2/scriptTXT_PP2.js'
import {texturaESC1} from '/Modelos/ESCENARIOS/ESC1/scriptTXT_ESC1.js'

const loader = new THREE.TextureLoader();

// Se crea la escena
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 3000);
camera.position.z = 114;
camera.position.x=-7;
camera.position.y=1.5;
const clock1 = new THREE.Clock();
const clock2 = new THREE.Clock();

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Controles orbitales
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true;
controls.target.set(0, 1, 0);

// Se añade luz ambiental
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3); 
scene.add(ambientLight);

// Se añade luz direccional
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);

//Carga texturas desde un archivo externo
const texturaDronCom = texturaDron;
const texturaDron2Com=texturaDron2;
const texturaEscen1=texturaDron2;

// Cargar el modelo FBX
const ModeloPP = new FBXLoader();
ModeloPP.load('/Modelos/PER_PRIN/PP_1/DRONE.fbx', function (object) {
    object.traverse(function (child) {
        if (child.isMesh) {
            child.material = texturaDronCom;
        }
    });

    // Verificar que el objeto es válido antes de agregarlo a la escena
    if (object instanceof THREE.Object3D) {
        object.position.set(0, -35, -50);  // Mover el objeto
        object.scale.set(0.3, 0.3, 0.3); // Escalar el modelo
        scene.add(object);
        const mixer = new THREE.AnimationMixer(object);
        if (object.animations && object.animations.length) {
            const clips = object.animations;
            function update() {
                const delta = clock1.getDelta(); 
                mixer.update(delta); 
            }
            function animate() {
                requestAnimationFrame(animate);
                renderer.render(scene, camera); 
                update(); 
            }
            animate();
            const clip = THREE.AnimationClip.findByName(clips, 'Take001'); 
            if (clip) {
                const action = mixer.clipAction(clip);
                action.play();
            }
            clips.forEach(function (clip) {
                mixer.clipAction(clip).play();
            });

        } else {
            console.error('El modelo no tiene animaciones.');
        }
    } else {
        console.error('Error: El objeto cargado no es válido para agregar a la escena.');
    }
}, undefined, function (error) {
    console.error('Error al cargar el modelo FBX:', error);
});



//Modelo 2 Personaje Principal
const ModeloPP2 = new FBXLoader();
ModeloPP.load('/Modelos/PER_PRIN/PP_1/DRONE.fbx', function (object) {
    object.traverse(function (child) {
        if (child.isMesh) {
            child.material = texturaDron2Com;
        }
    });
    // Verifica que el objeto sea válido antes de añadirlo a la escena
    if (object instanceof THREE.Object3D) {
        object.position.set(60, -35, -50);  // Mover el objeto a la posición (2, 0, 0)
        object.scale.set(.3,.3,.3); // Escalar el modelo en 1.5 veces
        scene.add(object);
        const mixer = new THREE.AnimationMixer(object);
        if (object.animations && object.animations.length) {
            const clips = object.animations;
            function update() {
                const delta = clock2.getDelta(); 
                mixer.update(delta); 
            }
            function animate() {
                requestAnimationFrame(animate);
                renderer.render(scene, camera); 
                update(); 
            }
            animate();
            const clip = THREE.AnimationClip.findByName(clips, 'Take001'); 
            if (clip) {
                const action = mixer.clipAction(clip);
                action.play();
            }
            clips.forEach(function (clip) {
                mixer.clipAction(clip).play();
            });

        } else {
            console.error('El modelo no tiene animaciones.');
        }
    } else {
        console.error('Error: El objeto cargado no es válido para agregar a la escena.');
    }
}, undefined, function (error) {
    console.error(error);
});

//Modelo 2 Personaje Principal
const Escenario1 = new FBXLoader();
ModeloPP.load('/Modelos/ESCENARIOS/ESC1/ESC1.fbx', function (object) {
    object.traverse(function (child) {
        if (child.isMesh) {
            child.material = texturaESC1;
        }
    });
    // Verifica que el objeto sea válido antes de añadirlo a la escena
    if (object instanceof THREE.Object3D) {
        object.position.set(60, -35, -50);  // Mover el objeto a la posición (2, 0, 0)
        object.scale.set(1,1,1); // Escalar el modelo en 1.5 veces
        scene.add(object);
    } else {
        console.error('Error: El objeto cargado no es válido para agregar a la escena.');
    }
}, undefined, function (error) {
    console.error(error);
});



// Función de animación
function animate() {
    controls.update(); // Actualiza el control orbital
    renderer.render(scene, camera);
    requestAnimationFrame(animate); 
}

animate(); // Iniciar animación
