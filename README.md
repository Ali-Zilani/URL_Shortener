```markdown
# URL Shortener Backend Service

A simple and efficient URL Shortener backend service built with JavaScript, Node.js, and Express. This service allows users to convert long URLs into shortened links and track the number of clicks or visits on each shortened URL.

## Features

- Generate a shortened URL from a valid original URL.
- Redirect users from the short URL to the original URL.
- Track and retrieve the total number of clicks/visits on each shortened URL.

## API Routes

| Method | Endpoint               | Description                                              |
|--------|------------------------|----------------------------------------------------------|
| POST   | `/URL`                 | Generate a new shortened URL. Returns `example.com/id`.  |
| GET    | `/:id`                 | Redirect to the original URL based on the short id.      |
| GET    | `/URL/analytics/:id`   | Get total clicks/visits count for the provided short id. |

## How It Works

1. Client sends a POST request with a valid long URL to `/URL`.
2. Server generates a unique short identifier for the URL.
3. Server stores the mapping between the short id and original URL.
4. Accessing `/:id` redirects to the original URL and increments click count.
5. Client can request `/URL/analytics/:id` to view click statistics.

## Technologies Used

- JavaScript (ES6+)
- Node.js
- Express.js
- MongoDB (via Mongoose)
- dotenv for environment variable management

## Setup and Running

Clone the repo:
```
git clone https://github.com/Ali-Zilani/url-shortener-backend.git
```

Install dependencies:
```
cd url-shortener-backend
npm install
```

Create a `.env` file with:
```
db_url=your_mongodb_connection_string
PORT=3001
```

Start the server:
```
npm start
```

## Example Usage

- Create short URL:
  ```
  POST /URL
  {
    "longUrl": "https://www.example.com/very/long/url"
  }
  ```

- Redirect:
  ```
  GET /random-id
  ```

- Get Analytics:
  ```
  GET /URL/analytics/random-id
  ```

---

Feel free to contribute and improve the project!
```
