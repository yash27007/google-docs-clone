# 📝 Pages – Google Docs Clone

**Pages** is a real-time collaborative text editor inspired by Google Docs. Built using cutting-edge technologies like **Next.js**, **Tiptap**, **Liveblocks**, **Convex DB**, and **Clerk**, this app enables seamless live editing, user authentication, and reactive document updates.

## 🚀 Live Demo

🔗 [Check out the live app](https://google-docs-clone-gamma-two.vercel.app/)

## 📦 Tech Stack

- **Next.js** – React framework for server-side rendering
- **Tiptap** – Headless rich-text editor
- **Liveblocks** – Real-time collaborative editing
- **Convex** – Reactive database with built-in serverless backend
- **Clerk** – Authentication and user management
- **Bun** – Ultra-fast JavaScript runtime and package manager

## 📁 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yash27007/google-docs-clone.git
cd google-docs-clone
````

### 2. Install Dependencies

Make sure you have **Bun** installed. Then run:

```bash
bun install
```

### 3. Set Up Convex and Clerk

* Create a **Convex** project at [convex.dev](https://dashboard.convex.dev/)
* Create a **Clerk** project at [clerk.com](https://clerk.com/)
* Rename `.env.example` to `.env.local` and fill in the required keys:

```env
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
LIVE_BLOCKS_SECRET_KEY=
```

### 4. Run the App Locally

#### Start Convex in development mode:

```bash
bunx convex dev
```

#### In another terminal, start the Next.js app:

```bash
bun run dev
```

Navigate to [http://localhost:3000](http://localhost:3000) and log in to start editing.

## ✨ Features

* 📄 Create and edit rich text documents
* 🔒 Clerk-powered authentication
* 🤝 Real-time collaborative editing (Liveblocks)
* 🧠 Reactive backend with Convex DB
* ⚡ Fast and modern Bun runtime

## 🧪 Environment Setup

Make sure your `.env.local` file includes all required variables (refer to `.env.example`). If something breaks, check if Convex and Clerk are correctly configured.

## 🤝 Contributing

We welcome contributions! To get started:

1. Fork this repository
2. Create a new branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add new feature'`
4. Push to your fork: `git push origin feature-name`
5. Open a Pull Request 🚀

### 📌 Contribution Guidelines

* Follow consistent code style and naming conventions.
* Document any new features with appropriate comments.
* Write clear and concise commit messages.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).


Built with ❤️ by [Yash](https://github.com/yash27007)
