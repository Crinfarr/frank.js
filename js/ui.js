///ALL UI FUNCTIONS GO HERE

//add console to div output
//thanks stackoverflow
(function () {
    if (!console) {
        console = {};
    }
    var old = console.log;
    var logger = document.getElementById('log');
    console.log = function (message) {
        old(message);
        if (typeof message == 'object') {
            logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : String(message)) + '<br />';
        } else {
            logger.innerHTML += message + '<br />';
        }
        //scroll to bottom automatically
        logger.scrollTop = logger.scrollHeight;
    };
})();

function toggleHide(element, box) {
    e = document.getElementById(element);
    b = document.getElementById(box);
    e.hidden = !element.hidden;
    b.checked = !b.checked;
}

//set frame zero portrait
document.body.onload = () => {
    showdialog('portrait', 'dialog', frankenstein.getStoryLine().line, frankenstein.getStoryLine().avatar);
};

//window settings minimize button that I spent too goddamn long on
document.getElementById('minimizebutton').addEventListener('click', (ev) => {
    let e = document.getElementById('choosercontent');
    let ex = e.parentElement;
    e.hidden = !e.hidden;
    ex.style.height = (ex.style.height === '3vh') ? '25vh' : '3vh';
    ex.style.width = (ex.style.width === '5vw') ? '25vw' : '5vw';
    if (e.hidden) {
        ex.style.backgroundColor = 'blue';
    }
    else {
        ex.style.backgroundColor = 'black';
    }
    document.getElementById('minimizebutton').innerText = (document.getElementById('minimizebutton').innerText === '🗖') ? '🗕' : '🗖';
});

//orbit listeners
document.getElementById('moonspeed').addEventListener('input', (ev) => {
    document.getElementById('moonlabel').innerText = document.getElementById('moonspeed').value;
    options.orbits.sun[0] = document.getElementById('moonspeed').value;
});
document.getElementById('camspeed').addEventListener('input', (ev) => {
    document.getElementById('camlabel').innerText = document.getElementById('camspeed').value;
    options.orbits.cam[0] = document.getElementById('camspeed').value;
});
document.getElementById('moonorbit').addEventListener('change', (ev) => {
    let e = document.getElementById('moonorbit');
    options.orbits.sun[1] = !e.checked;
});
document.getElementById('camorbit').addEventListener('change', (ev) => {
    let e = document.getElementById('camorbit');
    options.orbits.cam[1] = !e.checked;
});

//add basic sim manipulation
document.getElementById('disablemoon').addEventListener('change', (ev) => {
    let e = document.getElementById('disablemoon');
    if (e.checked) {
        scene.remove(moon);
        scene.remove(l);
    }
    else {
        scene.add(moon);
        scene.add(l);
    }
});
document.getElementById('flash').addEventListener('change', (ev) => {
    let e = document.getElementById('flash');
    options.flashlight = e.checked;
});

//set texture resolution on dropdown close
document.getElementById('trez').addEventListener('change', (ev) => {
    options.rez = document.getElementById('trez').value;
    console.log(document.getElementById('trez').value);
    loadMats();
});

//add reload button
document.getElementById('reload').addEventListener('click', (ev) => {
    options = options.default;
    console.log('reset options');

    document.getElementById('trez').value = '2k';
    console.log('reset texture resolution');

    document.getElementById('moonspeed').value = 0;
    document.getElementById('moonlabel').innerText = document.getElementById('moonspeed').value;
    document.getElementById('camspeed').value = 0;
    document.getElementById('camlabel').innerText = document.getElementById('camspeed').value;
    console.log('reset orbits');

    console.log('reloading materials...');
    loadMats();
});

//add window checkbox listeners
document.getElementById('showOptions').addEventListener('change', (ev) => {
    let e = document.getElementById('showOptions');
    if (!e.checked) {
        document.getElementById('options').hidden = true;
    }
    else {
        document.getElementById('options').hidden = false;
    }
});
document.getElementById('showConsole').addEventListener('change', (ev) => {
    let e = document.getElementById('showConsole');
    if (!e.checked) {
        document.getElementById('log').hidden = true;
    }
    else {
        document.getElementById('log').hidden = false;
    }
});
document.getElementById('showStory').addEventListener('change', (ev) => {
    let e = document.getElementById('showStory');
    if (!e.checked) {
        document.getElementById('story').hidden = true;
    }
    else {
        document.getElementById('story').hidden = false;
    }
});

//add grid checkbox listeners
document.getElementById('rad').addEventListener('change', (ev) => {
    let e = document.getElementById('rad');
    options.grids.radi = e.checked;
    updateGrid();
});
document.getElementById('rad').addEventListener('change', (ev) => {
    let e = document.getElementById('sqr');
    options.grids.rect = e.checked;
    updateGrid();
});
document.getElementById('axes').addEventListener('change', (ev) => {
    let e = document.getElementById('axes');
    options.grids.axes = e.checked;
    updateGrid();
});


//add storybox movement
document.getElementById('storypos').addEventListener('change', () => {
    switch (document.getElementById('storypos').value) {
        case 'top':
            console.log('updated storybox');
            document.getElementById('story').style = "width:80vw; height:25vh; left:10vw; top:5px";
            document.getElementById('dialog').style = 'width:65vw; height:22vh';
            break;

        case 'bottom':
            console.log('updated storybox');
            document.getElementById('story').style = "width: 40vw; height: 25vh; left: 30vw; bottom: 5px";
            document.getElementById('dialog').style = 'width:25vw; height: 22vh';
            break;

        default:
            console.log('wtf?');
            console.log(document.getElementById('storypos'));
            break;
    }
});
document.getElementById('next').addEventListener('click', () => {
    options.orbits.cam[1] = false;
    document.getElementById('camorbit').checked = true;
    frankenstein.nextLine();
    showdialog('portrait', 'dialog', frankenstein.getStoryLine().line, frankenstein.getStoryLine().avatar);
    ([x, y, z] = frankenstein.getStoryLine().location).catch(() => console.log);
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
//and arrow key control
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