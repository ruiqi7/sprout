package main

import (
	"log"
	"net/http"

	"github.com/ruiqi7/web-forum/server/router"
)

func main() {
	r := router.SetUp()
	log.Fatalln(http.ListenAndServe(":8000", r))
}
