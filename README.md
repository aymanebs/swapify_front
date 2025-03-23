# Swapify Frontend

Swapify is a **React-based** frontend designed to provide a seamless user experience for **exchanging goods without monetary transactions**. This interface allows users to browse available items, initiate swap requests, chat with other users, and manage their profiles.

## Features

- **User Authentication** – Sign up, log in, and authenticate via JWT.
- **Item Management** – List, update, and delete items available for swapping.
- **Swap Requests** – Send and manage trade requests.
- **Messaging System** – Chat with other users to negotiate swaps.
- **Real-Time Notifications** – Receive instant updates on trade requests and messages via **Socket.io**.
- **User Ratings** – Rate users after a successful trade.
- **Responsive Design** – Optimized for both desktop and mobile.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/swapify-frontend.git
   cd swapify-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   VITE_API_BASE_URL=http://localhost:3000
   VITE_GOOGLE_CLIENT_ID=your-google-client-id
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and visit:
   ```
   http://localhost:5173
   ```

## Tech Stack

- **React** with **Vite**
- **Redux Toolkit** for state management
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Axios** for API requests
- **Socket.io** for real-time communication

## Build & Deployment

To create a production build:
```bash
npm run build
```

To preview the build locally:
```bash
npm run preview
```

## Testing

To run tests:
```bash
npm test
```

## Contribution Guidelines

We welcome contributions! Follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m "Add feature"`).
4. Push to your branch (`git push origin feature-name`).
5. Open a pull request.

## Roadmap

- [ ] Implement a dark mode toggle
- [ ] Improve accessibility features
- [ ] Add more filtering options for items
- [ ] Enhance the notification system

## License

This project is licensed under the **MIT License**.
