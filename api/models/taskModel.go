package models

import "gorm.io/gorm"

type Task struct {
	gorm.Model
	Task   string `json:"task"`
	Date   string `json:"date"`
	IsDone bool   `json:"isDone"`
}
