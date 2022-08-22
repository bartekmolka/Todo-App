package routes

import (
	"go-api/controller"

	"github.com/gin-gonic/gin"
)

func TaskRoute(router *gin.Engine) {
	router.GET("/", controller.GetTasksToDo)
	// router.GET("/:day", controller.GetTaskByDay)
	// router.GET("/:week", controller.GetTaskByWeek)
	// router.GET("/:month", controller.GetTaskByMonth)
	router.GET("/:id", controller.GetTaskById)
	router.GET("/done", controller.GetDoneTasks)
	router.POST("/", controller.CreateTask)
	router.DELETE("/:id", controller.DeleteTask)
	router.PUT("/:id", controller.UpdateTask)

}
