import * as THREE from 'three';

// Cargar las texturas
const loader = new THREE.TextureLoader();
const baseColor = loader.load('/Modelos/PER_PRIN/PP_2/DR_BC2.png');
const normalMap = loader.load('/Modelos/PER_PRIN/PP_1/DR_NO.png');
const roughnessMap = loader.load('/Modelos/PER_PRIN/PP_1/DR_RO.png');
const opacityMap = loader.load('/Modelos/PER_PRIN/PP_1/DR_OP.png');
const emissiveMap = loader.load('/Modelos/PER_PRIN/PP_1/DR_EM.png');
const metalnessMap = loader.load('/Modelos/PER_PRIN/PP_1/DR_ME.png');

// Crear un material y asignarle las texturas
const texturaDron2 = new THREE.MeshStandardMaterial({
    map: baseColor, // Base color map
    normalMap: normalMap, // Normal map
    roughnessMap: roughnessMap, // Roughness map
    alphaMap: opacityMap, // Usar alphaMap en lugar de opacityMap
    emissiveMap: emissiveMap, // Emissive map
    metalnessMap: metalnessMap, // Metalness map
    transparent: true, // Si la textura de opacidad es transparente
    emissive: new THREE.Color(0x000000), // Color de emisión
    metalness: 1.0, // Valor de metalness
    roughness: 0.5 // Valor de roughness
});

export {texturaDron2};