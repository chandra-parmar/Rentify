# 🏠 Rentify

Rentify is a full-stack Node.js web application where users can create and browse rental listings, post reviews, upload images, and rate properties — inspired by Airbnb.

## 🚀 Features

- 🔐 User authentication & authorization (register/login/logout)
- 🏘️ Create, edit, and delete rental listings
- 📍 Listing includes title, description, image upload, location, and price
- 🌟 Add reviews and 1–5 star ratings to listings
- 🖼️ Upload and view listing images
- 🗑️ Users can delete their own listings and reviews
- 🧰 Server-side form validation using Joi
- 🗃️ MongoDB Atlas with Mongoose
- 🎨 EJS templating with Bootstrap styling
- ☁️ Image upload via Cloudinary (optional)

## 🧑‍💻 Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: EJS, Bootstrap 5
- **Database**: MongoDB + Mongoose
- **Authentication**: Passport.js (local strategy)
- **File Uploads**: Multer + Cloudinary (if used)
- **Validation**: Joi
- **Session Store**: connect-mongo
- **Hosting**: Render

## 📸 Screenshots

<img width="1342" height="630" alt="image" src="https://github.com/user-attachments/assets/5e037ddd-69fc-40dc-bdfb-690d11648a58" />



## 🛠️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/Rentify.git
   cd Rentify

2. Install dependencies
   npm install

3.create .env file
 MONGO_URL=your_mongodb_connection_string
 SESSION_SECRET=your_secret_key
 CLOUDINARY_CLOUD_NAME=your_cloud_name
 CLOUDINARY_KEY=your_api_key
 CLOUDINARY_SECRET=your_api_secret

4. run the app
   node app.js

   
✍️ Future Improvements
Booking & calendar system

Geolocation & map integration

User profile pages

Payment gateway integration

Pagination & search filters

🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first.


