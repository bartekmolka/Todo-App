package models

import "gorm.io/gorm"

type Task struct {
	gorm.Model
	Name   string `gorm:"not null" json:"name" validate:"required"`
	Date   string `json:"date"`
	IsDone bool   `json:"isDone"`
}
