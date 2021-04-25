const frankenstein = new story([
    {
        avatar: 'Crinfarr',
        location: [0, 2.5, 2],
        line: `This is an interactive map.
        Although it will work with most settings, I would recommend using 8K textures and putting the storybox on the top bar.<br/><br/>
        This engine is also open source on <a href='http://github.com/Crinfarr/Frank.js'>My git,</a> and runs uncompiled on web.<p>\n\n\n
        Play around with the settings all you want, I have never removed one so all my experiments are here.<p>\n\n\n</p>
        p.s. arrow keys left and right are also supported for navigating the story.<p>\n</p>
        p.p.s at least try it, I spent like 20 minutes making it work right.<p>\n</p>
        p.p.p.s all images taken from the first page of google search results because I am lazy.`
    },
    //c.0
    {
        avatar: 'walton',
        location: [0.6, 2.3, 1.1],
        line: `I am already far north of London; and as I walk in the streets of Petersburgh, I feel a cold northern breeze play upon my cheeks, which braces my nerves, and fills me with delight.`
    },
    {
        avatar: 'walton',
        location: [0.8, 2.8, 1.3],
        line: `Do you understand this feeling?<br/>This breeze, which has travelled from the regions towards which I am advancing, gives me a foretaste of those icy chimes.`
    },
    {
        location: [0.6, 3.2, 1],
        line: 'and so he journeyed to the north, in search of adventure.'
    },
    {
        location: [0.325, 3.2, 0.325],
        line: 'That is, until the unyeilding ice did exactly what he was told it would.'
    },
    {
        avatar: 'walton',
        location: [0.325, 3.2, 0.325],
        line: "uh oh"
    },
    {
        avatar: 'walton',
        location: [0.2, 3.2, 0.2],
        line: `<p style='font-family:monospace;'>LETTER DATE: AUGUST 15, 17XX.</p>`
    },
    {
        avatar: 'walton',
        line: `So strange an accident has happened to us that I cannot forbear recording it, although it is very probable you will see me before these papers can come into your posession.`
    },
    {
        avatar: 'walton',
        line: `In the morning, as soon as it was light, I went upon deck, and found all the sailors busy on one side of the vessel, apparently talking to some in the sea.`
    },
    {
        avatar: `walton`,
        line: `On perceiving me, the stranger addressed me in English, although with a foreign accent.`
    },
    {
        avatar: 'drfrank',
        line: 'Before I come aboard your vessel, will you have the kindness to inform me whither you are bound?'
    },
    {
        location: [0.2, 3.2, 0.2],
        line: 'This stranger is Dr. Victor Frankenstein, and to get to this point we must first rewind several hundred miles.'
    },
    //c.1
    {
        location: [0.1, 2, 2],
        line: 'Victor grew up part of a distinguished family in Geneva, an only child save his "more than sister" Elizabeth.'
    },
    {
        location: [0.125, 2, 2],
        line: `Elizabeth was the Milanian child of an absent noble and a mother who died in childbirth. <br/>
        She is described only in a positive light, no matter what the scenario may be.<br/>
        a "present" for Victor, an angel for her family, someone who everyone loved.`
    },
    {
        line: "More of a pet than a child."
    },
    //c.2
    {
        location: [0.1, 2, 2],
        avatar: 'drfrank',
        line: 'On the birth of a second son, my junior by seven years, my parents gave up entirely their wandering life and fixed themselves a home in their native country.'
    },
    {
        avatar: 'drfrank',
        line: 'No human being could have passed a happier childhood than myself. My parents were possessed by the very spirit of kindness and indulgence. We felt that they were not the tyrants to rule our lot according to their caprice, but the agents and creators of all the many delights which we enjoyed.'
    },
    {
        avatar: 'drfrank',
        line: 'When I was about fifteen years old we had retired to our house near Belrive, when we witnessed a most violent and terrible thunderstorm. It advanced from behind the mountains of Jura; and the thunder burst at once with frightful loudness from various quarters of the heavens. I remained, while the storm lasted, watching its progress with curiosity and delight.'
    },
    {
        avatar: 'hooded',
        line: "Don't you see?? This proves conclusively my theory of the relation between electricity of galvanism!"
    },
    {
        line: "this fascinated young victor, who would hold the memories of electricity and lightning in his mind for years to come."
    },
    //c.3
    {
        avatar: 'drfrank',
        line: "When I had attained the age of seventeen, my parents resolved that I should become a student at the university of Ingolstadt."
    },
    {
        line: "(a major university in germany.)"
    },
    {
        avatar: 'drfrank',
        line: "My departure was therefore fixed at an early date; but before the day resolved upon could arrive, the first misfortune of my life occurred—an omen, as it were, of my future misery."
    },
    {
        line: "Victor's mother, after helping his 'more than sister' through the scarlet fever, died of it herself."
    },
    {
        avatar: 'drfrank',
        line: "She died calmly; and her countenance expressed affection even in death. I need not describe the feelings of those whose dearest ties are rent by that most irreparable evil; the void that presents itself to the soul; and the despair that is exhibited on the countenance."
    },
    {
        avatar: 'drfrank',
        line: 'My departure for Ingolstadt, which had been deferred by these events, was now again determined upon. I obtained from my father a respite of some weeks. It appeared to me sacrilege so soon to leave the repose, akin to death, of the house of mourning, and to rush into the thick of life.'
    },
    {
        location: [0.1, 2, 2],
        avatar: 'drfrank',
        line: "I was new to sorrow, but it did not the less alarm me. I was unwilling to quit the sight of those that remained to me; and, above all, I desired to see my sweet Elizabeth in some degree consoled."
    },
    {
        location: [0.4, 2.1, 1.9],
        line: "On the way to Ingolstadt and in the following days, Victor reflected on his future.  He would have to make his own way in the following months without his friends and family."
    },
    {
        avatar: "drfrank",
        line: "I ardently desired the acquisition of knowledge. I had often, when at home, thought it hard to remain during my youth cooped up in one place, and had longed to enter the world, and take my station among other human beings. Now my desires were complied with, and it would, indeed, have been folly to repent."
    },
    {
        avatar: 'drfrank',
        line: "Partly from curiosity, and partly from idleness, I went into the lecturing room, which M. Waldman entered shortly after.<br/>"
    },
    {
        avatar: 'waldman',
        line: "The ancient teachers of this science promised impossibilities, and performed nothing. The modern masters promise very little; they know that metals cannot be transmuted, and that the elixir of life is a chimera. But these philosophers, whose hands seem only made to dabble in dirt, and their eyes to pore over the microscope or crucible, have indeed performed miracles."
    },
    {
        avatar: 'waldman',
        line: "The modern masters promise very little; they know that metals cannot be transmuted, and that the elixir of life is a chimera."
    },
    {
        avatar: 'waldman',
        line: "But these philosophers, whose hands seem only made to dabble in dirt, and their eyes to pore over the microscope or crucible, have indeed performed miracles."
    },
    {
        avatar: 'waldman',
        line: "They penetrate into the recesses of nature, and show how she works in her hiding places.<br/> They ascend into the heavens: they have discovered how the blood circulates, and the nature of the air we breathe.<br/> They have acquired new and almost unlimited powers; they can command the thunders of heaven, mimic the earthquake, and even mock the invisible world with its own shadows."
    },
    {
        avatar: 'drfrank',
        line: "Such were the professor’s words—rather let me say such the words of fate, enounced to destroy me. As he went on, I felt as if my soul were grappling with a palpable enemy; one by one the various keys were touched which formed the mechanism of my being: chord after chord was sounded, and soon my mind was filled with one thought, one conception, one purpose."
    },
    {
        avatar: 'drfrank',
        line: "So much has been done, exclaimed the soul of Frankenstein—more, far more, will I achieve: treading in the steps already marked, I will pioneer a new way, explore unknown powers, and unfold to the world the deepest mysteries of creation."
    },
    //c.4
    {
        line: "Frankenstein's studies from this point grew exponentially.  He had the support of his teachers and peers <!--what's that like-->and soon became a veritable master of his craft."
    },
    {
        line: "Here, however, his studies took a darker turn."
    },
    {
        avatar: 'drfrank',
        line: "To examine the causes of life, we must first have recourse to death. I became acquainted with the science of anatomy: but this was not sufficient; I must also observe the natural decay and corruption of the human body. In my education my father had taken the greatest precautions that my mind should be impressed with no supernatural horrors. I do not ever remember to have trembled at a tale of superstition, or to have feared the apparition of a spirit. Darkness had no effect upon my fancy; and a churchyard was to me merely the receptacle of bodies deprived of life, which, from being the seat of beauty and strength, had become food for the worm."
    },
    {
        avatar: 'drfrank',
        line: "My attention was fixed upon every object the most insupportable to the delicacy of the human feelings. I saw how the fine form of man was degraded and wasted; I beheld the corruption of death succeed to the blooming cheek of life; I saw how the worm inherited the wonders of the eye and brain."
    },
    {
        line: "a <b>much</b> darker turn."
    },
    {
        avatar: 'drfrank',
        line: "One secret which I alone possessed was the hope to which I had dedicated myself; and the moon gazed on my midnight labours, while, with unrelaxed and breathless eagerness, I pursued nature to her hiding-places. Who shall conceive the horrors of my secret toil, as I dabbled among the unhallowed damps of the grave, or tortured the living animal to animate the lifeless clay? My limbs now tremble and my eyes swim with the remembrance; but then a resistless, and almost frantic, impulse urged me forward; I seemed to have lost all soul or sensation but for this one pursuit."
    },
    {
        avatar: 'drfrank',
        line: "Sometimes I grew alarmed at the wreck I perceived that I had become; the energy of my purpose alone sustained me: my labours would soon end, and I believed that exercise and amusement would then drive away incipient disease; and I promised myself both of these when my creation should be completed."
    }
    //c.5
]);

//TODO:
//  * add locations
//  * future: add aging profiles?