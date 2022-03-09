function main() {
    $(".enemigo").css({
        'color': 'red',
        'font-size': '16pt',
    });

    $("#container").css({
        'display': 'flex',
        'flex-flow': 'row wrap'
    });
    $('#container > div').css({ 'border': 'solid 2px black', 'margin': '25px', 'padding': '15px' })

    var nombreEnemigo = simple_user_input("Introduce un nombre para el enemigo")
    var enemigo = new Enemigo(100, 70, nombreEnemigo, 1, 0, false);
    console.log(enemigo.getVida);
    console.log(enemigo.getAtaque);
    console.log(enemigo.getNombre);
    console.log(enemigo.getNivel);
    $('#nivelEnemigo').html(enemigo.getNivel);
    $('#vidaEnemigo').html(enemigo.getVida);
    $('#vidaTotalEnemigo').html(enemigo.getVidaTotal);


    var nombreHeroe = simple_user_input("Introduce un nombre para el heroe")
    var heroe = new Heroe(100, 80, nombreHeroe, 1, 50, false);
    console.log(heroe.getVida);
    console.log(heroe.getAtaque);
    console.log(heroe.getNombre);
    console.log(heroe.getNivel);
    console.log(heroe.getExperiencia);
    $('#nivel').html(heroe.getNivel);
    $('#experiencia').html(heroe.getExperiencia);
    $('#vida').html(heroe.getVida);
    $('#vidaTotal').html(heroe.getVidaTotal);


    //clickAtacar(heroe, enemigo)
    var boton = document.getElementById("boton");
    var defender = document.getElementById("defender");
    boton.addEventListener('click', () => {
        var ataqueHeroe = heroe.dañoAtaque()
        enemigo.reducirEnergia(ataqueHeroe)
        $('#vidaEnemigo').html(enemigo.getVida)
        defender.disabled = false;

        if (!enemigo.confirmarMuerte()) {
            var ataqueEnemigo = enemigo.getAtaque
            heroe.reducirEnergia(ataqueEnemigo)
            $('#vida').html(heroe.getVida)
        }

        if (!heroe.confirmarMuerte() && enemigo.confirmarMuerte()) {
            var experiencia = enemigo.devolverXP(1)
            heroe.aumentarNivel(experiencia);
            $('#nivel').html(heroe.getNivel);
            $('#experiencia').html(heroe.getExperiencia);

            heroe.setVida = heroe.getVidaTotal;
            $('#vida').html(heroe.getVida)
            enemigo = continuarLuchando(heroe.getNivel)
        }
    });
    //Boton defender
    defender.addEventListener('click', () => {
        heroe.setIsDefendiendo = true;
        defender.disabled = true;
    });

    /** 
    var combates = 5;
    for (numCombate = 1; numCombate <= combates; numCombate++) {
        //enemigo = generadorEnemigos();
    
        var ultimo_turno = 0;
        while (!heroe.confirmarMuerte() && !enemigo.confirmarMuerte()) {
            if (ultimo_turno >= 0) {
                var ataqueHeroe = heroe.dañoAtaque()
                enemigo.reducirEnergia(ataqueHeroe)
                ultimo_turno = -1;
                $('#vidaEnemigo').html(enemigo.getVida)

            } else {
                var ataqueEnemigo = enemigo.getAtaque
                heroe.reducirEnergia(ataqueEnemigo)
                ultimo_turno = 1;
                $('#vida').html(heroe.getVida)
            }
            console.log(heroe.getNombre + ": " + heroe.getVida)
            console.log(enemigo.getNombre + ": " + enemigo.getVida)
        
}
*/


    // do {
    //     alert("Has ganado el combate")
    //     var experiencia = devolverXp(experiencia)
    // } while (!heroe.confirmarMuerte() && enemigo.confirmarMuerte());




    //$(".enemigo").fadeOut("slow");
    $('#nivel').html(heroe.getNivel)
    $('#experiencia').html(heroe.getExperiencia)
}

function generadorEnemigos(nivelHeroe) {
    var enemigos = ['mercenario', 'asesino', 'demonio', 'dragon'];
    var nombreEnemigo = enemigos[Math.floor(enemigos.length * Math.random())];

    var enemigo = new Enemigo(100, 70, nombreEnemigo, nivelHeroe, 0, false);
    return enemigo;
}
main()