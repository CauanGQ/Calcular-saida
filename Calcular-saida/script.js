// Função para abrir o pop-up
document.getElementById('openPopup').addEventListener('click', function() {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('popup').style.display = 'block';
});

// Função para fechar o pop-up
document.getElementById('closePopup').addEventListener('click', function() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('popup').style.display = 'none';
});

// Cálculo de horas de intervalo no pop-up
document.getElementById('calcularIntervalo').addEventListener('click', function() {
    const saidaIntervalo = document.getElementById('saidaIntervalo').value;
    const voltaIntervalo = document.getElementById('voltaIntervalo').value;

    if (!saidaIntervalo || !voltaIntervalo) {
        alert('Por favor, insira os horários de saída e volta do intervalo.');
        return;
    }

    const [saidaHora, saidaMinuto] = saidaIntervalo.split(':').map(Number);
    const [voltaHora, voltaMinuto] = voltaIntervalo.split(':').map(Number);

    let minutosSaida = saidaHora * 60 + saidaMinuto;
    let minutosVolta = voltaHora * 60 + voltaMinuto;

    if (minutosVolta < minutosSaida) {
        minutosVolta += 24 * 60;  // Ajuste para se passar da meia-noite
    }

    const minutosIntervalo = minutosVolta - minutosSaida;
    const horasIntervalo = Math.floor(minutosIntervalo / 60);
    const minutosRestantes = minutosIntervalo % 60;

    const resultadoIntervalo = `${horasIntervalo.toString().padStart(2, '0')}:${minutosRestantes.toString().padStart(2, '0')}`;
    document.getElementById('intervaloResult').textContent = `Intervalo Feito: ${resultadoIntervalo}`;
});

// Cálculo principal de horário de saída
document.getElementById('calcForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const horaEntrada = document.getElementById('horaEntrada').value;
    const intervaloFeito = document.getElementById('intervalo').value;
    const horasExtras = document.getElementById('horasExtras').value;

    if (!horaEntrada || !intervaloFeito) {
        alert('Por favor, insira todos os dados corretamente.');
        return;
    }

    // Hora de entrada em minutos
    const [hora, minuto] = horaEntrada.split(':').map(Number);
    const minutosEntrada = hora * 60 + minuto;

    // Tempo de trabalho que deve ser cumprido (7h20 em minutos)
    const tempoTrabalho = 7 * 60 + 20;

    // Intervalo feito em minutos
    const [intervaloHoras, intervaloMinutos] = intervaloFeito.split(':').map(Number);
    let minutosIntervaloFeito = intervaloHoras * 60 + intervaloMinutos;

    // Validação do intervalo
    if (minutosIntervaloFeito >= 2 * 60) {
        alert('Aviso: Seu intervalo ultrapassou 2 horas. Conversamos segunda no RH.');
    }

    // Limitar o intervalo ao máximo permitido
    const intervaloCorreto = Math.min(minutosIntervaloFeito, 1 * 60 + 59);

    // Cálculo de horas extras em minutos (se fornecido)
    let minutosExtras = 0;
    if (horasExtras) {
        const [extrasHoras, extrasMinutos] = horasExtras.split(':').map(Number);
        minutosExtras = extrasHoras * 60 + extrasMinutos;

        if (minutosExtras < 60) {
            alert('Aviso: Horas extras realizadas abaixo de 1 hora! Conversamos segunda no RH.');
        }

        // Limitar as horas extras ao máximo permitido
        minutosExtras = Math.min(minutosExtras, 1 * 60 + 40);
    }

    // Cálculo do horário de saída
    let minutosSaida = minutosEntrada + tempoTrabalho + intervaloCorreto + minutosExtras;

    // Ajustar se passar de 24 horas
    minutosSaida = minutosSaida % (24 * 60);

    const horaSaida = Math.floor(minutosSaida / 60);
    const minutoSaida = minutosSaida % 60;

    const resultado = `Seu horário de saída é ${horaSaida.toString().padStart(2, '0')}:${minutoSaida.toString().padStart(2, '0')}`;
    document.getElementById('result').textContent = resultado;
});
