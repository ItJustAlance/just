package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	
	"strings"

	"log"
	"math/rand"
	"net/http"
	
	// подключаем socket.io
	"github.com/gin-gonic/gin"
	socketio "github.com/googollee/go-socket.io"


	
	"strconv"
	
    
    
	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"

	gomail "gopkg.in/gomail.v2"
	
	// старт для использования env
	"os"
    "github.com/joho/godotenv"
    // конец для использования env
    
    // старт для telegram bot
    tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api/v5"
    // конец для telegram bot
    
    
)

type Book struct {
	Id     string  `json:"id"`
	Title  string  `json:"title"`
	Author *Author `json:"author"`
}

type Author struct {
	Firstname string `json:"firstname"`
	Lastname  string `json:"lastname"`
}

type Phone struct {
	Id string `json:"id"`
	Name string `json:"phoneModel"`

}
var phones []Phone
var books []Book



func sendMail(w http.ResponseWriter, r *http.Request) {
	// env
	ENV_GO_EMAIL_LOGIN := os.Getenv("GO_EMAIL_LOGIN")
	ENV_GO_EMAIL_PASS := os.Getenv("GO_EMAIL_PASS")
	ENV_GO_EMAIL_FROM := os.Getenv("GO_EMAIL_FROM")
	ENV_GO_EMAIL_TO := os.Getenv("GO_EMAIL_TO")

	fmt.Println("----111 ----")
	// fmt.Println(GO_EMAIL_LOGIN)
	fmt.Println("---- 2222 ----")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	// определяем заголовок как json, очень важно заголовок сделать чтобы совпадали с фронтом
	w.Header().Set("Content-Type", "application/json")

	// распарсиваем ответ
	r.ParseForm()
	// декодируем
    decoder := json.NewDecoder(r.Body)
    // создаем переменную
	var params map[string]string
	// видимо делаем map
    decoder.Decode(&params)

    // fmt.Printf("POST json: username=%s, password=%s\n", params["data"], params["userName"])
	userPhone := params["userPhone"]
    userName := params["userName"]
    userMess := params["userMess"]


	m := gomail.NewMessage()
    m.SetHeader("From", ENV_GO_EMAIL_FROM)
    m.SetHeader("To", ENV_GO_EMAIL_TO)
    m.SetHeader("Subject", "Новая заявка")
    m.SetBody("text/html", fmt.Sprintf("Пользователь указал следующие данные2: <br> Телефон: '%s' <br> Email: '%s' <br> Сообщение: '%s'", userName, userPhone, userMess))

    d := gomail.NewDialer("smtp.gmail.com", 587, ENV_GO_EMAIL_LOGIN, ENV_GO_EMAIL_PASS)

    if err := d.DialAndSend(m); err != nil {
        log.Println("CAN NOT GENERATE EMAIL:", err)
        return
    }
    
    
    // начинается телеграм бот 
    bot, err := tgbotapi.NewBotAPI("5199063954:AAEmKUxMKvU0oyjH_KsOEEBLol9Hqo3cJO0") // тестовый
    // bot, err := tgbotapi.NewBotAPI("5027222673:AAHY5gcp1hWFt6f-OKfhd_DFupuF-U5y--M")
        	if err != nil {
        		log.Panic(err)
        	}
        
        	bot.Debug = true
            
            // Create a new UpdateConfig struct with an offset of 0. Offsets are used
                // to make sure Telegram knows we've handled previous values and we don't
                // need them repeated.
                updateConfig := tgbotapi.NewUpdate(0)
            
                // Tell Telegram we should wait up to 30 seconds on each request for an
                // update. This way we can get information just as quickly as making many
                // frequent requests without having to send nearly as many.
                updateConfig.Timeout = 30
            
                // Start polling Telegram for updates.
                updates := bot.GetUpdatesChan(updateConfig)
            // тут отправляем принудительно сообщение пользователю с id 199168282    
            bot.Send(tgbotapi.NewMessage(199168282, fmt.Sprintf("Пользователь указал следующие данные: <br> Телефон: '%s' <br> Email: '%s' <br> Сообщение: '%s'", userName, userPhone, userMess)))
            
                // тут отправляем сообщения при обращении в самом чате
                // Let's go through each update that we're getting from Telegram.
                for update := range updates {
                    // Telegram can send many types of updates depending on what your Bot
                    // is up to. We only want to look at messages for now, so we can
                    // discard any other updates.
                    if update.Message == nil {
                        continue
                    }
                    command := strings.Split(update.Message.Text, " ")
                    // Now that we know we've gotten a new message, we can construct a
                    // reply! We'll take the Chat ID and Text from the incoming message
                    // and use it to create a new message.
                    
                    switch command[0] {
                    case "ADD":
                    case "SUB":
                    default:
                        bot.Send(tgbotapi.NewMessage(update.Message.Chat.ID, command[0]))
                    }
                    
                    // отправляем сообщение в телеграм в качестве ответа на сообщение из телеграмм                        
                    msg := tgbotapi.NewMessage(update.Message.Chat.ID, "testttt2")
                    
                    // We'll also say that this message is a reply to the previous message.
                    // For any other specifications than Chat ID or Text, you'll need to
                    // set fields on the `MessageConfig`.
                    msg.ReplyToMessageID = update.Message.MessageID
            
                    // Okay, we're sending our message off! We don't care about the message
                    // we just sent, so we'll discard it.
                    if _, err := bot.Send(msg); err != nil {
                        // Note that panics are a bad way to handle errors. Telegram can
                        // have service outages or network errors, you should retry sending
                        // messages or more gracefully handle failures.
                        panic(err)
                    }
                }
    /*
    backend-golang  | 12:4:12 app         | 2022/01/05 12:04:12 Endpoint: sendMessage, response: {"ok":true,"result":{"message_id":53,"from":{"id":5027222673,"is_bot":true,"first_name":"goVueBot","username":"go_vue_bot"},"chat":{"id":199168282,"first_name":"Roman","last_name":"Abramovich","username":"ItJustAlance","type":"private"},"date":1641384250,"reply_to_message":{"message_id":45,"from":{"id":199168282,"is_bot":false,"first_name":"Roman","last_name":"Abramovich","username":"ItJustAlance","language_code":"ru"},"chat":{"id":199168282,"first_name":"Roman","last_name":"Abramovich","username":"ItJustAlance","type":"private"},"date":1641384237,"text":"vg"},"text":"vg"}}
    */
    
    log.Println("EMAIL SENT SUCCESSFULLY")
    return
}


func getDb(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "text/plain")
	// обнуляем перед загрузкой страницы
    phones = []Phone{}
	// подлкючаемся к БД
	db, err := sql.Open("mysql", "user:password@tcp(172.26.0.3:3306)/sample")
	// проверка соединения
	err = db.Ping()
	if err != nil {
		panic(err.Error())
		log.Fatal(err)
	}
	defer db.Close()

	insert, err := db.Query("INSERT INTO `t_sample` (`name`, `created_at`, `updated_at`) VALUES('tessst', '3333', '5555')")
	if err != nil {
		panic(err.Error())
	}
	defer insert.Close()

	res, err := db.Query("SELECT `id`, `name` FROM `t_sample`")
    	if err != nil {
    		panic(err.Error())
    	}
	for res.Next() {
	// создаем обьект post на основе обьекта PhoneModel
		var model Phone
		err = res.Scan(&model.Id, &model.Name)
		phones = append(phones, model)
	}
	defer res.Close()
	json.NewEncoder(w).Encode(phones)
	// гдето тут не работает end
	fmt.Println("-------------1---------------------")
}

func getBooks(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	// обнуляем перед загрузкой страницы
	books = []Book{}
	books = append(books, Book{Id: "1", Title: "Война и Мир", Author: &Author{Firstname: "Лев", Lastname: "Толстой"}})
    books = append(books, Book{Id: "2", Title: "Преступление и наказание", Author: &Author{Firstname: "Фёдор", Lastname: "Достоевский"}})
	json.NewEncoder(w).Encode(books)
}

func getBook(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for _, item := range books {
		if item.Id == params["id"] {
			json.NewEncoder(w).Encode(item)
			return
		}
	}
	json.NewEncoder(w).Encode(&Book{})
}

func createBook(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var book Book
	_ = json.NewDecoder(r.Body).Decode(&book)
	book.Id = strconv.Itoa(rand.Intn(1000000))
	books = append(books, book)
	json.NewEncoder(w).Encode(book)
}

func updateBook(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for index, item := range books {
		if item.Id == params["id"] {
			books = append(books[:index], books[index+1:]...)
			var book Book
			_ = json.NewDecoder(r.Body).Decode(&book)
			book.Id = params["id"]
			books = append(books, book)
			json.NewEncoder(w).Encode(book)
			return
		}
	}
	json.NewEncoder(w).Encode(books)
}


func GinMiddleware(allowOrigin string) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", allowOrigin)
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Accept, Authorization, Content-Type, Content-Length, X-CSRF-Token, Token, session, Origin, Host, Connection, Accept-Encoding, Accept-Language, X-Requested-With")

		if c.Request.Method == http.MethodOptions {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}

		c.Request.Header.Del("Origin")

		c.Next()
	}
}



func main() {

 
	r := mux.NewRouter()

	err := godotenv.Load(".env")
    if err != nil {
        log.Fatalf("Some error occured. Err: %s", err)
    }


    /* START socketio */
    router := gin.New()
    
    	server := socketio.NewServer(nil)
    
    	server.OnConnect("/", func(s socketio.Conn) error {
    		s.SetContext("")
    		log.Println("connected:", s.ID())
    		return nil
    	})
    
    	server.OnEvent("/", "notice", func(s socketio.Conn, msg string) {
            log.Println("notice:", msg)
            s.Emit("reply", "have "+msg)
        })
        server.OnEvent("/", "chat message", func(s socketio.Conn, msg string) {
            log.Println("chat message:", msg)
            s.Emit("chat message", "have "+msg)
        })
        server.OnEvent("/", "getMessage", func(s socketio.Conn, msg string) {
                    log.Println("getMessage:", msg)
                    s.Emit("getMessage", "have "+msg)
                })
    
    	server.OnEvent("/chat", "msg", func(s socketio.Conn, msg string) string {
    		s.SetContext(msg)
    		return "recv " + msg
    	})
    
    	server.OnEvent("/", "bye", func(s socketio.Conn) string {
    		last := s.Context().(string)
    		s.Emit("bye", last)
    		s.Close()
    		return last
    	})
    
    	server.OnError("/", func(s socketio.Conn, e error) {
    		log.Println("meet error:", e)
    	})
    
    	server.OnDisconnect("/", func(s socketio.Conn, msg string) {
    		log.Println("closed", msg)
    	})
    
    	go func() {
    		if err := server.Serve(); err != nil {
    			log.Fatalf("socketio listen error: %s\n", err)
    		}
    	}()
    	defer server.Close()
    
    	router.Use(GinMiddleware("http://localhost"))
    	router.GET("/socket.io/*any", gin.WrapH(server))
    	router.POST("/socket.io/*any", gin.WrapH(server))
    	router.StaticFS("/public", http.Dir("../asset"))
    
    	if err := router.Run(""); err != nil {
    		log.Fatal("failed run app: ", err)
    	}
    	
    	
    	
       /* END socketio */

	r.HandleFunc("/books", getBooks).Methods("GET")
	r.HandleFunc("/book/{id}", getBook).Methods("GET")
	r.HandleFunc("/book", createBook).Methods("POST")
	r.HandleFunc("/book/{id}", updateBook).Methods("PUT")
	r.HandleFunc("/db", getDb).Methods("GET")
	r.HandleFunc("/sendContact", sendMail).Methods("POST")
	log.Fatal(http.ListenAndServe(":8888", r))
	
	
	
	
	
	
	
}
