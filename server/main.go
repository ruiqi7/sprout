package main

import (
	"log"
	"net/http"

	"github.com/ruiqi7/web-forum/server/config"
	"github.com/ruiqi7/web-forum/server/database"
	"github.com/ruiqi7/web-forum/server/router"
)

func main() {
	db := database.ConnectDB()
	defer db.Close()
	r := router.SetUp()
	r = config.CORS(r)
	log.Fatalln(http.ListenAndServe(":8000", r))
}
