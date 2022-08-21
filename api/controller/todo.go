package controller

import (
	"fmt"
	"go-api/config"
	"go-api/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Body struct {
	Task   string `json:"task"`
	Date   string `json:"date"`
	IsDone bool   `json:"isDone"`
}

func GetTasks(c *gin.Context) {
	tasks := []models.Task{}
	config.DB.Raw("SELECT * FROM tasks ORDER BY id").Scan(&tasks)
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
	fmt.Println(&task)
	c.JSON(200, &task)
}

func UpdateTask(c *gin.Context) {
	var task models.Task
	config.DB.Where("id = ?", c.Param("id")).First(&task)
	c.BindJSON(&task)

	// config.DB.Save(&task) OR:
	config.DB.Model(&task).Updates(models.Task{
		Task:   task.Task,
		Date:   task.Date,
		IsDone: task.IsDone,
	})

	c.JSON(200, &task)
}

func GetDoneTasks(c *gin.Context) {
	tasks := []models.Task{}
	config.DB.Where("isDone = ?", true).Find(&tasks)
	c.JSON(200, &tasks)
}
