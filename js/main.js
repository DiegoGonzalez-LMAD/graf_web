import * as THREE from 'three';
import { OrbitControls } from '/node_modules/three/examples/jsm/controls/OrbitControls.js';
import { FBXLoader } from '/node_modules/three/examples/jsm/loaders/FBXLoader.js';
import { GLTFLoader } from '/node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { texturaDron } from '/Modelos/PER_PRIN/PP_1/scriptTXT_PP1.js';
import { texturaDron2 } from '/Modelos/PER_PRIN/PP_2/scriptTXT_PP2.js';
import { texturaESC1 } from '/Modelos/ESCENARIOS/ESC1/scriptTXT_ESC1.js';
import { texturaGALAXY } from '/Modelos/ESCENARIOS/SKYBOX/scriptTXT_SKY.js';
import { texturaEnemy1 } from '/Modelos/ENEMIGOS/ENEMY_1/scriptTXT_EN1.js';
import { texturaENEM2 } from '/Modelos/ENEMIGOS/ENEMY_2/scriptTXT_EN2.js';

const loader = new THREE.TextureLoader();

// Se crea la escena
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 8000);
camera.position.z = 114;
camera.position.x = -7;
camera.position.y = 1.5;
const clock1 = new THREE.Clock();
const clock2 = new THREE.Clock();
const clockEN1 = new THREE.Clock();
const clockEN2 = new THREE.Clock();

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controles orbitales
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(0, 1, 0);

// Se añade luz ambiental
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

// Se añade luz direccional
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);

// Cargar texturas
const texturaDronCom = texturaDron;
const texturaDron2Com = texturaDron2;
const texturaEscen1 = texturaDron2;
const texturaSkybix = texturaGALAXY;

// Cargar el modelo FBX
const ModeloPP = new FBXLoader();
ModeloPP.load('/Modelos/PER_PRIN/PP_1/DRONE.fbx', function (object) {
    if (object instanceof THREE.Object3D) {
        object.traverse(function (child) {
            if (child.isMesh) {
                child.material = texturaDronCom;
            }
        });

        object.position.set(0, -35, -50);
        object.scale.set(0.3, 0.3, 0.3);
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

// Cargar otro modelo FBX para el segundo personaje
const ModeloPP2 = new FBXLoader();
ModeloPP2.load('/Modelos/PER_PRIN/PP_1/DRONE.fbx', function (object) {
    if (object instanceof THREE.Object3D) {
        object.traverse(function (child) {
            if (child.isMesh) {
                child.material = texturaDron2Com;
            }
        });
        object.position.set(60, -35, -50);
        object.scale.set(0.3, 0.3, 0.3);
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
    console.error('Error al cargar el modelo FBX:', error);
});

// Cargar escenario 1
const Escenario1 = new FBXLoader();
Escenario1.load('/Modelos/ESCENARIOS/ESC1/ESC1.fbx', function (object) {
    if (object instanceof THREE.Object3D) {
        object.traverse(function (child) {
            if (child.isMesh) {
                child.material = texturaESC1;
            }
        });
        object.position.set(60, -35, -50);
        object.scale.set(1, 1, 1);
        scene.add(object);
    } else {
        console.error('Error: El objeto cargado no es válido para agregar a la escena.');
    }
}, undefined, function (error) {
    console.error('Error al cargar el escenario:', error);
});

// Cargar Skybox 
const Skybox = new FBXLoader();
Skybox.load('/Modelos/ESCENARIOS/SKYBOX/GALAXY_2.fbx', function (object) {
    if (object instanceof THREE.Object3D) {
        object.traverse(function (child) {
            if (child.isMesh) {
                child.material = texturaGALAXY;
            }
        });
        object.position.set(0, 0, 0);
        object.scale.set(7, 7, 7);
        scene.add(object);
    } else {
        console.error('Error: El objeto cargado no es válido para agregar a la escena.');
    }
}, undefined, function (error) {
    console.error('Error al cargar el escenario:', error);
});

//Cargar enemigos
// Cargar otro modelo FBX para el segundo personaje
const Enemy1 = new FBXLoader();
Enemy1.load('/Modelos/ENEMIGOS/ENEMY_1/ENEMY1.fbx', function (object) {
    if (object instanceof THREE.Object3D) {
        object.traverse(function (child) {
            if (child.isMesh) {
                child.material = texturaEnemy1;
            }
        });
        object.position.set(120, -35, -50);
        object.scale.set(0.2, 0.2, 0.2);
        scene.add(object);
        const mixer = new THREE.AnimationMixer(object);
        if (object.animations && object.animations.length) {
            const clips = object.animations;
            function update() {
                const delta = clockEN1.getDelta();
                mixer.update(delta);
            }
            function animate() {
                requestAnimationFrame(animate);
                renderer.render(scene, camera);
                update();
            }
            animate();
            const clip = THREE.AnimationClip.findByName(clips, 'Flying');
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

// Cargar otro modelo FBX para el segundo personaje
const Enemy2 = new FBXLoader();
Enemy2.load('/Modelos/ENEMIGOS/ENEMY_2/BUG.fbx', function (object) {
    object.traverse(function (child) {
        if (child.isMesh) {
            child.material = texturaENEM2;
        }
    });

    object.position.set(-80, -35, -50);
    object.scale.set(0.3, 0.3, 0.3);
    scene.add(object);

    const mixer = new THREE.AnimationMixer(object);
    
    // 🔹 Ahora cargamos las animaciones desde otro archivo
    Enemy2.load('/Modelos/ENEMIGOS/ENEMY_2/BUG_WALK.fbx', function (anim) {
        console.log("Animaciones cargadas:", anim.animations);

        if (anim.animations.length > 0) {
            const clip = anim.animations[0]; // Toma la primera animación
            const action = mixer.clipAction(clip);
            action.play();
        } else {
            console.error("No se encontraron animaciones en el archivo.");
        }
    });

    // 🔹 Actualizar la animación en el loop de renderizado
    function update() {
        const delta = clockEN2.getDelta();
        mixer.update(delta);
    }

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        update();
    }
    animate();

}, undefined, function (error) {
    console.error('Error al cargar el modelo FBX:', error);
});



// Función de animación
function animate() {
    controls.update(); // Actualiza el control orbital
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate(); // Iniciar animación
