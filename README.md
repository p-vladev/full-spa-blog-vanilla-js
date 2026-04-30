# Full SPA Blog - Vanilla JavaScript

A feature-rich Single Page Application (SPA) for creating, editing, and managing blog posts built with vanilla JavaScript, custom routing, and a mock REST API.

## Tech Stack

- **JavaScript (ES6+)** - Core language
- **HTML5 / CSS3** - Markup and styling
- **Vite** - Build tool and development server
- **json-server** - Mock REST API backend
- **Custom Router** - Hash-based SPA routing without frameworks

## Features

### **Single Page Application (SPA)**
- Fast, seamless navigation without page reloads
- Client-side routing with custom router

### **User Authentication**
- Sign up and login functionality
- User profile management
- Session persistence with localStorage

### **Blog Management**
- Create new blog posts
- Edit existing posts
- Delete posts
- View all blogs and individual blog details
- Recent uploads tracking

### **Search & Discovery**
- Browse all blogs
- View detailed blog posts
- Navigation breadcrumbs with back button

### **Application Features**
- Reusable component architecture
- API integration with fetch API
- Form handling and validation
- Loading states with loader component
- Error handling
- Responsive navigation with navbar and sidebar

## Project Structure

```
src/
├── main.js                 # Application entry point
├── style.css              # Global styles
├── components/            # Reusable UI components
│   ├── AbstractComponent.js
│   ├── BackButton.js
│   ├── BlogEditor.js      # Form component for creating/editing blogs
│   ├── Loader.js          # Loading state indicator
│   ├── RecentUploads.js   # Recent blog uploads display
│   └── base/
│       ├── Navbar.js      # Top navigation
│       └── Sidebar.js     # Side navigation
├── router/
│   └── Router.js          # Custom routing logic
├── services/
│   └── api.js             # API service for backend communication
└── views/
    ├── Base.js            # Base view class
    ├── HomeView.js        # Home page
    ├── LogInView.js       # Login page
    ├── SignUpView.js      # Sign up page
    ├── ProfileView.js     # User profile page
    ├── BlogsView.js       # All blogs listing page
    ├── BlogView.js        # Single blog detail page
    ├── AddBlogView.js     # Create new blog page
    └── EditBlogView.js    # Edit blog page

db.json                    # Mock API database
```

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/full-spa-blog-vanilla-js.git
   cd full-spa-blog-vanilla-js
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Running the Project

1. **Start the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173` (or the port shown in your terminal)

2. **In a separate terminal, start the mock API server:**
   ```bash
   npx json-server --watch db.json
   ```
   The API will be available at `http://localhost:3000`

## API

This project uses **json-server** as a mock REST API backend.

### Available Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/blogs` | Get all blogs |
| GET | `/blogs/:id` | Get a single blog by ID |
| POST | `/blogs` | Create a new blog |
| PUT | `/blogs/:id` | Update a blog |
| DELETE | `/blogs/:id` | Delete a blog |
| GET | `/users` | Get all users |
| GET | `/users/:id` | Get a single user by ID |
| POST | `/users` | Create a new user |

### Request Example

```javascript
// Create a new blog
fetch('http://localhost:3000/blogs', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'My First Blog',
    content: 'This is the content...',
    author: 'John Doe',
    createdAt: new Date()
  })
})
```

## What I Learned

### **Key Concepts Mastered**

- **Building SPA without frameworks** - Understanding core SPA principles and patterns
- **Custom routing logic** - Implementing client-side routing with hash-based navigation
- **REST API integration** - Fetching data and handling API responses
- **Component architecture** - Creating reusable, maintainable UI components
- **State management** - Managing application state with localStorage and component state
- **Form handling** - Creating and validating forms in vanilla JavaScript
- **Error handling** - Implementing loading states and error management
- **DOM manipulation** - Efficient DOM creation and updates without a framework

## Notes

### **Important**

- This project uses **json-server** as a mock backend - data is not persisted between server restarts
- **Not intended for production use** - This is an educational project for learning SPA development
- **Easily extensible** - Can be connected to a real backend (Node.js/Express, Laravel, Django, etc.)
- **Data stored in localStorage** - User sessions persist in the browser
- All blog data is stored in `db.json` during development

## License

This project is open-source and available under the **MIT License**.

Feel free to use this project as a learning resource or starting point for your own SPA projects!
