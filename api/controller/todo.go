package controller

import (
	"fmt"
	"go-api/config"
	"go-api/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Body struct {
	Name   string `json:"name"`
	Date   string `json:"date"`
	IsDone bool   `json:"isDone"`
}

func GetTasksToDo(c *gin.Context) {
	tasks := []models.Task{}
	config.DB.Raw("SELECT * FROM tasks WHERE is_done=false ORDER BY id").Scan(&tasks)
	c.JSON(200, &tasks)
}

func CreateTask(c *gin.Context) {

	var task models.Task
	c.BindJSON(&task)
	config.DB.Create(&task)
	c.JSON(http.StatusOK, &task)
}

func DeleteTask(c *gin.Context) {
	var task models.Task
	config.DB.Raw("DELETE FROM tasks WHERE id = ?", c.Param("id")).Scan(&task)
	c.JSON(200, &task)
}

func UpdateTask(c *gin.Context) {
	var body Body
	c.BindJSON(&body)

	fmt.Println(body.IsDone)
	var task models.Task
	config.DB.First(&task, c.Param("id"))

	if body.Name != "" {
		task.Name = body.Name
	}
	if body.Date != "" {
		task.Date = body.Date
	}
	if body.IsDone != task.IsDone {
		task.IsDone = body.IsDone
	}

	config.DB.Save(&task)

	c.JSON(200, &task)
}

func GetDoneTasks(c *gin.Context) {
	tasks := []models.Task{}
	config.DB.Where("is_done = ?", true).Find(&tasks)
	c.JSON(200, &tasks)
}

func GetTaskById(c *gin.Context) {
	var task models.Task
	config.DB.First(&task, c.Param("id"))
	c.JSON(200, &task)
}
