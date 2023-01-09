package router

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/ruiqi7/web-forum/server/auth"
	"github.com/ruiqi7/web-forum/server/handlers"
)

func SetUp() http.Handler {
	r := chi.NewRouter()
	r.Use(middleware.Logger)

	r.Group(func(r chi.Router) {
		r.Post("/signin", handlers.SignIn)
	})

	r.Group(func(r chi.Router) {
		r.Post("/signout", auth.VerifyAuth(handlers.SignOut))
		r.Route("/forum", func(r chi.Router) {
			r.Get("/user", auth.VerifyAuth(handlers.GetUser))

			r.Get("/posts/All", auth.VerifyAuth(handlers.GetAllPosts))
			r.Get("/posts/{category}", auth.VerifyAuth(handlers.SearchByCategory))
			r.Get("/posts/All/{query}", auth.VerifyAuth(handlers.SearchByQuery))
			r.Get("/posts/{category}/{query}", auth.VerifyAuth(handlers.SearchByCategoryAndQuery))
			r.Route("/post", func(r chi.Router) {
				r.Post("/create", auth.VerifyAuth(handlers.CreatePost))
				r.Get("/{id}", auth.VerifyAuth(handlers.GetPost))
				r.Delete("/{id}", auth.VerifyAuth(handlers.DeletePost))
				r.Put("/{id}", auth.VerifyAuth(handlers.EditPost))
			})

			r.Get("/post/{id}/comments", auth.VerifyAuth(handlers.GetAllComments))
			r.Post("/post/{id}/comment", auth.VerifyAuth(handlers.CreateComment))
			r.Route("/comment", func(r chi.Router) {
				r.Get("/{id}", auth.VerifyAuth(handlers.GetComment))
				r.Delete("/{id}", auth.VerifyAuth(handlers.DeleteComment))
				r.Put("/{id}", auth.VerifyAuth(handlers.EditComment))
			})
		})
	})

	return r
}
