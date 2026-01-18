# Employee Management Dashboard

## 📌 Project Overview

This project is a **React-based Employee Management Dashboard** built as an assignment to demonstrate frontend engineering skills.

The application allows users to:

* Log in with basic (mock) authentication
* View a dashboard of employees
* Add, edit, delete, and manage employees
* Upload and preview profile images
* Search and filter employees
* Persist data using browser storage
* Use a clean, modern, and user-friendly UI

The focus of the project is **clean architecture, good UX, and real-world frontend patterns**, not backend complexity.

---

## 🛠 Tech Stack Used

### Frontend

* **React.js** (with TypeScript)
* **React Context API** (state management)
* **React Router DOM** (routing & protected routes)

### Storage & Data

* **LocalStorage** – for employees & authentication persistence
* **Base64 image storage** – for profile images (with size limits)
* **Public API** – Indian states fetched from:

  * `https://india-location-hub.in/api/locations/states`

### Utilities & Libraries

* **UUID** – for generating unique employee IDs
* **HTML5 APIs** – FileReader for image handling

### Styling

* Custom CSS
* Responsive & accessible UI patterns
* Modal-based forms

---

## ▶️ Steps to Run the Project Locally

### 1️⃣ Clone the repository

```bash
git clone <your-repo-url>
cd <project-folder>
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Start the development server

```bash
npm run dev
```

### 4️⃣ Open in browser

```
http://localhost:5173
```

*(Port may vary depending on setup)*

---

## 🔐 Authentication Details

* Authentication is **mock-based**
* Any username & password combination is accepted
* Login state is stored in **localStorage**
* Protected routes prevent unauthorized access
* User is logged out on manua
