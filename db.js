const mongoose = require('mongoose');

 
mongoose.connect('mongodb+srv://Lida:oayjqe2005@cluster0.ejidejg.mongodb.net/?retryWrites=true&w=majority').then(() => console.log('Connected!'));

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

 
const User = new Schema({
    username: String,
    password: String,
    email: String,
    created_at: Date,
    updated_at: Date,
    is_admin: Boolean
});

const UserModel = mongoose.model('User', User);

 
const Logs = new Schema({
    user: ObjectId,
    request_type: String,
    request_data: String,
    status_code: String,
    timestamp: Date,
    response_data: String
});

const LogsModel = mongoose.model('Logs', Logs);

 
const Item = new Schema({
    names: {
        en: { type: String, required: true },
        ru: { type: String, required: true },
        kz: { type: String, required: true },
    },
    descriptions: {
        en: { type: String, required: true },
        ru: { type: String, required: true },
        kz: { type: String, required: true },
    },
    pictures: [{ type: String, required: true }],
    creationDate: { type: Date, required: true },
    genre: { type: String, required: true },
    director: { type: String, required: true },
    budget: { type: Number, required: true },
    timestamps: {
        created_at: { type: Date, required: true, default: Date.now},
        updated_at: { type: Date, required: true, default: Date.now},
        deleted_at: { type: Date, required: false, default: null},
    },
    quizLink: String
});

const ItemModel = mongoose.model('Item', Item);

const QuizQuestion = new Schema({
    movie: String,
    question: String,
    answers: [String],
    correctAnswer: Number
});

const QuizQuestionModel = mongoose.model('QuizQuestion', QuizQuestion);
/*
const parasiteQuestions = [
    {
        question: "Каким образом семья Ким проникает в дом семьи Пак?",
        answers: ["Они грабят дом семьи Пак, пока те находятся в отпуске", "Они шантажируют главу семьи Пак, чтобы он дал им работу", " Они устраиваются на работу к богатой семье, используя фальшивые рекомендации", "Они выдают себя за родственников семьи Пак"],
        correctAnswer: 2
    },
    {
        question: "Что происходит в кульминационный момент фильма?",
        answers: ["Семья Пак узнает, что семья Ким обманывает их", " Сын семьи Ким влюбляется в дочь семьи Пак", "Семья Ким попадает в ловушку, устроенную семьей Пак", "Семья Ким решает покинуть дом семьи Пак"],
        correctAnswer: 0
    },
    {
        question: "Как заканчивается фильм?",
        answers: ["Семья Ким и семья Пак становятся друзьями", "Семья Ким погибает", "Семья Ким бежит из страны", "Семья Ким остается жить в доме семьи Пак"],
        correctAnswer: 2
    },
    {
        question: "Какую социальную проблему поднимает фильм Паразиты ?",
        answers: ["Проблему безработицы", "Проблему классового неравенства", "Проблему коррупции", "Проблему преступности"],
        correctAnswer: 1
    },
    {
        question: "Как называется камень, который играет важную роль в фильме?",
        answers: ["Аметист", "Изумруд", "Алмаз", "Оникс"],
        correctAnswer: 3
    },
];

const titanicQuestions = [
    {
        question: "Какой актер играл главную роль в фильме Титаник?",
        answers: ["Леонардо ДиКаприо", "Том Хэнкс", "Брэд Питт", "Джонни Депп"],
        correctAnswer: 0
    },
    {
        question: "Какой актер играл главную роль в фильме Титаник?",
        answers: ["Леонардо ДиКаприо", "Том Хэнкс", "Брэд Питт", "Джонни Депп"],
        correctAnswer: 0
    },
    {
        question: "Кто является режиссером фильма 'Титаник'?",
        answers: ["Стивен Спилберг", "Джеймс Кэмерон", "Кристофер Нолан", "Мартин Скорсезе"],
        correctAnswer: 1
    },
    {
        question: "Какой корабль был основой для съемок в фильме 'Титаник'?",
        answers: ["Олимпик", "Квин Мэри", "Титаник", "Лузитания"],
        correctAnswer: 2
    },
    {
        question: "Какой год выхода фильма 'Титаник'?",
        answers: ["1995", "1996", "1997", "1998"],
        correctAnswer: 2
    },
];

const avatarQuestions = [
    {
        question: "Какое название у фильма режиссера Джеймса Кэмерона о приключениях на планете Пандора?",
        answers: ["Аватар", "Титаник", "Трансформеры", "Гарри Поттер"],
        correctAnswer: 0
    },
    {
        question: "Какие существа населяют планету Пандору в фильме 'Аватар'?",
        answers: ["Люди", "Эльфы", "Нави", "Орки"],
        correctAnswer: 2
    },
    {
        question: "Как называется вещество, добываемое на планете Пандора, которое является центральным конфликтом в фильме 'Аватар'?",
        answers: ["Аватариум", "Уран", "Унобтаниум", "Пандорий"],
        correctAnswer: 2
    },
    {
        question: "Какое сообщество людей отправляется на планету Пандора в поисках ресурсов?",
        answers: ["ПСО", "ООН", "Корпорация 'РДК'", "NASA"],
        correctAnswer: 2
    },
    {
        question: "Как звали главного героя фильма 'Аватар'?",
        answers: ["Джейк Салли", "Джек Доусон", "Джеймс Кэмерон", "Джеймс Фрэнклин"],
        correctAnswer: 0
    }
];

const barbieQuestions = [
    {
        question: "Какой профессии хочет научиться главная героиня игрушек Барби?",
        answers: ["Врач", "Преподаватель", "Модель", "Астронавт"],
        correctAnswer: 3
    },
    {
        question: "Как зовут сестру Барби?",
        answers: ["Кензи", "Стейси", "Лиза", "Кэти"],
        correctAnswer: 1
    },
    {
        question: "Как называется розовый автомобиль, на котором часто ездит Барби?",
        answers: ["Розовый бриз", "Розовая мечта", "Розовый кабриолет", "Машинка"],
        correctAnswer: 0
    },
    {
        question: "В каком году была представлена первая кукла Барби?",
        answers: ["1959", "1962", "1970", "1980"],
        correctAnswer: 0
    },
    {
        question: "Как звали лучшую подругу Барби?",
        answers: ["Мелисса", "Тереза", "Сара", "Эмма"],
        correctAnswer: 1
    }
];

const haticoQuestions = [
    {
        question: "Какой жанр игры 'Хатико: Странствие домой'?",
        answers: ["Драма", "Комедия", "Ужасы", "Приключения"],
        correctAnswer: 0
    },
    {
        question: "Какой породы собака является главным героем в фильме 'Хатико: Странствие домой'?",
        answers: ["Лабрадор", "Акита-ину", "Пудель", "Хаски"],
        correctAnswer: 1
    },
    {
        question: "Как называется станция, где происходит большая часть сюжета в фильме 'Хатико: Странствие домой'?",
        answers: ["Станция Шинкансен", "Станция Шибуя", "Станция Шинкоэндзима", "Станция Шинсю"],
        correctAnswer: 2
    },
    {
        question: "В каком городе происходят события фильма 'Хатико: Странствие домой'?",
        answers: ["Токио", "Осака", "Киото", "Япония"],
        correctAnswer: 0
    },
    {
        question: "Как звали хозяина собаки Хатико?",
        answers: ["Хиро", "Кэн", "Юки", "Такуми"],
        correctAnswer: 3
    }
];
const  oneplusoneQuestioins = [
    {
        question: "Как называется фильм, который известен также как '1+1'?",
        answers: ["Двое", "Искусство любви", "Между нами горы", "Непреодолимые"],
        correctAnswer: 0
    },
    {
        question: "Какие два главных персонажа в фильме '1+1'?",
        answers: ["Филипп и Драган", "Джеймс и Оливер", "Артур и Роман", "Франк и Джек"],
        correctAnswer: 0
    },
    {
        question: "Какой национальности был парализованный богач, которого ухаживал Драган?",
        answers: ["Француз", "Британец", "Американец", "Австралиец"],
        correctAnswer: 0
    },
    {
        question: "Где происходят основные события фильма '1+1'?",
        answers: ["В Париже", "В Нью-Йорке", "В Лондоне", "В Монако"],
        correctAnswer: 0
    },
    {
        question: "Какое важное умение умел выполнять Драган, которое сделало его ценным для Филиппа?",
        answers: ["Готовить", "Массажировать", "Рисовать", "Играть на музыкальных инструментах"],
        correctAnswer: 1
    }
];


parasiteQuestions.forEach(async (questionData) => {
    const newQuestion = new QuizQuestionModel({ ...questionData, movie: 'Parasite' });
    try {
        await newQuestion.save();
        console.log("Вопрос успешно добавлен в базу данных");
    } catch (err) {
        console.error(err);
    }
});

titanicQuestions.forEach(async (questionData) => {
    const newQuestion = new QuizQuestionModel({ ...questionData, movie: 'Titanic' });
    try {
        await newQuestion.save();
        console.log("Вопрос успешно добавлен в базу данных");
    } catch (err) {
        console.error(err);
    }
});

barbieQuestions.forEach(async (questionData) => {
    const newQuestion = new QuizQuestionModel({ ...questionData, movie: 'Barbie' });
    try {
        await newQuestion.save();
        console.log("Вопрос успешно добавлен в базу данных");
    } catch (err) {
        console.error(err);
    }
});

avatarQuestions.forEach(async (questionData) => {
    const newQuestion = new QuizQuestionModel({ ...questionData, movie: 'Avatar' });
    try {
        await newQuestion.save();
        console.log("Вопрос успешно добавлен в базу данных");
    } catch (err) {
        console.error(err);
    }
});

 haticoQuestions.forEach(async (questionData) => {
    const newQuestion = new QuizQuestionModel({ ...questionData, movie: 'Hatico' });
    try {
        await newQuestion.save();
        console.log("Вопрос успешно добавлен в базу данных");
    } catch (err) {
        console.error(err);
    }
});


oneplusoneQuestioins.forEach(async (questionData) => {
    const newQuestion = new QuizQuestionModel({ ...questionData, movie: 'Oneplusone' });
    try {
        await newQuestion.save();
        console.log("Вопрос успешно добавлен в базу данных");
    } catch (err) {
        console.error(err);
    }
});


*/
module.exports = {
    UserModel,
    LogsModel,
    ItemModel,
    QuizQuestionModel,
    /*parasiteQuestions,
    titanicQuestions,
    avatarQuestions,
    barbieQuestions,
    haticoQuestions,
    oneplusoneQuestioins
    */
};