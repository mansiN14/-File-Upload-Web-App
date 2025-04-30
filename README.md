File Upload Web App
This is a File Upload Web App that allows users to upload files with a category selection and track the progress of their uploads. The frontend is built using React.js with Tailwind CSS for styling, and the backend is powered by Flask to handle file uploads.

Features
File Upload: Upload files (PDF, JPG, JPEG) to the server.

Category Selection: Assign categories (HR, IT, Sales) while uploading the file.

Drag-and-Drop: Drag and drop files for easy uploading.

Upload Progress: Track the upload progress with a progress bar.

Error Handling: Displays user-friendly error messages for invalid file types, large file sizes, and network issues.

Responsive Design: Fully responsive interface that works seamlessly across devices.

Technologies Used
Frontend:

React.js (JavaScript Library)

Tailwind CSS (Utility-first CSS framework)

Backend:

Flask (Python web framework)

Flask-Cors (CORS support for Flask)

File Handling:

Axios (Promise-based HTTP client for the browser)

FormData API (To handle multipart form data in uploads)

Getting Started
1. Clone the Repository
bash
Copy code
git clone <repository-url>
cd <project-folder>
2. Backend Setup
Install Dependencies
Navigate to the backend folder and install the required Python packages:

bash
Copy code
pip install -r requirements.txt
Run the Flask App
Start the Flask backend server by running:

bash
Copy code
python app.py
This will start the server on http://127.0.0.1:5000 (by default).

3. Frontend Setup
Install Dependencies
Navigate to the frontend folder and install the required Node.js packages:

bash
Copy code
npm install
Start the React App
Run the following command to start the React development server:

bash
Copy code
npm start
The React app should now be accessible at http://localhost:3000 by default.

Usage
Upload a File: Select a file from your computer or drag and drop it into the provided area.

Select a Category: Choose the appropriate category for the file (HR, IT, Sales).

Upload Progress: Watch the upload progress in real-time as it fills the progress bar.

Error Handling: If a file is too large or the wrong type is selected, an error message will be displayed.

API Endpoint
POST /upload
Description: Uploads a file with an associated category.

Request:

file: The file to be uploaded (PDF, JPG, or JPEG).

category: The category of the file (e.g., HR, IT, Sales).

Response: Returns a message indicating the success or failure of the upload.

message: A success or error message.

Example Response:
json
Copy code
{
  "message": "File 'example.jpg' uploaded successfully under category 'IT'."
}
Troubleshooting
CORS Issues: If you encounter CORS errors, ensure that Flask-Cors is installed and configured correctly in the backend.

Network Errors: Check the network tab in your browser's developer tools for any failed requests and verify that your backend server is running.

File Size Limit: The maximum allowed file size is set to 10MB. Larger files will trigger an error message.

Future Improvements
User Authentication: Implement a user authentication system to allow different users to manage their files securely.

Database Integration: Use a database to store file metadata for easy retrieval.

Cloud Storage: Integrate a cloud storage service like AWS S3 for file storage and better scalability.

Notification System: Add email or in-app notifications when the file upload is complete.

License
This project is licensed under the MIT License - see the LICENSE file for details.
