# Conntour Space Explorer

A full-stack application for exploring space sources with a FastAPI backend and React frontend.

## Prerequisites

- Python 3.8+ 
- Node.js 16+ and npm
- uv (Python package manager) - Install with: `curl -LsSf https://astral.sh/uv/install.sh | sh`

## Setup

### Backend Setup

1. Install uv if you haven't already:
   ```bash
   curl -LsSf https://astral.sh/uv/install.sh | sh
   ```

2. Navigate to the backend directory:
   ```bash
   cd backend
   ```

3. Create and activate virtual environment using uv:
   ```bash
   uv venv
   source .venv/bin/activate  # On Unix/MacOS
   # OR
   .venv\Scripts\activate     # On Windows
   ```

4. Install dependencies using uv:
   ```bash
   uv pip install -r requirements.txt
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will run on http://localhost:3000

## Running the Application

### Start the Backend (FastAPI)

1. Make sure you're in the `backend` directory and your virtual environment is activated.

2. Run the FastAPI server with Uvicorn:
   ```bash
   uvicorn app:app --reload --port 8000
   ```

   The `--reload` flag enables auto-reload on code changes during development.

   The backend will run on: `http://localhost:8000`
   
   API documentation will be available at: `http://localhost:8000/docs`

### Start the Frontend

1. Open a new terminal window/tab.

2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

   The frontend will run on http://localhost:3000

## Project Structure

```
conntour-space-explorer/
├── backend/           # FastAPI backend application
│   ├── app.py        # Main FastAPI application
│   ├── models.py     # Data models
│   ├── data/         # Database and data handling
│   └── requirements.txt
└── frontend/         # React frontend application
    ├── src/          # Source code
    └── package.json
```

## API Endpoints

- `GET /api/sources` - Get paginated space sources (supports search query)
- `GET /api/history` - Get paginated history items
- `DELETE /api/history/{q}` - Delete a history item

## Development Notes

- The backend uses CORS middleware to allow requests from the frontend
- Both servers support hot-reload during development
- Make sure both servers are running simultaneously for full functionality

