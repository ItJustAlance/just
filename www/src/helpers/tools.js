/*
обработка ошибок при ответе аякса
ошибки формата: status:0
ошибки соединения с сервером: 404

error.interceptorCatch - проставляется в axios.interceptors если в ответе аякса статус не равен 1;
*/

function errorHandler(error) {
  if (error.interceptorCatch) {
    //console.log("errorHandler 1")
    this.errorLogMsg =
      error.data.message ||
      "Произошла ошибка: (" + this.$options._componentTag + " )";
  } else {
    //console.log("errorHandler 2")
    if (error.response) {
      //console.log("errorHandler 3")
      if (this.$options) {
        //console.log("errorHandler 3.1")
        this.errorLogMsg =
          "Произошла ошибка: " +
          error.response.status +
          " ( " +
          (this.$options._componentTag || this.$options.name) +
          " )";
      } else {
        //console.log("errorHandler 3.2",  error.response.status)
        this.errorLogMsg = "Произошла ошибка: " + error.response.status;
      }
    } else {
      //console.log("errorHandler 4")

      if (this.$options) {
        this.errorLogMsg =
          "Произошла ошибка: " +
          error +
          " ( " +
          (this.$options._componentTag || this.$options.name) +
          " )";
      } else {
        this.errorLogMsg = "Произошла ошибка: " + error;
      }

      //console.log("error",error)
    }
  }
}

/* склонения (1 офис, 2 офиса, 5 офисов)*/
function checkVPlural(number, one, two, five) {
  var num = Math.abs(num);
  num %= 100;
  if (num >= 5 && num <= 20) {
    return five;
  }
  num %= 10;
  if (num === 1) {
    return one;
  }
  if (num >= 2 && num <= 4) {
    return two;
  }
  return five;
}

function getNoun(num, words) {
  var cases = [2, 0, 1, 1, 1, 2];
  return words[
    num % 100 > 4 && num % 100 < 20 ? 2 : cases[num % 10 < 5 ? num % 10 : 5]
  ];
}

/**
 * Отделение одного элемента объекта от других
 * @param {Object} obj изначальный объект
 * @param {String} prop какой элемент отделяем
 */
/*
function omitElement(obj, prop) {
  
  let { [prop]: omit, ...rest } = obj;
  return {
    omit: prop,
    rest
  };
}
 */

/**
 * Убираем лишние символы из строки и приводим к числу
 * @param {String} string
 */
function formatStringToNumber(string) {
  if (isNaN(string)) {
    return parseInt(string.replace(/\D/g, ""), 10);
  } else {
    return string;
  }
}

/**
 * Переводим время в минутах в формат часы-минуты
 * @param {Number} duration
 */
function getTimeFromMinutes(duration) {
  let hours = Math.floor(duration / 60);
  let minutes = Math.floor(duration % 60);

  return `${hours} ч ${minutes} мин`;
}

/**
 * Информации о позиции элемента на странице
 * @param {Dom Element} el
 */
function getElPosition(el) {
  let box = el.getBoundingClientRect();
  let top = box.top + window.pageYOffset;
  let bottom = box.bottom + window.pageYOffset;
  return {
    top,
    bottom,
    left: box.left,
    right: box.right,
    height: box.height
  };
}

/**
 * Минимальное значение из массива
 * @param {Array} array
 */
function getMinFromArray(array) {
  return array.reduce((memo, item) => {
    return Math.min(memo, item);
  });
}
/**
 * Максимальное значение из массива
 * @param {Array} array
 */
function getMaxFromArray(array) {
  return array.reduce((memo, item) => {
    return Math.max(memo, item);
  });
}

/**
 * Возвращает случайное число от max до min
 * @param {Number} min
 * @param {Number} max
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getPlural(number, one, two, five) {
  var num = Math.abs(number);
  num %= 100;
  if (num >= 5 && num <= 20) {
    return five;
  }
  num %= 10;
  if (num === 1) {
    return one;
  }
  if (num >= 2 && num <= 4) {
    return two;
  }
  return five;
}

/**
 * Возвращает cтроку с данными формы key=val&
 * @param {Dom Element} form
 */
function getForm(form) {
  const formParams = new FormData(form);
  return new URLSearchParams(formParams);
}

/**
 * Изменяем get параметры url
 * @param { append(name, value), // добавить параметр по имени
 *           set(name, value),    // задать/заменить параметр,
 *           delete(name)         // удалить параметр по имени,
 *         } method
 * @param {name} name
 * @param {value} value
 * * */
function updateUrl(method, name, value) {
  if (history.pushState) {
    var baseUrl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      window.location.search;
    // console.log('baseUrl', baseUrl)

    var newUrl = new URL(baseUrl);

    if (method === "delete") {
      newUrl.searchParams.delete(name);
    } else if (method === "set") {
      newUrl.searchParams.set(name, value);
    } else if (method === "append") {
      newUrl.searchParams.append(name, value);
    }

    history.pushState(null, null, newUrl);
  } else {
    console.warn("History API не поддерживается");
  }
}

/**
 * Вытаскиваем get параметры url
 * getAllUrlParams('http://test.com/?a=abc').a; // 'abc'
 * getAllUrlParams().color; // 'blue'
 * getAllUrlParams().newuser; // true
 * @param url
 * * * */
function getUrlParams(url) {
  // извлекаем строку из URL или объекта window
  var queryString = url ? url.split("?")[1] : window.location.search.slice(1);

  // перекодируем
  queryString = decodeURI(queryString);
  // объект для хранения параметров
  var obj = {};

  // если есть строка запроса
  if (queryString) {
    // данные после знака # будут опущены
    queryString = queryString.split("#")[0];

    // разделяем параметры
    var arr = queryString.split("&");

    for (var i = 0; i < arr.length; i++) {
      // разделяем параметр на ключ => значение
      var a = arr[i].split("=");

      // обработка данных вида: list[]=thing1&list[]=thing2
      var paramNum = undefined;
      var paramName = a[0].replace(/\[\d*\]/, function(v) {
        paramNum = v.slice(1, -1);
        return "";
      });

      // передача значения параметра ('true' если значение не задано)
      var paramValue = typeof a[1] === "undefined" ? true : a[1];

      // преобразование регистра
      paramName = paramName.toLowerCase();
      // декодируем знаки
      paramValue = decodeURIComponent(paramValue.toLowerCase());

      // если ключ параметра уже задан
      if (obj[paramName]) {
        // преобразуем текущее значение в массив
        if (typeof obj[paramName] === "string") {
          obj[paramName] = [obj[paramName]];
        }
        // если не задан индекс...
        if (typeof paramNum === "undefined") {
          // помещаем значение в конец массива
          obj[paramName].push(paramValue);
        }
        // если индекс задан...
        else {
          // размещаем элемент по заданному индексу
          obj[paramName][paramNum] = paramValue;
        }
      }
      // если параметр не задан, делаем это вручную
      else {
        obj[paramName] = paramValue;
      }
    }
  }

  return obj;
}

/**
 * Возвращаем цену в правильном формате
 * @param {data} Number
 * @param {remainder} Number // Кол-во в остатке, после запятой
 * */
function priceSet(data, remainder = 2) {
  /*
   * В переменной price приводим получаемую переменную в нужный вид:
   * 1. принудительно приводим тип в число с плавающей точкой,
   *    учли результат 'NAN' то по умолчанию 0
   * 2. фиксируем, что после точки только в сотых долях
   */
  var price = Number.prototype.toFixed.call(parseFloat(data) || 0, remainder),
    //заменяем точку на запятую
    price_sep = price.replace(/(\D)/g, ",");
  //добавляем пробел как разделитель в целых
  price_sep = price_sep.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");

  return price_sep;
}

/**
 * Возвращаем цену сокращенная запись 1.2 млн.
 * @param {number} Number // цифра
 * @param {k} String // тысяча
 * @param {m} String // миллионы
 * @param {b} String // миллиарды
 * */
function intlFormat(num) {
  return new Intl.NumberFormat().format(Math.round(num * 10) / 10);
}
function priceSetSmall(number, k = " тыс", m = " млн", b = " млрд") {
  if (number >= 1000000000) {
    return intlFormat(number / 1000000000) + b;
  }
  if (number >= 1000000) {
    return intlFormat(number / 1000000) + m;
  }
  if (number >= 1000) {
    return intlFormat(number / 1000) + k;
  }
  return intlFormat(number);
}

export {
  errorHandler,
  getNoun,
  checkVPlural,
  // omitElement,
  formatStringToNumber,
  getTimeFromMinutes,
  getElPosition,
  getMinFromArray,
  getMaxFromArray,
  getRandomInt,
  getPlural,
  getForm,
  getUrlParams,
  updateUrl,
  priceSet,
  priceSetSmall
};
