//setup... everything
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//TODO: impliment options
var options = {
    grids: {
        rect: false,
        radi: true
    },
    lights: {
        sun: true,
        dev: false
    },
    rez: '4k'
};

function orbit(center, orbiter, distance, height, angle) {
    let cpos = [center.position.x, center.position.y, center.position.z];
    let dx = distance * Math.sin(angle);
    let dy = height;
    let dz = distance * Math.cos(angle);
    orbiter.position.set(cpos[0] + dx, cpos[1] + dy, cpos[2] + dz);
}

//set camera position
camera.position.set(3, 3, 5);

//apply and create renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


//create texture loader and eaerth/cloud mats
let txtloader = new THREE.TextureLoader();
function loadMats() {
    //load textures
    txtloader.load('res/earth/' + options.rez + '_earth_daymap.jpg', (texture) => {
        earth.material.map = texture;
        earth.material.needsUpdate = true;
        console.log('loaded earth texture');
    });
    //load normals
    txtloader.load('res/earth/' + options.rez + '_earth_normal_map.jpg', (normal) => {
        earth.material.normalMap = normal;
        earth.material.needsUpdate = true;
        console.log('loaded earth normals');
    });
    //load rough maps
    txtloader.load('res/earth/' + options.rez + '_earth_specular_map.jpg', (spec) => {
        earth.material.roughnessMap = spec;
        earth.material.roughness = 1;
        earth.material.needsUpdate = true;
        console.log('loaded specular roughness map');
    });
    //load light maps
    //(for night time)
    txtloader.load('res/earth/' + options.rez + '_earth_nightmap.jpg', (lmap) => {
        earth.material.emissiveMap = lmap;
        earth.material.emissiveIntensity = 0.6;
        earth.material.needsUpdate = true;
        console.log('loaded nightlight map');
    });
    //load cloud texture
    txtloader.load('res/earth/clouds/' + options.rez + '_earth_clouds.jpg', (texture) => {
        clouds.material.map = texture;
        clouds.material.needsUpdate = true;
        console.log('loaded cloud textures and attempted overlay');
    });
    //load cloud alpha map
    txtloader.load('res/earth/clouds/' + options.rez + '_earth_clouds.jpg', (alphamap) => {
        clouds.material.alphaMap = alphamap;
        clouds.material.transparent = true;
        clouds.material.needsUpdate = true;
        console.log('loaded cloud transparency and attempted apply');
    });
    txtloader.load('res/stars/' + options.rez + '_stars_milky_way.jpg', (starmap) => {
        let rt = new THREE.WebGLCubeRenderTarget(starmap.image.height);
        rt.fromEquirectangularTexture(renderer, starmap);
        scene.background = rt.texture;
        console.log('loaded star textures');
    });
}
loadMats();

//create earth
let earthmat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0xffffff
});
let earthgeo = new THREE.SphereGeometry(2, 30, 30);

//create cloud layer
let cloudmat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    opacity: 1,
    roughness: 0.325
});
let cloudgeo = new THREE.SphereGeometry(2.05, 30, 30);


//create meshes
earth = new THREE.Mesh(earthgeo, earthmat);
clouds = new THREE.Mesh(cloudgeo, cloudmat);

//mesh grid: dev edition
//displays a static 3d grid of vairable square size for dev use
//DISABLE THESE IN PROD
const grid = new THREE.GridHelper(10, 10);
const pgrid = new THREE.PolarGridHelper(10, 10, 5, 64);
if (options.grids.radi) scene.add(pgrid);
if (options.grids.rect) scene.add(grid);

//add objects to scene
scene.add(earth);
scene.add(clouds);

//add work light
//DISABLE THIS IN PROD
// scene.add(new THREE.HemisphereLight(0xffffFF, 0x080820, 1));

//add sun
let l = new THREE.PointLight(0xfffffb, 1, 0, 20);
l.position.set(camera.position.x + 2, camera.position.y + 2, camera.position.z + 2);
scene.add(l);


earth.rotation.y = 0.0000041781 * new Date().getTime();
clouds.rotation.y = 0.0000041781 * new Date().getTime();

let cloudspeed = 0.00005;
setInterval(() => {
    if (Math.round(Math.random()) || cloudspeed >= 0.0001) {
        cloudspeed -= 0.00001;
        // console.log('decreased cloud speed: ' + Math.round(cloudspeed * 10000) / 10000);
    }
    else {
        cloudspeed += 0.00001;
        // console.log('increased cloud speed: ' + Math.round(cloudspeed * 10000) / 10000);
    }
}, 1000);

let moongeo = new THREE.SphereGeometry(0.5, 20, 20);
let moonmat = new THREE.MeshBasicMaterial({ color: 0xffffff });
let moon = new THREE.Mesh(moongeo, moonmat);
let moonorbit = 0;
let cameraorbit = 0;
scene.add(moon);
moon.position.set(0, 4, 0);

//render animation frames
function animate(elapsed) {
    requestAnimationFrame(animate);
    moonorbit += 0.01;
    orbit(earth, moon, 5, 0, moonorbit);
    cameraorbit += 0.001;
    orbit(earth, camera, 7, 5, cameraorbit);

    l.position.set(moon.position.x, moon.position.y, moon.position.z);

    //earth.rotation.y += 0.00041781;
    clouds.rotation.y += cloudspeed;
    //tells how much the earth has turned
    //console.log(earth.rotation.y)
    camera.lookAt(earth.position.x, earth.position.y, earth.position.z);
    renderer.render(scene, camera);
}
animate();
