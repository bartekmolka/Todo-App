package routes 

import (
	"go-api/controller"

	"github.com/gin-gonic/gin"
)

func TaskRoute(router *gin.Engine) {
	router.GET("/", controller.GetTasksToDo)
	router.GET("/day", controller.TodayTasks)
	router.GET("/tomorrow", controller.TomorrowTasks)
	router.GET("/week", controller.WeekTasks)
	router.GET("/month", controller.MonthTasks)
	router.GET("/done", controller.GetDoneTasks)
	router.POST("/", controller.CreateTask)
	router.DELETE("/:id", controller.DeleteTask)
	router.PUT("/:id", controller.UpdateTask)

}
