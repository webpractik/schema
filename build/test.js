"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMapFactory_1 = require("./errors/errorMapFactory");
const validator_1 = require("./validators/validator");
const schema_1 = require("./schema/schema");
const checkOriginalText_1 = require("./validators/checks/checkOriginalText");
/*"selections": [
    {
      "id": 126,
      "tag": "",
      "type": "СЯП",
      "group": "meaning",
      "comment": "",
      "subtype": "",
      "correction": "",
      "explanation": "",
      "endSelection": 381,
      "startSelection": 126
    },
    {
      "id": 390,
      "tag": "",
      "type": "СЯП",
      "group": "meaning",
      "comment": "",
      "subtype": "",
      "correction": "",
      "explanation": "",
      "endSelection": 429,
      "startSelection": 382
    },
    {
      "id": 446,
      "tag": "1",
      "type": "ПРИЧИНА",
      "group": "meaning",
      "comment": "",
      "subtype": "",
      "correction": "",
      "explanation": "",
      "endSelection": 727,
      "startSelection": 430
    },
    {
      "id": 758,
      "tag": "",
      "type": "РОЛЬ",
      "group": "error",
      "comment": "",
      "subtype": "",
      "correction": "",
      "explanation": "",
      "endSelection": 1079,
      "startSelection": 728
    },
    {
      "id": 1119,
      "tag": "1",
      "type": "СЛЕДСТВИЕ",
      "group": "meaning",
      "comment": "",
      "subtype": "",
      "correction": "",
      "explanation": "",
      "endSelection": 1266,
      "startSelection": 1080
    },
    {
      "id": 1322,
      "tag": "",
      "type": "brt",
      "group": "meaning",
      "comment": "",
      "subtype": "",
      "correction": "",
      "explanation": "",
      "endSelection": 1336,
      "startSelection": 1267
    },
    {
      "id": 1400,
      "tag": "2",
      "type": "ПРИЧИНА",
      "group": "meaning",
      "comment": "",
      "subtype": "",
      "correction": "",
      "explanation": "",
      "endSelection": 1583,
      "startSelection": 1337
    },
    {
      "id": 1661,
      "tag": "",
      "type": "РОЛЬ",
      "group": "error",
      "comment": "",
      "subtype": "",
      "correction": "",
      "explanation": "",
      "endSelection": 1792,
      "startSelection": 1584
    },
    {
      "id": 1879,
      "tag": "2",
      "type": "СЛЕДСТВИЕ",
      "group": "meaning",
      "comment": "",
      "subtype": "",
      "correction": "",
      "explanation": "",
      "endSelection": 1947,
      "startSelection": 1793
    },
    {
      "id": 2050,
      "tag": "",
      "type": "СЯП",
      "group": "meaning",
      "comment": "",
      "subtype": "",
      "correction": "",
      "explanation": "",
      "endSelection": 1989,
      "startSelection": 1948
    },
    {
      "id": 2100,
      "tag": "3",
      "type": "ПРИЧИНА",
      "group": "meaning",
      "comment": "",
      "subtype": "",
      "correction": "",
      "explanation": "",
      "endSelection": 2223,
      "startSelection": 19900
    },
    {
      "id": 2348,
      "tag": "",
      "type": "РОЛЬ",
      "group": "error",
      "comment": "",
      "subtype": "",
      "correction": "",
      "explanation": "",
      "endSelection": 24000,
      "startSelection": 22240
    },
    {
      "id": 2355,
      "tag": "",
      "type": "И.ЛДЕЙСТВ1",
      "group": "error",
      "comment": "",
      "subtype": "неконк",
      "correction": "",
      "explanation": "",
      "endSelection": 2400,
      "startSelection": 2224
    },
    {
      "id": 2555,
      "tag": "3",
      "type": "СЛЕДСТВИЕ",
      "group": "meaning",
      "comment": "",
      "subtype": "",
      "correction": "",
      "explanation": "",
      "endSelection": 2486,
      "startSelection": 2401
    },
    {
      "id": 2657,
      "tag": "",
      "type": "ОЦЕНКА",
      "group": "meaning",
      "comment": "",
      "subtype": "",
      "correction": "",
      "explanation": "",
      "endSelection": 3395,
      "startSelection": 2487
    }
  ],*/
const jsonDoc = `{
  "meta": {
    "uuid": "a81dad61-76f2-4e23-85e9-7af643089081",
    "id": "0000078",
    "name": "0000078_ru_his_period_1825__1855_noexp.txt",
    "subject": "hist",
    "test": "егэ тренировка",
    "year": 2020,
    "class": "11",
    "theme": "Период 1825 – 1855",
    "taskText": ""
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
  
  "text": "Период 1825 – 1855 является временем правления Николая 1. В данный исторический отрезок времени происходят такие события, как подавление восстания декабристов 14 декабря 1825 года, издание нового цензурного устава 1826 года, проведение кодификации законов 1826 – 1833 гг, реформа П.Д. Киселёва 1837 – 1841, реформа Канкрина 18339 – 1843 гг, крымская война 1853 – 1856 гг. и другие.\\nВ 1825 году происходит декабристское восстание. Причиной данного события стала смерть императора Александра 1, умершего в Таганроге, создание момента для декабристов для захвата власти в стране. Также причиной этого события может послужить недовольство частью дворянства политикой, проводимой в стране, когда в империи воцарилась «Аракчеевщина». Важную роль в этом событии сыграл С.П. Трубецкой. Он занимал одну из руководящих ролей в «Северном сообществе», принимал участие в разработке плана восстания, высказался за военный переворот без участия «черни», был назначен военным диктатором восстания и решил не прийти в роли военного диктатора восстания на Сенатскую площадь, где и произошел бунт. В результате этого события прошел первый большой судебный процесс, пятеро руководителей декабристов были казнены, само же восстание усилило консервативные тенденции в политике Николая 1.\\nПо 1826 – 1833 гг. проводится кодификация законов российской империи. Причиной этого события была необходимость устранения устаревших законодательных актов со времен Соборного уложения 1649 года, упорядочения российской законодательной системы для облегчения процесса судопроизводства и устранение произвола в судах. Важную роль в этом событии сыграл М.М. Сперанский. Он прочел практически все законы Российской Империи с 1649 года, систематизировал российское право и высказался за идею о реформации законодательной системы. Следствием этого события стало устранение беспорядка в российском суде, систематизация российской законодательной системы и устранение устаревших законов.\\nВ 1853 – 1856 разгорается Крымская война. Причиной этого события стало отклонение российского ультиматума Турцией, нарастание антагонизма между Турцией и Россией, интересы Николая 1 по разделению Турции, подстрекательство западных держав, толкавших Турцию на войну с Россией. Важную роль в этом событии сыграл П.С. Нахимов. Он обнаружил турецкий флот в Синопской бухте, под его командованием турецкий флот был сначала заперт в бухте, а затем уничтожен. Следствие – уничтожение турецкой эскадры, объявление войны Англией и Францией России.\\nДанный период историками оценивается неоднозначно. Кодификация законов позволила структурировать законодательную систему и практически в такой форме они просуществовали вплоть до судебной реформы 1864 года. Однако она не устранила произвол и коррупцию в судах, что и осталось проблемой судов в будущем. Реформа П.Д. Кисилева смогла, хоть и частично, облегчить положение государственных крестьян и устранить угрозу малоземья. Самим же опытом реформы воспользовались, когда разрабатывался проект отмены крепостного права в правление Александра 2. В то же время увеличил затраты на государственный бюджет, когда увеличилось количество чиновничество для опекунства над государственными крестьянами. Крымская война показала всю несостоятельной Николаевской системы и стала одной из главных причин начала «Великих реформ» Александра 2. В целом данный период сыграл большое значение для дальнейшего развития страны."
}`;
async function example() {
    const schema = schema_1.Schema.fromJson(jsonDoc);
    const errMap = await errorMapFactory_1.ErrorMapFactory.createErrorMap();
    const validator = new validator_1.Validator();
    validator.setErrorsMap(errMap);
    validator.addChecker(new checkOriginalText_1.CheckOriginalText((publicId, text) => {
        return true;
    }));
    const resultValidation = validator.validate(schema);
    console.log('resultValidation', resultValidation.status, resultValidation.errors);
}
example();
