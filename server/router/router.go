package router

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"

	"github.com/ruiqi7/web-forum/server/handlers/posts"
	"github.com/ruiqi7/web-forum/server/handlers/users"
)

func SetUp() http.Handler {
	r := chi.NewRouter()
	r.Use(middleware.Logger)

	r.Get("/user", users.GetUser)
	r.Post("/signin", users.SignIn)

	r.Group(func(r chi.Router) {
		r.Post("/signout", users.VerifyAuth(users.SignOut))
		r.Route("/forum", func(r chi.Router) {
			r.Get("/user", users.VerifyAuth(users.GetUser))
			r.Get("/posts", users.VerifyAuth(posts.GetAllPosts))
			r.Get("/post/{id}", users.VerifyAuth(posts.GetPost))
			r.Post("/create", users.VerifyAuth(posts.CreatePost))
			r.Delete("/post/{id}", users.VerifyAuth(posts.DeletePost))
			r.Put("/post/{id}", users.VerifyAuth(posts.EditPost))
		})
	})

	return r
}
