package router

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"

	"github.com/ruiqi7/web-forum/server/handlers/posts"
)

func SetUp() http.Handler {
	r := chi.NewRouter()
	r.Use(middleware.Logger)

	r.Route("/forum", func(r chi.Router) {
		r.Get("/posts", posts.GetAllPosts)
		r.Get("/post/{id}", posts.GetPost)
		r.Post("/create", posts.CreatePost)
		r.Delete("/post/{id}", posts.DeletePost)
	})

	return r
}
