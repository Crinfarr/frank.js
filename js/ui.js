//change orbit speed on slider move
document.getElementById('moonspeed').addEventListener('input', (ev) => {
    document.getElementById('moonlabel').innerText = document.getElementById('moonspeed').value;
    options.orbits.sun = document.getElementById('moonspeed').value;
});

document.getElementById('camspeed').addEventListener('input', (ev) => {
    document.getElementById('camlabel').innerText = document.getElementById('camspeed').value;
    options.orbits.cam = document.getElementById('camspeed').value;
});

//set texture resolution on dropdown close
document.getElementById('trez').addEventListener('change', (ev) => {
    options.rez = document.getElementById('trez').value;
    console.log(document.getElementById('trez').value);
    loadMats();
});

//add console to div output
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

//add reload button
document.getElementById('reload').addEventListener('click', (ev) => {
    options = {
        grids: {
            rect: false,
            radi: true,
            axes: true
        },
        lights: {
            sun: true,
            dev: false
        },
        orbits: {
            sun: 0,
            cam: 0
        },
        camorbit: false,
        rez: '2k'
    };
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

function toggleHide(element, box) {
    e = document.getElementById(element);
    b = document.getElementById(box);
    e.hidden = !element.hidden;
    b.checked = !b.checked;
}

document.getElementById('storypos').addEventListener('change', (ev) => {
    switch (document.getElementById('storypos')) {
        case 'top':
            document.getElementById('story').style = "width: 40vw; height: 25vh; left: 30vw; bottom: 5px;";

    }
});

function togglemin(id, state) {

}