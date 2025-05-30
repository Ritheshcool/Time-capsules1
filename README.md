
⏳ TimeCapsule
Create digital time capsules for yourself or loved ones and schedule them for future delivery.

📬 About the Project
TimeCapsule is a full-stack web application that lets users create a “capsule” — a message with a title, content, recipient email, and future delivery date. On that date, the message is automatically delivered via email.

💡 Inspired by the idea of writing a letter to your future self or someone special and having it delivered when the time is right.

🚀 Features
✅ User Registration & Login (JWT + bcrypt)
✅ Create Capsules (Title, Message, Delivery Date, Recipient Email)
✅ Automated Email Delivery (Node-Cron + Nodemailer)
✅ PostgreSQL Database for capsule storage
✅ Simple React Frontend with Clean UI

🏗️ Tech Stack
Frontend: React, CSS

Backend: Node.js, Express

Database: PostgreSQL

Scheduler: Node-Cron

Email Delivery: Nodemailer

Deployment: Vercel (frontend), Render/ElephantSQL (backend)

⚙️ How It Works
1️⃣ Users create a capsule with message & delivery date.
2️⃣ Capsules are stored in PostgreSQL.
3️⃣ A daily cron job checks for capsules due today.
4️⃣ The message is sent via email to the recipient.

💻 Running Locally
bash
Copy
Edit
# Backend
cd backend
npm install
node server.js

# Frontend
cd frontend
npm install
npm start

📝 Future Improvements
Multimedia capsules (images, videos)

Personalized email templates

Capsule sharing & encryption

📢 Feedback & Contributions
If you have ideas, feel free to fork this project and contribute!
Or just leave a ⭐ if you liked it!

🔗 Links
GitHub Repo: https://github.com/Ritheshcool/Time-capsules

Live App: https://v0-digital-time-capsule-six.vercel.app/

👋 Let’s Connect!
I’d love to hear what you think of TimeCapsule.
Feel free to connect with me on LinkedIn: https://www.linkedin.com/in/rithesh-sundar-a54a8931b/ and share your own digital time capsule ideas!
