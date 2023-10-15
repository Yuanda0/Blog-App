# Blog Application

This Next.js-based blog application allows users to create, publish, and like blog posts. Below, you can find the key features of this application:

## Features

1. **User Login and Registration:** Users can sign in or register using Firebase Authentication.

2. **Blog Posts:** After signing in, users can create new blog posts. Each post includes essential information such as a title, content, and publication date.

3. **Likes:** Users can like blog posts. Liked posts are easily accessible for users to see what they've liked.

4. **Comments:** Users can comment on posts, and comments are displayed below the post, facilitating interaction.

5. **UI and Styling:** It provides a minimalist and stylish user interface using Tailwind CSS, and it incorporates icons using react-icons.

6. **Notifications:** React-Toastify is used to show notifications for post likes and new comments.

7. **Database:** Firestore is utilized to store posts and comments, making it easy to read and write data.

## Usage Guide

1. **Running the Project:**

   - Clone the project: `git clone <repo-url>`
   - Navigate to the project folder in your terminal and run `npm install` to install the necessary dependencies.
   - Create your Firebase project and configure it to use Firebase Authentication and Firestore.
   - Add your Firebase configuration details to the `firebase.js` file.

2. **Starting the Application:**

   - Navigate to the project's root directory in your terminal and start the application with `npm run dev`.

3. **User Actions:**

   - Users can sign in or register when the application starts.
   - After signing in, they can create new posts.
   - Users can like posts and leave comments.

4. **Notifications:**

   - Notifications for likes and new comments are displayed using React-Toastify.

5. **Database Management:**

   - You can manage posts and comments using Firestore.

6. **Styling Customization:**

   - You can customize the application's style and appearance using Tailwind CSS.

This markdown file explains the core features of your application and how it can be used. However, you can add more features or customize existing ones as you develop your application. Best of luck with your blog application development!
