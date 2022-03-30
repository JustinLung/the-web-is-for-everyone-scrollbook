/* Scene ====================================================== */
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xffffff)

/* Camera & Renderer ====================================================== */
const camera = new THREE.PerspectiveCamera(150, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({alpha: true})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0x000000, 0)
document.body.appendChild(renderer.domElement)

/* Controls ====================================================== */
const controls = new THREE.OrbitControls( camera, renderer.domElement )
controls.enableRotate = false
controls.enableZoom = false
controls.enableDamping = true
controls.mouseButtons = {LEFT: THREE.MOUSE.PAN}
controls.touches = {ONE: THREE.TOUCH.PAN}
controls.panSpeed = .4

/* Geometries ====================================================== */
// const geometry = drawSquare(3,3,7,7)
// const material = new THREE.MeshBasicMaterial({color: 0x000, side: THREE.DoubleSide})
// const mesh = new THREE.Mesh(geometry, material)

/* Drawing image ====================================================== */
const loader = new THREE.TextureLoader()

const material = new THREE.MeshBasicMaterial({map: loader.load('/assets/it-cover.png'), transparent: true})
const geometry = new THREE.PlaneGeometry(10, 10*.75)
const mesh = new THREE.Mesh(geometry, material)

var light = new THREE.PointLight(0xffffff, 1, 0)
light.position.set(1, 1, 100 )
scene.add(light)

/* Adding meshes ====================================================== */
scene.add( mesh )

/* Updating camera and Controls ====================================================== */
camera.position.z = 5
camera.minDistance = 5
controls.update()

/* Scene ====================================================== */
function animate() {
	requestAnimationFrame( animate )
  controls.update()
	renderer.render( scene, camera )
}

/* Logic ====================================================== */
window.addEventListener('load', onWindowResize)
window.addEventListener('resize', onWindowResize)
animate()


/* Methods ====================================================== */
function drawSquare(x1, y1, x2, y2) {

  const square = new THREE.BufferGeometry()
  const vertices = new Float32Array( [
    -1.0, -1.0,  1.0,
     1.0, -1.0,  1.0,
     1.0,  1.0,  1.0,
  
     1.0,  1.0,  1.0,
    -1.0,  1.0,  1.0,
    -1.0, -1.0,  1.0
  ] )
  square.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) )
  return square
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize( window.innerWidth, window.innerHeight )

  animate()
}