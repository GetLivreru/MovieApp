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
        question: "What is the purpose of the 'int main()' function in a C++ program?",
        answers: [
            "It defines a loop in C++.",
            "It is the starting point of program execution.",
            "It imports libraries for the program.",
            "It handles memory management."
        ],
        correctAnswer: 1
    },
    {
        question: "Which of the following is used to output text to the console in C++?",
        answers: [
            "print()",
            "System.out.println()",
            "cout <<",
            "console.log()"
        ],
        correctAnswer: 2
    },
    {
        question: "What does the 'return 0;' statement do at the end of the 'main' function?",
        answers: [
            "It exits the program successfully.",
            "It initializes a variable to zero.",
            "It creates an infinite loop.",
            "It outputs zero to the console."
        ],
        correctAnswer: 0
    },
    {
        question: "Which of these is used to declare a variable that cannot be modified in C++?",
        answers: [
            "final",
            "let",
            "static",
            "const"
        ],
        correctAnswer: 3
    },
    {
        question: "What keyword is used to create a loop that iterates a fixed number of times?",
        answers: [
            "if",
            "while",
            "for",
            "switch"
        ],
        correctAnswer: 2
    },
];

const titanicQuestions = [
    {
        question: "What is the English translation for the Russian word 'корабль'?",
        answers: ["Train", "Ship", "Car", "Plane"],
        correctAnswer: 1
    },
    {
        question: "In English, how would you say 'главная роль' in the context of movies?",
        answers: ["Director", "Main character", "Supporting actor", "Villain"],
        correctAnswer: 1
    },
    {
        question: "What is the English equivalent of the Russian word 'режиссер'?",
        answers: ["Actor", "Producer", "Director", "Cameraman"],
        correctAnswer: 2
    },
    {
        question: "How would you say 'выход фильма' in English?",
        answers: ["Film release", "Movie ticket", "Casting", "Editing"],
        correctAnswer: 0
    },
    {
        question: "Which English word translates to 'пассажир'?",
        answers: ["Driver", "Passenger", "Pilot", "Captain"],
        correctAnswer: 1
    },
];

const avatarQuestions = [
    {
        question: "What technology was extensively used to create the visual effects in the movie 'Avatar'?",
        answers: ["Virtual Reality", "Augmented Reality", "Computer-Generated Imagery (CGI)", "3D Printing"],
        correctAnswer: 2
    },
    {
        question: "In 'Avatar', what device allowed actors to capture their facial expressions for the Na'vi characters?",
        answers: ["Motion Capture", "Green Screen", "3D Modeling", "Drone Cameras"],
        correctAnswer: 0
    },
    {
        question: "Which software technology is commonly used in film production to render detailed 3D environments like Pandora in 'Avatar'?",
        answers: ["Photoshop", "Blender", "Unity", "Autodesk Maya"],
        correctAnswer: 3
    },
    {
        question: "What term describes the artificial environment created digitally, such as the planet Pandora?",
        answers: ["Digital Twin", "Virtual World", "Internet of Things", "Blockchain"],
        correctAnswer: 1
    },
    {
        question: "What is the primary purpose of CGI in modern films?",
        answers: ["To add special effects and create realistic environments", "To edit sound effects", "To improve script quality", "To control lighting on set"],
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

avatarQuestions.forEach(async (questionData) => {
    const newQuestion = new QuizQuestionModel({ ...questionData, movie: 'Avatar' });
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