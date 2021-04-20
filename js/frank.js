//setup... everything
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//TODO: impliment options
var options = {
    grids: {
        rect: false,
        radi: false
    },
    lights: {
        sun: true,
        dev: false
    }
};
//set camera position
camera.position.set(3, 3, 5);

//apply and create renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


//create texture loader and eaerth/cloud mats
let txtloader = new THREE.TextureLoader();
let earthmat = new THREE.MeshStandardMaterial({
    color: 0xffffff,//default color

    //textures
    map: THREE.ImageUtils.loadTexture('res/earth/8k_earth_daymap.jpg'),
    normalMap: THREE.ImageUtils.loadTexture('res/earth/8k_earth_normal_map.jpg'),

    //roughness maps
    roughness: 1,
    roughnessMap: THREE.ImageUtils.loadTexture('res/earth/8k_earth_specular_map.tif'),

    //night time
    lightMapIntensity: 0.5,
    emissive: 0xffffff,
    lightMap: THREE.ImageUtils.loadTexture('res/earth/8k_earth_nightmap.jpg')
});
let earthgeo = new THREE.SphereGeometry(2, 30, 30);

let cloudmat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    opacity: 1,
    roughness: 0.325
});

let cloudgeo = new THREE.SphereGeometry(2.05, 30, 30);
txtloader.load('res/earth/clouds/8k_earth_clouds.jpg', (texture) => {
    //set texture
    clouds.material.map = texture;
    clouds.material.needsUpdate = true;
    console.log('loaded cloud textures and attempted overlay');

    txtloader.load('res/earth/clouds/8k_earth_clouds.jpg', (alphamap) => {
        //set alpha map
        clouds.material.alphaMap = alphamap;
        clouds.material.transparent = true;
        clouds.material.needsUpdate = true;
        console.log('loaded cloud transparency and attempted apply');
    });
});

//create meshes
earth = new THREE.Mesh(earthgeo, earthmat);
clouds = new THREE.Mesh(cloudgeo, cloudmat);

//mesh grid: dev edition
//displays a static 3d grid of vairable square size for dev use
//DISABLE THESE IN PROD
const grid = new THREE.GridHelper(10, 10);
const pgrid = new THREE.PolarGridHelper(10, 10, 5, 64);
// scene.add(pgrid);
// scene.add(grid);

//add objects to scene
scene.add(earth);
scene.add(clouds);

//add work light
//DISABLE THIS IN PROD
// scene.add(new THREE.HemisphereLight(0xffffFF, 0x080820, 1));

let l = new THREE.PointLight(0xfffffb, 1, 0, 20);
l.position.set(camera.position.x + 2, camera.position.y + 2, -camera.position.z - 2);
scene.add(l);


earth.rotation.y = 0.0000041781 * new Date().getTime();

let cloudspeed = 0.0005;
setInterval(() => {
    if (Math.round(Math.random()) || cloudspeed >= 0.001) {
        cloudspeed -= 0.0001;
        // console.log('decreased cloud speed: ' + Math.round(cloudspeed * 10000) / 10000);
    }
    else {
        cloudspeed += 0.0001;
        // console.log('increased cloud speed: ' + Math.round(cloudspeed * 10000) / 10000);
    }
}, 1000);

//render animation frames
function animate(elapsed) {
    requestAnimationFrame(animate);

    earth.rotation.y += 0.00041781;
    clouds.rotation.y += cloudspeed;
    //tells how much the earth has turned
    //console.log(earth.rotation.y)
    camera.lookAt(earth.position.x, earth.position.y, earth.position.z);
    renderer.render(scene, camera);
}

animate();