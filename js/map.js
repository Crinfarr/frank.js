function viewpoint(camera, x, y, z, d = 2) {
    camera.position.set(x + d, y + d, z + d);
    camera.lookAt(x, y, z);
}