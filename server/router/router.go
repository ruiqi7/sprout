package router

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/ruiqi7/web-forum/server/handlers"
)

func SetUp() http.Handler {
	r := chi.NewRouter()
	r.Use(middleware.Logger)

	r.Get("/user", handlers.GetUser)
	r.Post("/signin", handlers.SignIn)

	r.Group(func(r chi.Router) {
		r.Post("/signout", handlers.VerifyAuth(handlers.SignOut))
		r.Route("/forum", func(r chi.Router) {
			r.Get("/user", handlers.VerifyAuth(handlers.GetUser))

			r.Get("/posts", handlers.VerifyAuth(handlers.GetAllPosts))
			r.Get("/post/{id}", handlers.VerifyAuth(handlers.GetPost))
			r.Post("/create", handlers.VerifyAuth(handlers.CreatePost))
			r.Delete("/post/{id}", handlers.VerifyAuth(handlers.DeletePost))
			r.Put("/post/{id}", handlers.VerifyAuth(handlers.EditPost))

			r.Post("/post/{id}/comment", handlers.VerifyAuth(handlers.CreateComment))
			r.Get("/post/{id}/comments", handlers.VerifyAuth(handlers.GetAllComments))

			r.Route("/comment", func(r chi.Router) {
				r.Get("/{id}", handlers.VerifyAuth(handlers.GetComment))
				r.Delete("/{id}", handlers.VerifyAuth(handlers.DeleteComment))
				r.Put("/{id}", handlers.VerifyAuth(handlers.EditComment))
			})
		})
	})

	return r
}
