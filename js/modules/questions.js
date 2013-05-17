var APP = APP || {};
APP.Questions = (function (window, $) {
    var defaults = {
        jsonPath: "questions.json"
    };
    function Plugin( element, options ) {
        this.element = element;

        this.options = $.extend( {}, defaults, options) ;

        this.questionsData = [];
        this.points = 0;
        this.init();
    }

    Plugin.prototype.init = function () {
        this._loadData();
        this._showNextQuestionOrResult();
    };

    Plugin.prototype._loadData = function () {
        /*var tempData = [];
         $.getJSON(this.options.jsonPath, function(data){
         tempData = data;
         });
         this.questionsData = tempData;*///не работает локально
        this.questionsData = [
            {
                "question": "Большинство людей начинают свой день с принятия душа. Как это происходит у вас?",
                "answers": [
                    "Душ? В моем утреннем распорядке на это выделено 4 минуты и 34 секунды! Боже мой, что я тут делаю?! Я же опаздываю!",
                    "Могу блаженно простоять под душем минут двадцать, распевая засевший накануне в голову мотив. Мои соседи, кстати, ждут, когда у меня выйдет альбом :)",
                    "Каждое утро между зарядкой и коктейлем из сельдерея я принимаю контрастный душ. Это полезно."
                ],
                "points": [1, 3, 2]
            },
            {
                "question": "Кофе – еще один привычный ежедневный ритуал. Каким образом вы его совершаете?",
                "answers": [
                    "Мимоходом, параллельно делая 20 других дел, – и в итоге допиваю уже остывший кофе.",
                    "Готовлю очень крепкий кофе, чтобы быстрее проснуться.",
                    "Кофе – это ритуал. Несмотря на утреннюю спешку, я готовлю его, выхожу с ним на балкон и спокойно, растягивая удовольствие, выпиваю, наслаждаясь видом просыпающегося города."
                ],
                "points": [2, 1, 3]
            },
            {
                "question": "Вы отправляетесь в командировку в новое для вас место. И свое свободное время проведете следующим образом…",
                "answers": [
                    "К счастью, у меня в гостиничном номере есть телевизор…",
                    "Заранее выясню в Интернете, что в этом городе стоит посетить. Скачаю и распечатаю карту, обозначив на ней маршрут.",
                    "Буду ходить по улицам куда глаза глядят: получу порцию новых впечатлений."
                ],
                "points": [1, 2 , 3]
            },
            {
                "question": "У вас появилось три совершенно свободных часа. Как вы предпочтете их потратить?",
                "answers": [
                    "Целых три часа? Рвану в кино! Нет, по магазинам… Нет, покатаюсь на велосипеде… В общем, решу в процессе. Три часа! Круто!",
                    "Наконец-то сделаю все дела по дому, до которых сто лет не доходили руки.",
                    "Не хочется этого признавать, но, скорее всего, просижу все три часа в Интернете."
                ],
                "points": [3, 1 , 2]
            },
            {
                "question": "Работа совершенно перестала приносить удовольствие, но зато до сих пор приносит неплохие деньги. Что делать в такой ситуации?",
                "answers": [
                    "Любая работа со временем становится рутиной, так что продолжу «грызть кактус». А делать то, что по-настоящему радует, буду по выходным.",
                    "Начну проявлять больше инициативы, чтобы заполучить интересный проект или повышение, которое откроет мне новые возможности.",
                    "Пойму, что пришло время менять что-то в жизни, и потихоньку начну рассылать резюме по другим компаниям."
                ],
                "points": [1, 2 , 3]
            },
            {
                "question": "Вы приходите в ресторан, где представлено сразу несколько кухонь мира. Чем вы будете руководствоваться при выборе блюда?",
                "answers": [
                    "Возьму что-нибудь проверенное, чтобы не прогадать и не жалеть о выброшенных на ветер деньгах.",
                    "Я обожаю открывать новые вкусы! Выберу в меню блюдо с самым безумным названием и закажу его!",
                    "Посоветуюсь с друзьями или официантом, расскажу им о своих предпочтениях в еде."
                ],
                "points": [1, 3, 2]
            },
            {
                "question": "Вы купили новую книгу. И она вас захватила, едва вы начали чтение. Ваши дальнейшие действия…",
                "answers": [
                    "Буду читать, если потребуется, до утра. Проглочу ее и начну искать новую, чтобы сделать с ней то же самое!",
                    "Посмотрю, чем закончится, а потом медленно и со смаком буду следить, как герои двигаются к этой «неожиданной» развязке :)",
                    "Эта книга – настоящее удовольствие. Которое продлится дольше, если я заставлю себя читать не больше чем по три главы в день."
                ],
                "points": [2, 1, 3]
            },
            {
                "question": "Понедельник наступил внезапно и застиг вас врасплох. На работе – нескончаемая череда срочных дел. Ваши действия…",
                "answers": [
                    "Впаду в панику, буду бегать по офису, обхватив голову руками и крича: «А-а-а-а!» Мои коллеги сразу все поймут и помогут.",
                    "Буду полдня заниматься чем угодно, только не работой, а под вечер постараюсь все сделать в ускоренном режиме.",
                    "Соберу волю в кулак, распланирую время для выполнения каждого задания и буду четко следовать плану. Пропущу обед, если потребуется."
                ],
                "points": [1, 2, 3]
            },
            {
                "question": "Вы решили научиться готовить и стоите перед выбором первого блюда. Каким оно будет?",
                "answers": [
                    "Помня о том, что первый блин всегда комом, выберу что-нибудь интересное, но простое. Например, пасту.",
                    "Давно хотелось испечь прапрабабушкин «Наполеон»! По семейной легенде, она получила этот рецепт во время кампании 1812 года :)",
                    "Нет времени корпеть над рецептами. Засыплю все, что есть в холодильнике, в кастрюлю, посолю и поставлю на медленный огонь."
                ],
                "points": [2, 3, 1]
            },
            {
                "question": "Вечер пятницы после тяжелой рабочей недели. Какие у вас планы?",
                "answers": [
                    "Хотелось бы отдохнуть, но нельзя. Семейный долг зовет домой…",
                    "Устрою рейд по лучшим барам и клубам города – нужно выпустить накопившееся за неделю напряжение!",
                    "Не буду планировать. И так знаю, что вечер будет классным благодаря элементу неожиданности. Мои друзья… Каждый раз это что-то новое :)"
                ],
                "points": [1, 2, 3]
            }
        ];
    };

    Plugin.prototype._showNextQuestionOrResult = function () {
        if (this.questionsData.length) {
            var currentQuestion = this.questionsData.shift();
            this._renderQuestion(currentQuestion);
            this._bindEvents();
        }
        else
            APP.EventBus.trigger("questions:complete", this.points);
    };

    Plugin.prototype._renderQuestion = function(question){
        var div = $(this.element);
        div.html('');
        var questionDiv = $('<div>');
        questionDiv.html('<b>' + question.question + '</b><br/><ul></ul>');
        var questionsUl = questionDiv.find('ul');
        $.each(question.answers, function(i, value){
            questionsUl.append($('<li><input type="radio" name="question" value="'+question.points[i]+'">'+value+'</li>'));
        });
        div.append(questionDiv);
    };

    Plugin.prototype._bindEvents = function(){
        var self = this;
        $('input').click(function(){
            self.points += Number($(this).val());
            self._showNextQuestionOrResult();
        });
    };

    return {
        init: function (element, options){
            new Plugin( element, options);
        }

    };

})(window, jQuery);