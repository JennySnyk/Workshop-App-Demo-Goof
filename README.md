# Workshop App Demo - Goof

This is a deliberately vulnerable web application created for security demonstration purposes. It is designed to showcase a variety of security vulnerabilities, making it an ideal tool for security training and workshops.

## Features

- **SAST Vulnerabilities**: A dozen examples based on the OWASP Top 10.
- **SCA Vulnerabilities**: Includes dependencies with known critical vulnerabilities like Log4Shell.
- **Container Vulnerabilities**: A `Dockerfile` using a known vulnerable base image.
- **IaC Misconfigurations**: Terraform files with common security flaws.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Installation & Running the App

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd Workshop-App-Demo-Goof
    ```
3.  **Install the dependencies:**
    ```bash
    npm install
    ```
4.  **Start the application:**
    ```bash
    node server.js
    ```

The application will be available at `http://localhost:3000`.

## Vulnerability Details

Here are some of the vulnerabilities included in this application and how to trigger them:

- **Cross-Site Scripting (XSS):**
  - `http://localhost:3000/xss?input=<script>alert('xss')</script>`
- **SQL Injection:**
  - `http://localhost:3000/sqli?id=1%20OR%201=1`
- **Command Injection:**
  - `http://localhost:3000/ci?host=8.8.8.8;%20ls`
- **Path Traversal:**
  - `http://localhost:3000/file?name=../../../../etc/passwd`
- **Server-Side Request Forgery (SSRF):**
  - `http://localhost:3000/ssrf?url=http://localhost:3000/secrets`

## Disclaimer

**This application is for educational and demonstration purposes only. Do not deploy it in a production environment.**
