const frankenstein = new story([
    {
        avatar: 'src/Crinfarr.png',
        location: [0, 2.5, 2],//
        line: `This is an interactive map.
        Although it will work with most settings, I would recommend using 8K textures and putting the storybox on the top bar.<br/><br/>
        This engine is also open source on <a href='http://github.com/Crinfarr/Frank.js'>My git,</a> and runs uncompiled on web.<p>\n\n\n
        Play around with the settings all you want, I have never removed one so all my experiments are here.<p>\n\n\n</p>
        p.s. arrow keys left and right are also supported for navigating the story.<p>\n</p>
        p.p.s at least try it, I spent like 20 minutes making it work right.<p>\n</p>
        p.p.p.s all images taken from the first page of google search results because I am lazy.`
        //delay:0//don't bother with this
    },
    {
        avatar: 'src/walton.jpg',
        location: [0.6, 2.3, 1.1],
        line: `I am already far north of London; and as I walk in the streets of Petersburgh, I feel a cold northern breeze play upon my cheeks, which braces my nerves, and fills me with delight.`
    },
    {
        avatar: 'src/walton.jpg',
        location: [0.8, 2.8, 1.3],
        line: `Do you understand this feeling?<br/>This breeze, which has travelled from the regions towards which I am advancing, gives me a foretaste of those icy chimes.`
    },
    {
        avatar: 'src/default.png',
        location: [0.6, 3.2, 1],
        line: 'and so he journeyed to the north, in search of adventure.'
    },
    {
        avatar: 'src/default.png',
        location: [0.325, 3.2, 0.325],
        line: 'That is, until the unyeilding ice did exactly what he was told it would.'
    },
    {
        avatar: 'src/walton.jpg',
        location: [0.325, 3.2, 0.325],
        line: "uh oh"
    },
    {
        avatar: 'src/walton.jpg',
        location: [0.2, 3.2, 0.2],
        line: `<p style='font-family:monospace;'>LETTER DATE: AUGUST 15, 17XX.</p>`
    },
    {
        avatar: 'src/walton.jpg',
        line: `So strange an accident has happened to us that I cannot forbear recording it, although it is very probable you will see me before these papers can come into your posession.`
    },
    {
        avatar: 'src/walton.jpg',
        line: `In the morning, as soon as it was light, I went upon deck, and found all the sailors busy on one side of the vessel, apparently talking to some in the sea.`
    },
    {
        avatar: `src/walton.jpg`,
        line: `On perceiving me, the stranger addressed me in English, although with a foreign accent.`
    },
    {
        avatar: 'src/drfrank.jpg',
        line: 'Before I come aboard your vessel, will you have the kindness to inform me whither you are bound?'
    },
    {
        location: [0.2, 3.2, 0.2],
        line: 'This stranger is Dr. Victor Frankenstein, and to get to this point we must first rewind several hundred miles.'
    },
    {
        location: [0.1, 2, 2],
        line: 'Victor grew up part of a distinguished family in Geneva, an only child save his "more than sister" Elizabeth.'
    },
    {
        location: [0.125, 2, 2],
        line: `Elizabeth was the Milanian child of an absent noble and a mother who died in childbirth. <br/>
        She is described only in a positive light, no matter what the scenario may be.<br/>
        a "present" for Victor, an angel for her family, someone who everyone loved.`
    }

]);

function showdialog(imgID, boxID, text, imgsrc = 'src/default.png') {
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