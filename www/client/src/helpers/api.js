/* 
ГЕНЕРАТОР JSON
https://json-generator.com/

{
  data: {
  count: 10,
  currentPage: 1,
  pageCount: 5,
  allCount: 25450,  
  pageVar: 'page',
  data: [
       '{{repeat(10, 20)}}',
        {
          _id: '{{objectId()}}',
          badges: [
            '{{repeat(2, 6)}}',
            {
              bg: '{{random("bg-orange", "bg-pink", "bg-aqua", "bg-purple")}}',
              icon: '/svg-inline/listing/source_icons_percentage.svg'
            }
          ],
          achiev: [
            {
              text: '4.7',
              icon: '/svg-inline/icon-12/star.svg'
            },
            {
              text: 'Топ-10',
              icon: '/svg-inline/icon-12/events.svg'
            },
            {
              text: 'Рекомендуем',
              icon: '/svg-inline/icon-12/verified.svg'
            }
          ],
          picture: [
            '{{repeat(2, 7)}}',
            {
              id: '{{index()}}',
              img: '/images/listing/item-card{{integer(1, 4)}}.png'
            }
          ],
          pictureTotal: '{{integer(60, 82)}}',
          sliderType: '{{integer(1, 2)}}',
          title: 'Заголовок {{company()}} ЖК',
          locations: ['{{random("Москва", "Челябинск")}}','{{random("СВАО", "ПРАО")}}', '{{random("Останкинский", "Воробьевский")}}'],
          transports: [
            '{{repeat(1, 4)}}',
            {
              transport: 
                {
                  title: '{{random("Ботанический сад", "Мичуринец (ж/д)", "Центр", "Станция")}}',
                  ico: '/svg-inline/listing/ic-metro.svg'
                },
              time: {
                  title: '{{random("7 мин", "30 мин", "90 мин", "15 мин")}}',
                  ico: '/svg-inline/icon-16/ic-bus.svg'
                }
            }
          ],
          developer: '{{company()}}',
          favorite: '{{bool()}}',
          compare: '{{bool()}}',
          developerRaiting: '{{floating(0.01, 5)}}',
          prices: [
            '{{repeat(0, 4)}}',
            {
              id: '{{index()}}',
              name: 'Студия от  {{floating(20, 30, 2)}}  м2',
              price: '{{floating(1000, 4000, 2, "0,0.00")}}'
            }
          ],
          sale: '{{integer(30, 1000)}}',
          saleAll: '1754',
          saleYesterday: '{{integer(1, 10)}}',
          totalLCD: '20',
          passed: '{{integer(1, 15)}}',
          build: '{{integer(1, 5)}}'

          }
       ]  
	},

}

 */

function getBuildingList(addparams)  {

    console.log('getBuildingList')
    const temp = {
        "data": {
            "count": 10,
            "currentPage": 1,
            "pageCount": 5,
            "allCount": 25450,
            "pageVar": "page",
            "data": [
                {
                    "_id": "62603715382975d3e5b7b78b",
                    "badges": [
                        {
                            "bg": "bg-pink",
                            "icon": "/svg-inline/listing/source_icons_percentage.svg"
                        },
                        {
                            "bg": "bg-pink",
                            "icon": "/svg-inline/listing/source_icons_percentage.svg"
                        },
                        {
                            "bg": "bg-purple",
                            "icon": "/svg-inline/listing/source_icons_percentage.svg"
                        },
                        {
                            "bg": "bg-pink",
                            "icon": "/svg-inline/listing/source_icons_percentage.svg"
                        },
                        {
                            "bg": "bg-aqua",
                            "icon": "/svg-inline/listing/source_icons_percentage.svg"
                        }
                    ],
                    "achiev": [
                        {
                            "text": 4.7,
                            "icon": "/svg-inline/icon-12/star.svg"
                        },
                        {
                            "text": "Топ-10",
                            "icon": "/svg-inline/icon-12/events.svg"
                        },
                        {
                            "text": "Рекомендуем",
                            "icon": "/svg-inline/icon-12/verified.svg"
                        }
                    ],
                    "picture": [
                        {
                            "id": 0,
                            "img": "/images/listing/item-card1.png"
                        },
                        {
                            "id": 1,
                            "img": "/images/listing/item-card4.png"
                        },
                        {
                            "id": 2,
                            "img": "/images/listing/item-card2.png"
                        }
                    ],
                    "pictureTotal": 76,
                    "sliderType": 1,
                    "title": "Заголовок Austech ЖК",
                    "locations": [
                        "Челябинск",
                        "СВАО",
                        "Останкинский"
                    ],
                    "transports": [
                        {
                            "transport": {
                                "title": "Центр2",
                                "ico": "/svg-inline/listing/ic-metro.svg"
                            },
                            "time": {
                                "title": "7 мин",
                                "ico": "/svg-inline/icon-16/ic-bus.svg"
                            }
                        },
                    ],
                    "developer": "Knowlysis",
                    "favorite": false,
                    "compare": true,
                    "developerRaiting": 1.02,
                    "prices": [
                        {
                            "id": 0,
                            "name": "Студия от  21.12  м2",
                            "price": "3,579.34"
                        },
                        {
                            "id": 1,
                            "name": "Студия от  25.37  м2",
                            "price": "3,581.21"
                        },
                        {
                            "id": 2,
                            "name": "Студия от  27.57  м2",
                            "price": "1,637.78"
                        },
                        {
                            "id": 3,
                            "name": "Студия от  23.81  м2",
                            "price": "1,350.81"
                        }
                    ],
                    "sale": 787,
                    "saleAll": 1754,
                    "saleYesterday": 9,
                    "totalLCD": 20,
                    "passed": 10,
                    "build": 2
                },
                {
                    "_id": "62603715fbc7b48c17ec3f07",
                    "badges": [
                        {
                            "bg": "bg-pink",
                            "icon": "/svg-inline/listing/source_icons_percentage.svg"
                        },
                        {
                            "bg": "bg-aqua",
                            "icon": "/svg-inline/listing/source_icons_percentage.svg"
                        }
                    ],
                    "achiev": [
                        {
                            "text": 4.7,
                            "icon": "/svg-inline/icon-12/star.svg"
                        },
                        {
                            "text": "Топ-10",
                            "icon": "/svg-inline/icon-12/events.svg"
                        },
                        {
                            "text": "Рекомендуем",
                            "icon": "/svg-inline/icon-12/verified.svg"
                        }
                    ],
                    "picture": [
                        {
                            "id": 0,
                            "img": "/images/listing/item-card4.png"
                        },
                        {
                            "id": 1,
                            "img": "/images/listing/item-card3.png"
                        },
                        {
                            "id": 2,
                            "img": "/images/listing/item-card4.png"
                        },
                        {
                            "id": 3,
                            "img": "/images/listing/item-card2.png"
                        }
                    ],
                    "pictureTotal": 64,
                    "sliderType": 1,
                    "title": "Заголовок Multron ЖК",
                    "locations": [
                        "Москва",
                        "ПРАО",
                        "Воробьевский"
                    ],
                    "transports": [
                        {
                            "transport": {
                                "title": "Мичуринец (ж/д)",
                                "ico": "/svg-inline/listing/ic-metro.svg"
                            },
                            "time": {
                                "title": "15 мин",
                                "ico": "/svg-inline/icon-16/ic-bus.svg"
                            }
                        },
                        {
                            "transport": {
                                "title": "Станция",
                                "ico": "/svg-inline/listing/ic-metro.svg"
                            },
                            "time": {
                                "title": "90 мин",
                                "ico": "/svg-inline/icon-16/ic-bus.svg"
                            }
                        },
                        {
                            "transport": {
                                "title": "Мичуринец (ж/д)",
                                "ico": "/svg-inline/listing/ic-metro.svg"
                            },
                            "time": {
                                "title": "7 мин",
                                "ico": "/svg-inline/icon-16/ic-bus.svg"
                            }
                        }
                    ],
                    "developer": "Marqet",
                    "favorite": true,
                    "compare": true,
                    "developerRaiting": 1.68,
                    "prices": [],
                    "sale": 998,
                    "saleAll": 1754,
                    "saleYesterday": 6,
                    "totalLCD": 20,
                    "passed": 13,
                    "build": 5
                },
                {
                    "_id": "62603715c734b3858a0917d2",
                    "badges": [
                        {
                            "bg": "bg-orange",
                            "icon": "/svg-inline/listing/source_icons_percentage.svg"
                        },
                        {
                            "bg": "bg-aqua",
                            "icon": "/svg-inline/listing/source_icons_percentage.svg"
                        },
                        {
                            "bg": "bg-orange",
                            "icon": "/svg-inline/listing/source_icons_percentage.svg"
                        },
                        {
                            "bg": "bg-purple",
                            "icon": "/svg-inline/listing/source_icons_percentage.svg"
                        }
                    ],
                    "achiev": [
                        {
                            "text": 4.7,
                            "icon": "/svg-inline/icon-12/star.svg"
                        },
                        {
                            "text": "Топ-10",
                            "icon": "/svg-inline/icon-12/events.svg"
                        },
                        {
                            "text": "Рекомендуем",
                            "icon": "/svg-inline/icon-12/verified.svg"
                        }
                    ],
                    "picture": [
                        {
                            "id": 0,
                            "img": "/images/listing/item-card4.png"
                        },
                        {
                            "id": 1,
                            "img": "/images/listing/item-card4.png"
                        },
                        {
                            "id": 2,
                            "img": "/images/listing/item-card1.png"
                        }
                    ],
                    "pictureTotal": 71,
                    "sliderType": 2,
                    "title": "Заголовок Multiflex ЖК",
                    "locations": [
                        "Москва",
                        "СВАО",
                        "Останкинский"
                    ],
                    "transports": [
                        {
                            "transport": {
                                "title": "Ботанический сад",
                                "ico": "/svg-inline/listing/ic-metro.svg"
                            },
                            "time": {
                                "title": "7 мин",
                                "ico": "/svg-inline/icon-16/ic-bus.svg"
                            }
                        },
                        {
                            "transport": {
                                "title": "Ботанический сад",
                                "ico": "/svg-inline/listing/ic-metro.svg"
                            },
                            "time": {
                                "title": "90 мин",
                                "ico": "/svg-inline/icon-16/ic-bus.svg"
                            }
                        },
                        {
                            "transport": {
                                "title": "Станция",
                                "ico": "/svg-inline/listing/ic-metro.svg"
                            },
                            "time": {
                                "title": "7 мин",
                                "ico": "/svg-inline/icon-16/ic-bus.svg"
                            }
                        },
                        {
                            "transport": {
                                "title": "Станция",
                                "ico": "/svg-inline/listing/ic-metro.svg"
                            },
                            "time": {
                                "title": "30 мин",
                                "ico": "/svg-inline/icon-16/ic-bus.svg"
                            }
                        }
                    ],
                    "developer": "Combogene",
                    "favorite": false,
                    "compare": false,
                    "developerRaiting": 0.47,
                    "prices": [
                        {
                            "id": 0,
                            "name": "Студия от  27.57  м2",
                            "price": "2,333.63"
                        },
                        {
                            "id": 1,
                            "name": "Студия от  28.85  м2",
                            "price": "1,016.54"
                        },
                        {
                            "id": 2,
                            "name": "Студия от  25.04  м2",
                            "price": "3,048.34"
                        }
                    ],
                    "sale": 803,
                    "saleAll": 1754,
                    "saleYesterday": 3,
                    "totalLCD": 20,
                    "passed": 5,
                    "build": 4
                }
            ]
        }
    };
    // return temp;
    return axios({
        method: "post",
        url: "/baza/api",
        params: addparams
    }) 
}
export {
    getBuildingList,

};
