# Mark Bucket 🛒

A shopping list application built with React, TypeScript, Vite, and Supabase.

## Features

- ✅ Add products to your shopping list
- 🛍️ Mark products as purchased
- 📊 Track product details (name, quantity, brand, price)
- 🎨 Clean and responsive UI with Tailwind CSS
- ☁️ Cloud storage with Supabase

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Backend**: Supabase
- **Icons**: Phosphor Icons
- **Package Manager**: pnpm

## Prerequisites

Before running this project, make sure you have:

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [pnpm](https://pnpm.io/) package manager
- A [Supabase](https://supabase.com/) account and project

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/until99/mark_bucket.git
cd mark_bucket
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory and add your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

To get these values:

1. Go to your [Supabase Dashboard](https://app.supabase.com/)
2. Select your project
3. Go to Settings > API
4. Copy the URL and anon/public key

### 4. Database Setup

You'll need to create the following table in your Supabase database:

```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  brand TEXT,
  price DECIMAL(10,2),
  purchased BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create an update trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

## Available Scripts

### Development

Start the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:5173`

### Build

Build the project for production:

```bash
pnpm build
```

### Preview

Preview the production build locally:

```bash
pnpm preview
```

### Linting

Run ESLint to check for code issues:

```bash
pnpm lint
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx
│   ├── Dialog.tsx
│   ├── Form.tsx
│   ├── Input.tsx
│   ├── InputGroup.tsx
│   └── Table.tsx
├── hooks/              # Custom React hooks
│   ├── Input.tsx
│   ├── Modal.tsx
│   ├── useCheckboxSelection.tsx
│   ├── useProductForm.tsx
│   └── useProducts.tsx
├── interfaces/         # TypeScript interfaces
│   └── IProducts.ts
├── layout/            # Layout components
│   ├── Footer.tsx
│   ├── Header.tsx
│   └── Main.tsx
├── pages/             # Page components
│   └── App.tsx
├── services/          # External services
│   └── supabase.ts
└── utils/             # Utility functions
    └── formatters.ts
```

## Usage

1. **Adding Products**: Fill out the form with product details and click "Add Product"
2. **Marking as Purchased**: Select products using checkboxes and click "Mark as Purchased"
3. **Viewing Products**: All products are displayed in the table with their current status

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Troubleshooting

### Common Issues

1. **Environment Variables**: Make sure your `.env` file is properly configured with valid Supabase credentials
2. **Database Connection**: Ensure your Supabase project is active and the database table is created
3. **Package Installation**: If you encounter issues, try deleting `node_modules` and `pnpm-lock.yaml`, then run `pnpm install` again

### Getting Help

If you encounter any issues:

1. Check the browser console for error messages
2. Verify your Supabase configuration
3. Ensure all dependencies are properly installed

## License

This project is open source and available under the [MIT License](LICENSE).
