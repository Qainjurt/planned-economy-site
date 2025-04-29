document.addEventListener('DOMContentLoaded', function() {
    // Мобильді экрандарға арналған динамикалық шрифт өлшемдері
    const getFontSize = (baseSize) => window.innerWidth < 768 ? baseSize * 0.85 : baseSize;

    // 1. КСРО болат өндірісінің графигі
    const productionCtx = document.getElementById('productionChart').getContext('2d');
    new Chart(productionCtx, {
        type: 'line',
        data: {
            labels: ['1928', '1933', '1938', '1943', '1948', '1953'],
            datasets: [{
                label: 'Болат өндірісі (млн тонна)',
                data: [4.3, 6.9, 18.1, 8.5, 19.2, 38.1],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Өндіріс (млн тонна)',
                        font: { size: getFontSize(16) }
                    },
                    ticks: { font: { size: getFontSize(14) } }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Жылдар',
                        font: { size: getFontSize(16) }
                    },
                    ticks: { font: { size: getFontSize(14) } }
                }
            },
            plugins: {
                legend: {
                    labels: { font: { size: getFontSize(16) } }
                }
            }
        }
    });

    // 2. Қазақстан бидай өндірісінің графигі
    const wheatCtx = document.getElementById('wheatChart').getContext('2d');
    new Chart(wheatCtx, {
        type: 'bar',
        data: {
            labels: ['1950', '1955', '1960', '1965'],
            datasets: [{
                label: 'Бидай өндірісі (млн тонна)',
                data: [2.5, 10.8, 14.2, 8.9],
                backgroundColor: 'rgba(255, 159, 64, 0.6)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Өндіріс (млн тонна)',
                        font: { size: getFontSize(16) }
                    },
                    ticks: { font: { size: getFontSize(14) } }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Жылдар',
                        font: { size: getFontSize(16) }
                    },
                    ticks: { font: { size: getFontSize(14) } }
                }
            },
            plugins: {
                legend: {
                    labels: { font: { size: getFontSize(16) } }
                }
            }
        }
    });

    // 3. Викторина логикасы (10 сұрақ)
    const quizData = [
        { question: 'Бірінші бесжылдық жоспар қашан басталды?', options: ['1921', '1928', '1933', '1948'], correct: 1 },
        { question: 'Тың игеру науқаны қай жылдары өтті?', options: ['1945-1950', '1954-1960', '1965-1970', '1975-1980'], correct: 1 },
        { question: 'Жоспарлы экономиканың негізгі кемшілігі не болды?', options: ['Жоғары инновация', 'Тауар тапшылығы', 'Жұмыссыздық', 'Табыс теңсіздігі'], correct: 1 },
        { question: 'Госплан қай жылы құрылды?', options: ['1917', '1921', '1928', '1933'], correct: 1 },
        { question: 'Қазақстандағы Тың игеру науқанының басты мақсаты не еді?', options: ['Көмір өндірісі', 'Бидай өндірісі', 'Мақта өндірісі', 'Мұнай өндірісі'], correct: 1 },
        { question: 'КСРО-дағы жоспарлы экономиканың негізгі органы қалай аталды?', options: ['Коминтерн', 'Госплан', 'НКВД', 'Совнарком'], correct: 1 },
        { question: 'Жоспарлы экономика қай елде әлі де қолданылады?', options: ['Қытай', 'Ресей', 'Солтүстік Корея', 'Жапония'], correct: 2 },
        { question: 'Қарағандыда қандай өндіріс дамыды?', options: ['Мақта', 'Көмір', 'Мұнай', 'Бидай'], correct: 1 },
        { question: 'КСРО ыдырағаннан кейін Қазақстан қандай экономикаға көшті?', options: ['Жоспарлы', 'Нарықтық', 'Аралас', 'Традициялық'], correct: 1 },
        { question: 'Бесжылдық жоспарлардың басты мақсаты не еді?', options: ['Сауда дамыту', 'Өнеркәсіпті дамыту', 'Туризм', 'Банк жүйесі'], correct: 1 }
    ];

    let currentQuestion = 0;
    let score = 0;

    const questionEl = document.getElementById('question');
    const optionsEl = document.getElementById('options');
    const submitBtn = document.getElementById('submit-btn');
    const resultEl = document.getElementById('result');

    function loadQuestion() {
        const q = quizData[currentQuestion];
        questionEl.textContent = q.question;
        optionsEl.innerHTML = '';
        q.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'btn btn-outline-secondary';
            btn.textContent = option;
            btn.onclick = () => checkAnswer(index);
            optionsEl.appendChild(btn);
        });
    }

    function checkAnswer(selected) {
        const q = quizData[currentQuestion];
        if (selected === q.correct) {
            score++;
            resultEl.textContent = 'Дұрыс!';
            resultEl.className = 'mt-3 text-success';
        } else {
            resultEl.textContent = `Қате! Дұрыс жауап: ${q.options[q.correct]}`;
            resultEl.className = 'mt-3 text-danger';
        }

        submitBtn.disabled = true;
        setTimeout(() => {
            currentQuestion++;
            if (currentQuestion < quizData.length) {
                loadQuestion();
                resultEl.textContent = '';
                submitBtn.disabled = false;
            } else {
                questionEl.textContent = 'Викторина аяқталды!';
                optionsEl.innerHTML = '';
                submitBtn.style.display = 'none';
                resultEl.textContent = `Сіздің нәтижеңіз: ${score}/${quizData.length}`;
                resultEl.className = 'mt-3 text-primary';
            }
        }, 1500);
    }

    submitBtn.addEventListener('click', () => {
        if (optionsEl.querySelector('.btn.active')) {
            checkAnswer(parseInt(optionsEl.querySelector('.btn.active').dataset.index));
        }
    });

    optionsEl.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn')) {
            optionsEl.querySelectorAll('.btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            e.target.dataset.index = Array.from(optionsEl.children).indexOf(e.target);
        }
    });

    loadQuestion();

    // 4. Интерактивті карта
    const map = L.map('map').setView([48.0196, 66.9237], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    const locations = [
        { coords: [53.2192, 63.6344], title: 'Ақтөбе', desc: 'Тың игеру науқанының маңызды аймағы.' },
        { coords: [49.9487, 82.6278], title: 'Өскемен', desc: 'Металлургия және ауыр өнеркәсіп орталығы.' },
        { coords: [50.2797, 57.1728], title: 'Қарағанды', desc: 'Көмір өндірісінің негізгі орталығы.' }
    ];

    locations.forEach(loc => {
        L.marker(loc.coords).addTo(map)
            .bindPopup(`<b>${loc.title}</b><br>${loc.desc}`);
    });

    // 5. Анимациялы сандар
    const counters = document.querySelectorAll('.counter');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseFloat(counter.getAttribute('data-target'));
                let count = 0;
                const speed = 50;
                const updateCounter = () => {
                    const increment = target / speed;
                    count += increment;
                    if (count < target) {
                        counter.textContent = count.toFixed(1);
                        setTimeout(updateCounter, 50);
                    } else {
                        counter.textContent = target.toFixed(1);
                    }
                };
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));

    // 6. Пікірлер формасы
    const feedbackForm = document.getElementById('feedback-form');
    const commentsList = document.getElementById('comments-list');

    function loadComments() {
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        commentsList.innerHTML = '';
        comments.forEach(comment => {
            const div = document.createElement('div');
            div.className = 'comment';
            div.innerHTML = `<h5>${comment.name}</h5><p>${comment.text}</p>`;
            commentsList.appendChild(div);
        });
    }

    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const comment = document.getElementById('comment').value;
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        comments.push({ name, text: comment });
        localStorage.setItem('comments', JSON.stringify(comments));
        loadComments();
        feedbackForm.reset();
    });

    loadComments();
});