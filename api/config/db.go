package config

import (
	"go-api/models"
	"os"
	"path/filepath"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() (*gorm.DB, error) {
	path, _ := os.Getwd()
	envError := godotenv.Load(filepath.Join(path, ".env"))
	if envError != nil {
		godotenv.Load()
	}
	// host := os.Getenv("DB_HOST")
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	dbname := os.Getenv("DB_NAME")

	db, err := gorm.Open(postgres.New(postgres.Config{
		DSN:                  "host=192.168.144.2 user=" + user + " password=" + password + " dbname=" + dbname + " port=5432 sslmode=disable TimeZone=Europe/Warsaw",
		PreferSimpleProtocol: true, // disables implicit prepared statement usage
	}), &gorm.Config{})

	if err != nil {
		panic(err)
	}

	// dsn := "host=" + host + " user=" + user + " password=" + password + " dbname=" + dbname + " port=5432 sslmode=disable TimeZone=Europe/Warsaw"
	// db, _ := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	DB = db

	DB.AutoMigrate(&models.Task{})

	return DB, nil
}
