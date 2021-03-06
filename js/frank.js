//setup... everything
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


var options = {
    default: {
        grids: {
            rect: false,
            radi: false,
            axes: false
        },
        lights: {
            sun: true,
            dev: false
        },
        orbits: {
            sun: [0, true],//[deg/s, enabled]
            cam: [0, true]
        },
        camMotion: {
            enabled: true,
            target: {
                x: 0,
                y: 2.5,
                z: 2
            },
            speed: 0.75 / 30
        },
        flashlight: true,
        rez: '2k'
    },
    grids: {
        rect: false,
        radi: false,
        axes: false
    },
    lights: {
        sun: true,
        dev: false
    },
    orbits: {
        sun: [0, true],//[deg/s, enabled]
        cam: [0, true]
    },
    camMotion: {
        enabled: true,
        target: {
            x: 0,
            y: 2.5,
            z: 2
        },
        speed: 0.75 / 30
    },
    flashlight: true,
    rez: '2k'
};

//set an object at a radius from an object at a specific relative angle
//can be used to do things like multipendulums IN THEORY
function orbit(center, orbiter, distance, height, angle) {
    let cpos = [center.position.x, center.position.y, center.position.z];
    let dx = distance * Math.sin(angle);
    let dy = height;
    let dz = distance * Math.cos(angle);
    orbiter.position.set(cpos[0] + dx, cpos[1] + dy, cpos[2] + dz);
}

//set camera position
camera.position.set(3, 3, 5);


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
    roughness: 0.75
});
let cloudgeo = new THREE.SphereGeometry(2.05, 30, 30);


//create meshes
earth = new THREE.Mesh(earthgeo, earthmat);
clouds = new THREE.Mesh(cloudgeo, cloudmat);

//mesh grid: dev edition
//displays a static 3d grid of vairable square size for dev use
//DISABLE THESE IN PROD
const grid = new THREE.GridHelper(10, 10);
const axes = new THREE.AxesHelper(5);
const pgrid = new THREE.PolarGridHelper(10, 10, 5, 64);
function updateGrid() {
    if (options.grids.radi) scene.add(pgrid); else scene.remove(pgrid);
    if (options.grids.rect) scene.add(grid); else scene.remove(grid);
    if (options.grids.axes) scene.add(axes); else scene.remove(axes);
}
updateGrid();

//add objects to scene
scene.add(earth);
earth.rotation.y = 300;
scene.add(clouds);

//add work light
//DISABLE THIS IN PROD
// scene.add(new THREE.HemisphereLight(0xffffFF, 0x080820, 1));

//add sun
let l = new THREE.PointLight(0xfffffb, 1, 0, 20);
l.position.set(camera.position.x + 2, camera.position.y + 2, camera.position.z + 2);
// scene.add(l);

let f = new THREE.PointLight(0xffffff, 0.75, 0, 20);
f.position.set(0, 0, 0);
scene.add(f);

let cloudspeed = 0.0005;
setInterval(() => {
    if (Math.round(Math.random())) {
        cloudspeed -= 0.0002;
        // console.log('decreased cloud speed: ' + Math.round(cloudspeed * 10000) / 10000);
    }
    else {
        cloudspeed += 0.0002;
        // console.log('increased cloud speed: ' + Math.round(cloudspeed * 10000) / 10000);
    }
}, 1000);

//setup orbiting moon
let moongeo = new THREE.SphereGeometry(0.5, 20, 20);
let moonmat = new THREE.MeshBasicMaterial({ color: 0xffffff });
let moon = new THREE.Mesh(moongeo, moonmat);
let moonorbit = 0;
let cameraorbit = 0;
// scene.add(moon);

orbit(earth, moon, 5, 0, moonorbit);
orbit(earth, camera, 7, 3, cameraorbit);


//render animation frames
function animate(elapsed) {
    //make sure the animation function is called every frame
    requestAnimationFrame(animate);

    //orbit the moon clockwise at 1/100 degree per frame
    //if sun orbit is enabled and !== 0
    if (options.orbits.sun[0] && options.orbits.sun[1]) {
        moonorbit += options.orbits.sun[0] / 120;
        orbit(earth, moon, 5, 0, moonorbit);
    }

    //orbit the camera counterclockwise at 1/1000 degree per frame
    if (options.orbits.cam[0] && options.orbits.cam[1]) {
        cameraorbit += options.orbits.cam[0] / 120;
        orbit(earth, camera, 7, 3, cameraorbit);
    }


    //keep the light on the moon
    l.position.set(moon.position.x, moon.position.y, moon.position.z);

    //spin the clouds but only a little
    clouds.rotation.y += cloudspeed;

    if (options.camMotion.enabled) {
        if (Math.round(camera.position.x * 1000) / 1000 < options.camMotion.target.x) camera.position.x += options.camMotion.speed;
        else if (Math.round(camera.position.x * 1000) / 1000 > options.camMotion.target.x) camera.position.x -= options.camMotion.speed;
        // camera.position.x = Math.round(camera.position.x * 100) / 100;

        if (Math.round(camera.position.y * 1000) / 1000 < options.camMotion.target.y) camera.position.y += options.camMotion.speed;
        else if (Math.round(camera.position.y * 1000) / 1000 > options.camMotion.target.y) camera.position.y -= options.camMotion.speed;
        // camera.position.z = Math.round(camera.position.z * 100) / 100;

        if (Math.round(camera.position.z * 1000) / 1000 < options.camMotion.target.z) camera.position.z += options.camMotion.speed;
        else if (Math.round(camera.position.z * 1000) / 1000 > options.camMotion.target.z) camera.position.z -= options.camMotion.speed;
        // camera.position.z = Math.round(camera.position.z * 100) / 100;
    }

    if (options.flashlight) {
        f.position.set(camera.position.x, camera.position.y, camera.position.z);
    }
    else {
        f.position.set(0, 0, 0);
    }

    //force the camera to look at the earth
    camera.lookAt(earth.position.x, earth.position.y, earth.position.z);
    renderer.render(scene, camera);
}

animate();
