package main

import (
	"go-api/config"
	"go-api/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.New()
	defer router.Run(":3000")

	router.Use(cors.Default())
	router.SetTrustedProxies([]string{"127.0.0.1"})

	config.Connect()

	routes.UserRoute(router)

}
