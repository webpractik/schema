import { Validator } from "./validators/validator";
import { ErrorMapFactory } from "./errors/errorMapFactory";

const testSchema = `{
  "meta": {
    "uuid": "55062809-66f7-41be-853f-b9a6be329eac",
    "id": "0000085",
    "name": "0000085_ru_his_po_periodu_1921_1927_gg_noexp.txt",
    "subject": "hist",
    "test": "егэ тренировка",
    "year": 2017,
    "class": "11",
    "theme": "По периоду 1921-1927 гг.",
    "taskText": "1"
  },
  "criteria": {
    "K1": "2",
    "K2": "2",
    "K3": "2",
    "K4": "1",
    "K5": "1",
    "K6": "3",
    "K7": "1"
  },
  "selections": [
    {
      "id": 19,
      "tag": "",
      "type": "СЯП",
      "group": "meaning",
      "comment": "",
      "subtype": "",
      "correction": "",
      "explanation": "",
      "endSelection": 92,
      "startSelection": 19
    },
    {
      "id": 160,
      "tag": "",
      "type": "СЯП",
      "group": "meaning",
      "comment": "",
      "subtype": "",
      "correction": "",
      "explanation": "",
      "endSelection": 169,
      "startSelection": 152
    },
    {
      "id": 187,
      "tag": "",
      "type": "СЯП",
      "group": "meaning",
      "comment": "",
      "subtype": "",
      "correction": "",
      "explanation": "",
      "endSelection": 185,
      "startSelection": 171
    },
    {
      "id": 212,
      "tag": "",
      "type": "СЯП",
      "group": "meaning",
      "comment": "",
      "subtype": "",
      "correction": "",
      "explanation": "",
      "endSelection": 224,
      "startSelection": 188
    },
    {
      "id": 293,
      "tag": "1",
      "type": "СЛЕДСТВИЕ",
      "group": "meaning",
      "comment": "",
      "subtype": "",
      "correction": "",
      "explanation": "",
      "endSelection": 298,
      "startSelection": 261
    },
    {
      "id": 554,
      "tag": "1",
      "type": "ПРИЧИНА",
      "group": "meaning",
      "comment": "",
      "subtype": "",
      "correction": "",
      "explanation": "",
      "endSelection": 635,
      "startSelection": 506
    },
    {
      "id": 698,
      "tag": "",
      "type": "РОЛЬ",
      "group": "meaning",
      "comment": "",
      "subtype": "",
      "correction": "",
      "explanation": "",
      "endSelection": 945,
      "startSelection": 636
    },
    {
      "id": 1017,
      "tag": "2",
      "type": "СЛЕДСТВИЕ",
      "group": "meaning",
      "comment": "",
      "subtype": "",
      "correction": "",
      "explanation": "",
      "endSelection": 1089,
      "startSelection": 946
    },
    {
      "id": 1177,
      "tag": "2",
      "type": "ПРИЧИНА",
      "group": "meaning",
      "comment": "",
      "subtype": "",
      "correction": "",
      "explanation": "",
      "endSelection": 1251,
      "startSelection": 1090
    },
    {
      "id": 1353,
      "tag": "hui",
      "type": "РОЛЬ",
      "group": "meaning",
      "comment": "",
      "subtype": "",
      "correction": "",
      "explanation": "",
      "endSelection": 1705,
      "startSelection": 1252
    },
    {
      "id": 1859,
      "tag": "",
      "type": "СЯП",
      "group": "meaning",
      "comment": "",
      "subtype": "",
      "correction": "",
      "explanation": "",
      "endSelection": 1772,
      "startSelection": 1749
    },
    {
      "id": 2060,
      "tag": "",
      "type": "РОЛЬ",
      "group": "meaning",
      "comment": "",
      "subtype": "",
      "correction": "",
      "explanation": "",
      "endSelection": 2332,
      "startSelection": 1942
    },
    {
      "id": 2646,
      "tag": "",
      "type": "СЯП",
      "group": "meaning",
      "comment": "",
      "subtype": "",
      "correction": "",
      "explanation": "",
      "endSelection": 2549,
      "startSelection": 2519
    },
    {
      "id": 2733,
      "tag": "",
      "type": "СЯП",
      "group": "meaning",
      "comment": "",
      "subtype": "",
      "correction": "",
      "explanation": "",
      "endSelection": 2622,
      "startSelection": 2598
    },
    {
      "id": 3546,
      "tag": "",
      "type": "СЯП",
      "group": "meaning",
      "comment": "",
      "subtype": "",
      "correction": "",
      "explanation": "",
      "endSelection": 3439,
      "startSelection": 3403
    },
    {
      "id": 3592,
      "tag": "",
      "type": "ОЦЕНКА",
      "group": "meaning",
      "comment": "",
      "subtype": "",
      "correction": "",
      "explanation": "",
      "endSelection": 3728,
      "startSelection": 3441
    },
    {
      "id": 402,
      "tag": "",
      "type": "СЯП",
      "group": "meaning",
      "comment": "",
      "subtype": "",
      "correction": "",
      "explanation": "",
      "endSelection": 2406,
      "startSelection": 2406
    },
    
    {
      "id": 402,
      "tag": "",
      "type": "И.лдейств",
      "group": "meaning",
      "comment": "",
      "subtype": "неконк",
      "correction": "",
      "explanation": "",
      "endSelection": 24060,
      "startSelection": 23900
    },
    
    {
      "id": 402,
      "tag": "",
      "type": "И.причин",
      "group": "meaning",
      "comment": "",
      "subtype": "нподтв",
      "correction": "",
      "explanation": "",
      "endSelection": 24060,
      "startSelection": 2390
    }
  ],
  "text": "Период 1921-1927 - переход от политики \\"военного коммунизма\\" к новой экономической политике. Данный отрезок отечественной истории также характеризуется образованием СССР, смертью Ленина и внутриполитической борьбой за власть.\\nКлючевым событием периода является введение новой экономической политики, которая сочетала в себе административные и рыночные способы организации экономической жизни общества. Теперь продразвёрстка заменялась продналогом, была восстановлена торговля и товарно-денежные отношения. Причинами перехода к нэпу был глубокий экономический и социальный кризис в стране, голод, разруха и восстания рабочих и крестьян. Ключевую роль в этом событии сыграл В. И.Ленин. Он активно участвовал в X съезде партии большевиков, и именно Ленин предложил отказаться от политики \\"военного коммунизма\\" и перейти к нэпу. Следствием нэпа стало преодоление разрухи в стране, улучшение жизни населения и активное развитие лёгкой промышленности.\\nВажным событием периода стала внутрипартийная борьба за власть между Сталиным, Троцким, Зиновьевым, Каменевым и другими политическими лидерами. Причинами этого события стало личное соперничество политических лидеров за власть в партии и в стране, а также различающиеся взгляды на дальнейшее развитие СССР. Большая роль в этой борьбе принадлежит Сталину, который одержал победу, устранив своих конкурентов. Он сосредоточил в своих руках огромную власть, расставил в центре и на местах верных ему людей. Именно Сталин умело сталкивал между собой своих противников и постепенно сместил их с ключевых постов (Троцкий был выслан из СССР, многие были репрессированы). Следствием этой борьбы стало усилие власти Сталина, и начало формирования культа личности Сталина.\\nВажным событием внешней политики является Генуэзская конференция, на которой русским дипломатам удалось добиться больших успехов. Причинами этой конференции стала изоляция СССР и необходимость восстановления связей с другими странами. Ключевую роль в этом событии сыграл нарком иностранных дел Чичерин. Он лично общался с иностранцами и с достоинством отстаивал интересы Советского государства. Именно Чичерин подготовил и подписал Рапалльский договор с Германией о сотрудничестве. Следствием данного события является признание СССР другими станами и установление дипломатических отношений с государствами разных континентов.\\nИменно в этот период произошло такое важное событие, как образование СССР по проекту Ленина, предлагавшего федеративное устройство нового государства (все республики были равноправны) и принятие Конституции 1924 года. Немаловажным событием данного периода является Кронштадтское восстание, произошедшее из-за несогласия моряков с политикой военного коммунизма, которая запрещала свободную торговлю. Восстание было подавлено, и именно после него советское руководство принимает решение о введении нэпа.\\nДанный период нельзя оценить однозначно. С одной стороны, произошли такие положительные события, как восстановление страны при помощи инструментов нэпа, успешные действия внешней политики в выходе России из международной изоляции и подписание договоров со многими странами. Но с другой стороны, именно в этот период умирает Ленин и в партии большевиков начинается борьба, вследствие которой победителем выходит Сталин, который сосредотачивает в своих руках огромную власть. Нельзя не оценить влияние периода на дальнейшую историю. Так, именно в этот период начинается формирование культа личности Сталина, который усилится к 30-м и 40-м годам, что проявится в массовых репрессиях, что, в свою очередь, приведёт к уничтожению любой оппозиционной точки зрения и страху народа перед властью. Лишь после смерти Сталина Хрущёв выступит на 20 съезде партии с докладом о разоблачении культа личности. После свёртывания нэпа в стране сложится благоприятная ситуация для проведения реформ в области промышленности, что приведёт к индустриализации, вследствие которой СССР превратится в аграрно-индустриальную страну, усилит свою обороноспособность, что сыграет важную роль в борьбе с фашисткой Германией во Второй мировой войне и приведёт к победе Советского Союза. После образования СССР в 1922 году в него войдут ещё несколько республик, что сделает Советский Союз крупнейшим государством своего времени, которое просуществует вплоть до 1991. Данный отрезок истории являлся важной вехой в истории страны и определил многие дальнейшие тенденции."
}`;

ErrorMapFactory.createErrorMapFactory().then((errMapFactory) => {
    const validator = new Validator();
    validator.setErrorsMapFactory(errMapFactory);

    validator.setValidatesCallback((publicId, text) => {
        return false;
    });
    validator.createChecks().then(() => {

        const valid = validator.isValid(testSchema);
        console.log('index valid', valid);
        console.log('index getErrors', validator.getErrors());
        validator.refresh();
        validator.setValidatesCallback((publicId, text) => {
            return true;
        });
        const test = validator.isValid(testSchema);
        console.log('refresh test', test, 'refresh', validator.getErrors());
    })
})




