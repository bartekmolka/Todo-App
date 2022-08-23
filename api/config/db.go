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
	host := os.Getenv("DB_HOST")
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	dbname := os.Getenv("DB_NAME")
	port := os.Getenv("DB_PORT")

	// db, err := gorm.Open(postgres.New(postgres.Config{
	// 	DSN:                  "host=" + host + " user=" + user + " password=" + password + " dbname=" + dbname + " port=" + port + " sslmode=disable TimeZone=Europe/Warsaw",
	// 	PreferSimpleProtocol: true, // disables implicit prepared statement usage
	// }), &gorm.Config{})

	dsn := "host=" + host + " user=" + user + " password=" + password + " dbname=" + dbname + " port=" + port + " sslmode=disable TimeZone=Europe/Warsaw"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic(err)
	}

	DB = db

	DB.AutoMigrate(&models.Task{})

	return DB, nil
}
