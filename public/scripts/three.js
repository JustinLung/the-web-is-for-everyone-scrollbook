import { getAllBooks } from './modules/api.js'
/* Scene ====================================================== */
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xffffff)

/* Camera & Renderer ====================================================== */
const camera = new THREE.PerspectiveCamera(
  140,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
const renderer = new THREE.WebGLRenderer({ alpha: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0x000000, 0)
document.body.appendChild(renderer.domElement)

/* Controls ====================================================== */
const controls = new THREE.OrbitControls(camera, renderer.domElement)
controls.enableRotate = false
controls.enableZoom = false
controls.enableDamping = true
controls.mouseButtons = { LEFT: THREE.MOUSE.PAN }
controls.touches = { ONE: THREE.TOUCH.PAN }
controls.panSpeed = 0.4
controls.dampingFactor = 0.03

/* Drawing image ====================================================== */
const loader = new THREE.TextureLoader()

/* Setting up Raycaster for events ====================================================== */
const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

const group = new THREE.Group()
setGroup()
const light = new THREE.PointLight(0xffffff, 1, 0)
light.position.set(1, 1, 100)
scene.add(light)

/* Animating meshes ====================================================== */

/* Updating camera and Controls ====================================================== */
camera.position.z = 5
camera.minDistance = 5
controls.update()

/* Scene ====================================================== */
function animate() {
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}

/* Logic ====================================================== */
window.addEventListener('load', onWindowResize)
window.addEventListener('resize', onWindowResize)
renderer.domElement.addEventListener('click', onMouseClick)
animate()

/* Methods ====================================================== */
async function setGroup() {
  const books = await getAllBooks()
  for (let i = 0; i < books.length; i++) {
    const material = new THREE.MeshBasicMaterial({
      //map: loader.load('/assets/ipad.png'),
      map: loader.load(`https://raw.githubusercontent.com/JustinLung/the-web-is-for-everyone-scrollbook/${books[i].book_cover}`),
      transparent: true,
    })
    const geometry = new THREE.PlaneGeometry(7.04, 12 * 0.75)
    const mesh = new THREE.Mesh(geometry, material)

    mesh.callback = function () {
      gsap.to(group.children[i].material, { opacity: 0 })
      gsap.to(group.children[i].position, { z: 2 })
      setTimeout(() => {
        window.location.href = `/book/${i + 1}`
      }, 1100)
    }

    const rowLengths = [3, 4]
    const [x, y] = getBookPositionCool(i, rowLengths)
    const offsets = [0, 0.5]
    mesh.position.x = x * 9
    mesh.position.y = y * 11 - offsets[x % rowLengths.length] * 11
    // mesh.position.y = x % 2 == 0 ? (y + .5) * 11   : y * 11

    group.add(mesh)
  }
  new THREE.Box3()
    .setFromObject(group)
    .getCenter(group.position)
    .multiplyScalar(-1)
  scene.add(group)

  for (let i = 0; i < group.children.length; i++) {
    gsap.fromTo(
      group.children[i].material,
      { opacity: 0 },
      { opacity: 1, delay: i * 0.1 }
    )
    gsap.fromTo(
      group.children[i].position,
      { z: 1.5 },
      { z: 1, delay: i * 0.1 }
    )
  }
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)

  animate()
}

function onMouseClick(event) {
  event.preventDefault()

  mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1
  mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1

  raycaster.setFromCamera(mouse, camera)

  const intersects = raycaster.intersectObjects(group.children)

  if (intersects.length > 0) {
    intersects[0].object.callback()
  }
}

function getBookPosition(index) {
  const EVEN_ROW_LENGTH = 3
  const ODD_ROW_LENGTH = 4

  const subRow = Math.floor(index / (EVEN_ROW_LENGTH + ODD_ROW_LENGTH))
  const subColumn = index % (EVEN_ROW_LENGTH + ODD_ROW_LENGTH)

  const evenRow = subColumn < EVEN_ROW_LENGTH

  let row = subRow * 2
  if (!evenRow) row++

  let column = subColumn
  if (!evenRow) column -= EVEN_ROW_LENGTH

  return [row, column]
}

function getBookPositionCool(index, sequence) {
  const sequencePositionLength = sequence.reduce((prev, curr) => prev + curr)

  const sequenceRow = Math.floor(index / sequencePositionLength)
  const sequenceColumn = index % sequencePositionLength

  let accumulative = 0
  let sequenceIndex = 0

  for (let i = 0; i < sequence.length; i++) {
    const length = sequence[i]
    accumulative += length
    if (accumulative > sequenceColumn) break
    sequenceIndex++
  }

  const row = sequenceRow * sequence.length + sequenceIndex
  const slicedSequence = sequence.slice(0, sequenceIndex)
  const column =
    sequenceColumn -
    (slicedSequence.length > 0
      ? slicedSequence.reduce((prev, curr) => prev + curr)
      : 0)

  return [row, column]
}
