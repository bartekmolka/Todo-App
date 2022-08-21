package routes

import (
	"go-api/controller"

	"github.com/gin-gonic/gin"
)

func UserRoute(router *gin.Engine) {
	router.GET("/", controller.GetTasks)
	// router.GET("/:day", controller.GetTaskByDay)
	// router.GET("/:month", controller.GetTaskByMonth)
	// router.GET("/:year", controller.GetTaskByYear)
	router.GET("/done", controller.GetDoneTasks)
	router.POST("/", controller.CreateTask)
	router.DELETE("/:id", controller.DeleteTask)
	router.PUT("/:id", controller.UpdateTask)

}
