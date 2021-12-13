import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Stats from 'three/examples/jsm/libs/stats.module'
import gsap from 'gsap'

let showingScreen = false

const scene = new THREE.Scene()
// scene.add(new THREE.AxesHelper(5))

const light = new THREE.SpotLight()
light.position.set(5, 5, 5)
scene.add(light)

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 3
camera.position.x = -0.5
console.log(camera.position)

const canvas = document.getElementById("canvas") as HTMLCanvasElement
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
})

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// const controls = new OrbitControls(camera, renderer.domElement)
// controls.enableDamping = true

const loader = new GLTFLoader()
loader.load(
    'models/scene.gltf',
    function (gltf) {
        console.log(gltf.scene.scale)
        gltf.scene.scale.x = 0.5
        gltf.scene.scale.y = 0.5
        gltf.scene.scale.z = 0.5
        gltf.scene.rotation.x = Math.PI /2
        scene.add(gltf.scene)
    },
    (xhr) => {
        introAnimation()
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

const stats = Stats()
document.body.appendChild(stats.dom)


// animation functions
function introAnimation(){
    gsap.to(camera.position, {
        duration: 2,
        z: 1.5
    })
    const introText = document.getElementById("introText")
    gsap.to(introText, {
        duration: 2,
        top: 350
    })
}

function showScreen(){
    gsap.to(camera.position, {
        duration: 1,
        z: 0.75,
        y: 0.3,
        x: 0.3
    })
    const introText = document.getElementById("introText")
    gsap.to(introText, {
        duration: 2,
        top: 2000
    })
    const screenText = document.getElementById("screenText")
    gsap.to(screenText, {
        duration: 2,
        top: 250,
    })
}

function showSide(){
    gsap.to(camera.position, {
        duration: 1,
        z: 0.15,
        y: 0.4,
        x: 1
    })
    gsap.to(camera.rotation, {
        duration: 1,
        y: Math.PI /2 + 0.2
    })
    const screenText = document.getElementById("screenText")
    gsap.to(screenText, {
        duration: 2,
        top: 1500,
    })
    const thinText = document.getElementById("thinText")
    gsap.to(thinText, {
        duration: 2,
        top: 300,
    })

}


function animate() {
    requestAnimationFrame(animate)

    // controls.update()

    render()

    stats.update()
}

function render() {
    renderer.render(scene, camera)
}

const screenButton = document.getElementById("screenButton") as HTMLButtonElement
screenButton.onclick = showScreen

const thinButton = document.getElementById("thinButton") as HTMLButtonElement
thinButton.onclick = showSide

animate()