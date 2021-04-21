const frankenstein = new story([
    {
        avatar: '/src/Crinfarr.png',
        location: [0, 2.5, 2],//
        line: `This is an interactive map.
        Although it will work with most settings, I would recommend using 8K textures and putting the storybox on the top bar.<br/><br/>
        This engine is also open source on <a href='http://github.com/Crinfarr/Frank.js'>My git,</a> and runs uncompiled on web.<p>\n\n\n
        Play around with the settings all you want, I have never removed one so all my experiments are here.<p>\n\n\n</p>
        p.s. arrow keys left and right are also supported for navigating the story.<p>\n</p>
        p.p.s at least try it, I spent like 20 minutes making it work right.`
        //delay:0//don't bother with this
    },
    {
        avatar: '/src/default.png',
        location: [1.75, 2.125, 2.5],
        line: 'This is the second line of the dialog'
    },
    {
        avatar: '/src/default.png',
        location: [2.5, 1.125, 2.75],
        line: 'This is the third line of the dialog'
    },
    {
        avatar: '/src/default.png',
        location: [2, 2, 2],
        line: 'This is the fourth line of the dialog'
    },
    {
        avatar: '/src/default.png',
        location: [1, 2, 1],
        line: 'This is the fifth line of the dialog'
    }
]);

function showdialog(imgID, boxID, text, imgsrc = '/src/default.png') {
    document.getElementById(imgID).src = imgsrc;
    document.getElementById(boxID).innerHTML = text.toString();
}

document.body.onload = () => {
    showdialog('portrait', 'dialog', frankenstein.getStoryLine().line, frankenstein.getStoryLine().avatar);
};

document.getElementById('next').addEventListener('click', () => {
    options.orbits.cam[1] = false;
    document.getElementById('camorbit').checked = true;
    frankenstein.nextLine();
    showdialog('portrait', 'dialog', frankenstein.getStoryLine().line, frankenstein.getStoryLine().avatar);
    [x, y, z] = frankenstein.getStoryLine().location;
    options.camMotion.target = {
        x: x,
        y: y,
        z: z
    };
    options.camMotion.enabled = true;
    camera.lookAt(0, 0, 0);
});

document.getElementById('previous').addEventListener('click', () => {
    options.orbits.cam[1] = false;
    frankenstein.previousLine();
    showdialog('portrait', 'dialog', frankenstein.getStoryLine().line, frankenstein.getStoryLine().avatar);
    [x, y, z] = frankenstein.getStoryLine().location;
    options.camMotion.target = {
        x: x,
        y: y,
        z: z
    };
    options.camMotion.enabled = true;
    camera.lookAt(0, 0, 0);
});

document.addEventListener('keydown', (ev) => {
    switch (ev.key) {
        case 'ArrowLeft':
            options.orbits.cam[1] = false;
            frankenstein.previousLine();
            showdialog('portrait', 'dialog', frankenstein.getStoryLine().line, frankenstein.getStoryLine().avatar);
            [x, y, z] = frankenstein.getStoryLine().location;
            options.camMotion.target = {
                x: x,
                y: y,
                z: z
            };
            options.camMotion.enabled = true;
            camera.lookAt(0, 0, 0);
            break;
        case 'ArrowRight':
            options.orbits.cam[1] = false;
            document.getElementById('camorbit').checked = true;
            frankenstein.nextLine();
            showdialog('portrait', 'dialog', frankenstein.getStoryLine().line, frankenstein.getStoryLine().avatar);
            [x, y, z] = frankenstein.getStoryLine().location;
            options.camMotion.target = {
                x: x,
                y: y,
                z: z
            };
            options.camMotion.enabled = true;
            camera.lookAt(0, 0, 0);
            break;
        default: break;
    }
});