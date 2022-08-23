package controller

import (
	"go-api/config"
	"go-api/models"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

const dateFormat = "2006-01-02"

func GetTime() time.Time {
	now := time.Now()
	return now
}

type Body struct {
	Name   string `json:"name"`
	Date   string `json:"date"`
	IsDone bool   `json:"isDone"`
}

func GetTasksToDo(c *gin.Context) {
	tasks := []models.Task{}
	config.DB.Where("is_done = ?", false).Find(&tasks)
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

func TodayTasks(c *gin.Context) {
	var tasks []models.Task
	config.DB.Where("is_done= ? AND date = ?", false, time.Now().Format(dateFormat)).Find(&tasks)
	c.JSON(200, &tasks)
}

func TomorrowTasks(c *gin.Context) {
	var tasks []models.Task
	config.DB.Where("is_done= ? AND date = ?", false, time.Now().AddDate(0, 0, 1).Format(dateFormat)).Find(&tasks)
	c.JSON(200, &tasks)
}

func WeekTasks(c *gin.Context) {
	var tasks []models.Task
	config.DB.Where("is_done= ? AND date <= ? AND date >= ?", false, time.Now().AddDate(0, 0, 7), time.Now().Format(dateFormat)).Find(&tasks)
	c.JSON(200, &tasks)
}

func MonthTasks(c *gin.Context) {
	var tasks []models.Task
	config.DB.Where("date <= ? AND date >= ?", time.Now().AddDate(0, 1, 0), time.Now().Format(dateFormat)).Find(&tasks)
	c.JSON(200, &tasks)
}
