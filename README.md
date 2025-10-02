# Molecul Social App

**Molecul Social App** is a modern social networking web application that allows users to create posts (with text and images), interact with comments and likes, and manage their profiles.  
Built with **Next.js 15 (App Router)**, it integrates authentication, database management, and media storage seamlessly.  

---

## 🚀 Features
- 🔑 Authentication with [Clerk](https://clerk.com)  
- 📝 Create posts with text + image upload via Cloudinary  
- 💬 Comment and like system  
- 👤 User profiles with avatar and unique username  
- ⚡ Automatic revalidation with `revalidatePath` (Next.js)  
- 🎨 Modern UI powered by **Tailwind CSS + ShadCN UI + Lucide Icons**  

---

## 🛠 Tech Stack
- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS, ShadCN UI, Framer Motion  
- **Backend**: Next.js API Routes, Prisma ORM  
- **Database**: PostgreSQL (via Neon)  
- **Auth**: Clerk  
- **Media Storage**: UploadThing  
- **Deployment**: Vercel  

---

## 📦 Installation

### 1. Clone the repository
```bash
git clone https://github.com/username/molecul-social-app.git
cd molecul-social-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a .env.local file in the root directory and add the following:

#### DATABASE_URL="your_postgres_url"
#### NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
#### CLERK_SECRET_KEY="your_clerk_secret_key"
#### UPLOADTHING_TOKEN="your_uploadthingtoken"

### 4. Run Prisma migrations
```bash
npx prisma migrate dev
```

5. Start the development server
```bash
npm run dev
```

🚧 Development Notes

- Ensure Clerk and Supabase are set up before running the project

- Cloudinary environment variables must be correct for image uploads

- Use npm run build before deploying to Vercel
