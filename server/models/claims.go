package models

import (
	"github.com/golang-jwt/jwt/v4"
)

type Claims struct {
	ID       int    `json:"id"`
	Username string `json:"username"`
	jwt.RegisteredClaims
}
