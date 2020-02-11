$(document).ready(() => {
    //front Merci CodePen
    var button = $('.button');
    var mic = button.find('svg');
    var active = $('.active-wrapper');
    var stop = $('.stop-button');
    var w = $(window);
    var vw = w.innerWidth();
    var vh = w.innerHeight();
    var bw = button.innerWidth();
    var bh = button.innerHeight();
    var s;

    var clone = button.clone();
    clone.find('svg').remove();
    button.before(clone);

    var open = function () {
        if (vw > vh) {
            s = vw / bw * 1.5;
        } else {
            s = vh / bh * 1.5;
        }
        var scale = 'scale(' + s + ') translate(-50%,-50%)';

        clone.css({
            transform: scale
        });

        mic.css({
            fill: 'rgba(0,0,0,0.2)',
            transform: 'scale(4)'
        });

        button.on('transitionend', function () {
            active.addClass('active');
            $(this).off('transitionend');
            demarreArtyom()
        });

        return false;
    };

    var close = function () {
        jarvis.shutUp()
        jarvis.fatality()
        active.removeClass('active');
        clone.removeAttr('style');
        mic.removeAttr('style');
    };

    button.on('click', open);
    stop.on('click', close);
    //jarvis
    const jarvis = new Artyom();
    demarreArtyom = () => {

        var commandHello = [{
            smart: true,
            indexes: ["Go *", "Recherche *"], // These spoken words will trigger the execution of the command
            action: function (index, wildcard) { // Action to be executed when a index match with spoken word
                if (index == 0) {
                    window.open("http://" + wildcard + ".Fr", "_blank")
                    jarvis.say("Redirection effectuée")
                } else if (index == 1) {
                    window.open("https://duckduckgo.com/?q=" + wildcard, "_blank")
                    jarvis.say("Recherche " + wildcard)
                }
            }
        }, {
            smart: true,
            indexes: ["Merci *"], // These spoken words will trigger the execution of the command
            action: function (index, wildcard) {
                jarvis.say(wildcard.toUpperCase() == "JARVIS" ? "C'est toujours un plaisir, Romaric" : "Derien " + wildcard, {
                    onEnd: function () {
                        close()
                    }
                })

            }
        }, {
            smart: true,
            indexes: ["*"],
            action: function () {
                jarvis.say("Je n'ai pas compris votre demande")
            }
        }];
        jarvis.addCommands(commandHello)
        jarvis.initialize({
            lang: "fr-FR",// A lot of languages are supported. Read the docs !
            continuous: true,// recognize 1 command and stop listening !
            listen: true, // Start recognizing
            debug: true, // Show everything in the console
            speed: 1 // talk normally
        }).then(function () {
            jarvis.sayRandom(["Démarrage. OK", "Quoi encore ?", "Oui ?", "Je suis votre serviteur, après tout."])
            console.log("Ready to work !");
        });
    }

})