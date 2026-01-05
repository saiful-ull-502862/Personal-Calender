# PhD Research Calendar & Journal

A comprehensive web-based application combining calendar scheduling with an integrated research journal for PhD work tracking.

## Features

- **Multi-view Calendar**: Hourly, daily, weekly, monthly views using `react-big-calendar`.
- **Research Journal**: Rich text editor (Tiptap) with markdown support, tags, and search.
- **Dashboard**: Quick view of today's schedule, recent journal entries, and progress metrics.
- **Modern UI**: Clean, minimalist interface with glassmorphism, dark/light mode, and responsive design.
- **Local Database**: Powered by SQLite for easy setup and data privacy.

## Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Database**: SQLite with Prisma ORM
- **Styling**: Tailwind CSS
- **Components**: Framer Motion, Lucide React
- **Calendar**: React Big Calendar
- **Editor**: Tiptap

## Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Setup Database**:
    The project uses SQLite by default. The database file `dev.db` will be created automatically.
    
    To push the schema:
    ```bash
    npx prisma db push
    ```

3.  **Run Development Server**:
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure

- `src/app`: Page routes and layouts
- `src/components`: Reusable UI components (Sidebar, CalendarWrapper, JournalEditor)
- `src/lib`: Utility functions and database client
- `prisma`: Database schema and configuration

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
