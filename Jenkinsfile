pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Install & Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'rm -rf node_modules package-lock.json '
                    sh 'npm cache clean --force'
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Run Tests (Optional)') {
            steps {
                echo "No tests configured yet"
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t ecommerce-backend ./backend'
                sh 'docker build -t ecommerce-frontend ./frontend'
            }
        }

        stage('Docker Compose Deploy') {
            steps {
                sh 'docker compose down || true'
                sh 'docker compose up -d --build'
            }
        }

    }

    post {
        success {
            echo '✅ Pipeline executed successfully!'
        }

        failure {
            echo '❌ Pipeline failed. Check logs.'
        }
    }
}


