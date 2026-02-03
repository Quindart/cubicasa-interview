# CubiCasa Floor Plan Exporter - Technical Assignment

A modern web application for editing and generating CubiCasa floor plan configurations with real-time API integration.

## Links

- **Live Demo**: [https://cubicasa-interview.vercel.app](https://cubicasa-interview.vercel.app)
- **GitHub Repository**: [https://github.com/Quindart/cubicasa-interview](https://github.com/Quindart/cubicasa-interview)
- **API Documentation**: [CubiCasa Exporter Docs](https://exporter.docs.cubi.casa/floor-plan-19842092e0)

## Project Overview

This project was developed as part of the technical assessment for the **Frontend Developer – New Production App** position at CubiCasa. The application provides an intuitive interface for:

- Uploading and editing floor plan exporter configurations
- Real-time JSON preview and validation
- Generating floor plans via CubiCasa API
- Managing configuration history
- Downloading modified configuration files

## Features

### Step 1: Configuration Management
- **Upload Configuration**: Load JSON configuration files via drag-and-drop or file picker
- **Edit Values**: Modify configuration parameters through a user-friendly form interface
- **Download Modified File**: Export edited configurations as JSON files
- **Reusable Components**: Modular component architecture for maintainability
- **JSON Preview**: Live preview of configuration changes
- **Validation**: Input validation and error handling

### Step 2: API Integration
- **Floor Plan Generation**: Request floor plans based on current configuration
- **Axios Integration**: HTTP requests with proper error handling
- **File Download**: Automatic download of generated floor plan images
- **Error Messages**: Clear user feedback for API errors
- **Loading States**: Visual feedback during API calls

### Bonus Features
- **Configuration History**: Sidebar to manage and switch between multiple configurations
- **Modern UI**: Clean, responsive design with Tailwind CSS and Shadcn UI
- **Real-time Updates**: Live synchronization between form inputs and JSON preview
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Professional Styling**: Polished interface with attention to UX details

## Tech Stack

- **Framework**: React 18 with Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Quindart/cubicasa-interview.git
   cd cubicasa-interview
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_API_KEY=your_api_key_here
   VITE_MODEL_ID=your_model_id_here
   VITE_API_URL=https://api.exporter.cubi.casa
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

### Build for Production

```bash
pnpm build
```

The built files will be in the `dist` directory.

## Project Structure

```
cubicasa-interview/
├── src/
│   ├── components/          # Reusable UI components
│   │   └── ...
│   ├── lib/                 # Utility functions
│   │   ├── api.ts           # API integration
│   │   └── utils.ts         # Helper functions
│   ├── types/               # TypeScript type definitions
│   │   └── config.ts        # Configuration types
│   ├── App.tsx              # Main application component
│   └── main.tsx             # Application entry point
├── public/                  # Static assets
├── .env                     # Environment variables
├── package.json             # Project dependencies
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
└── README.md                # This file
```

## Implementation Approach

### Architecture Decisions

1. **Component-Based Design**: Broke down the application into reusable components for better maintainability and testability.

2. **Type Safety**: Utilized TypeScript for robust type checking and better developer experience.

3. **State Management**: Used React's built-in hooks (useState, useEffect) for local state management, suitable for this application's scope.

4. **API Integration**: Centralized API calls in a dedicated service layer for better separation of concerns.

5. **Error Handling**: Implemented comprehensive error handling at both component and API levels.

### Key Components

- **ConfigForm**: Main form component with dynamic field rendering based on configuration structure
- **JsonPreview**: Real-time JSON viewer with syntax highlighting
- **FileUpload**: Drag-and-drop file upload with validation
- **HistorySidebar**: Configuration history management
- **GenerateButton**: Floor plan generation with loading states

### Challenges Overcome

1. **TypeScript Configuration**: Resolved strict type checking issues for production builds
2. **API Integration**: Handled CORS and authentication properly
3. **File Handling**: Implemented robust file upload/download functionality
4. **State Synchronization**: Ensured form and JSON preview stay in sync

## Testing

The application has been tested with:
- Example configurations from the official documentation
- Various file upload scenarios
- API request/response handling
- Error states and edge cases
- Responsive design across different screen sizes

## Usage Guide

### 1. Upload Configuration

Click the upload area or drag and drop a JSON configuration file. Example configuration:

```json
{
  "name": "My Floor Plan",
  "output_type": "png",
  "resolution": 300,
  "show_dimensions": true
}
```

### 2. Edit Configuration

- Modify values directly in the form
- Changes are reflected in real-time in the JSON preview
- All fields are validated before submission

### 3. Download Configuration

Click the "Download Config" button to save your modified configuration as a JSON file.

### 4. Generate Floor Plan

1. Ensure your configuration is valid
2. Click "Generate Floor Plan"
3. Wait for the API response (loading indicator will show)
4. The floor plan image will automatically download
5. Check for error messages if the request fails


### Design Choices
- **React**: While the assignment requested Vue 3, I implemented with React as it's my primary expertise. The component architecture and patterns remain the same.
- **Shadcn UI**: Chose for its accessibility features and beautiful, customizable components.
- **TypeScript**: Essential for type safety in configuration handling.

## Contact
**Developer**: Quindart  
**Project**: CubiCasa Technical Assignment  
**Date**: February 2026

---

## Acknowledgments

Thank you to the CubiCasa recruitment team for this interesting technical challenge. I enjoyed working with the floor plan API and building this application. I'm excited about the opportunity to discuss my implementation and approach in the next steps of the interview process.

---

**Note**: This project was developed as part of a technical assessment. The API credentials provided are temporary and will expire after 7 days from the assignment date.
