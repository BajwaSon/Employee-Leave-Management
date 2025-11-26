# Employee & Leave Management System  
**A Simple Angular Learning Project**

[![Angular](https://img.shields.io/badge/Angular-20%2B-red?logo=angular)](https://angular.dev)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A lightweight, beginner-friendly Employee and Leave Management web app built with **Angular 20** (standalone components). Perfect for students and developers learning core Angular concepts through a real-world mini HR tool.

## Features
- Role-based login (HR/Admin or Employee)
- Employee Management (Add, View, Edit, List)
- Leave Application with date picker
- Leave Approval Dashboard (HR only)
- Real-time leave balance display
- Fully responsive UI with **Angular Material**
- Clean, well-commented code ideal for learning

## Perfect For Learning
- Standalone Components & Signals
- Routing & Route Guards
- Reactive & Template-driven Forms
- Services & Dependency Injection
- HTTP Client (with mock JSON server)
- Angular Material (Table, Dialog, Form Controls)
- Interceptors & Authentication flow

## Tech Stack
- Angular 20 (Standalone API)
- Angular Material + Flex Layout
- TypeScript
- JSON Server (for mock backend)
- SCSS / Tailwind (optional)

## Quick Start

```bash
# Clone the repo
git clone git@github.com:BajwaSon/Employee-Leave-Management.git
cd employee-leave-management

# Install dependencies
npm install

# Start mock backend (optional but recommended)
npx json-server --watch db.json --port 4208

# Start Angular app
ng serve
```

Open [http://localhost:4208](http://localhost:4208)

### Default Logins
- **HR/Admin**: `www@gmail.com` / `112233`
- **Employee**: `john@company.com` / `emp123`

## Project Structure
```
src/
├── app/
│   ├── components/     → Reusable UI components
│   ├── pages/          → Route pages (login, dashboard, etc.)
│   ├── services/       → Auth, Employee, Leave services
│   ├── guards/         → AuthGuard
│   └── models/         → Interfaces (Employee, Leave)
```

## Contribute
Feel free to fork, raise issues, or submit pull requests. Contributions are welcome!

## License
[MIT License](LICENSE) – free to use, modify, and distribute.

Made with ❤️ for Angular learners!  
Happy Coding! 🚀
