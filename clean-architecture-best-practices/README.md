# Clean Architecture Best Practices

A comprehensive demonstration of clean architecture patterns in React/Next.js applications. This project showcases proper separation of concerns, dependency inversion, and scalable code organization.

## 🏗️ Architecture Overview

This project follows Clean Architecture principles with the following layers:

### 1. Domain Layer (`src/domain/`)
- **Entities**: Core business objects (User, Post)
- **Value Objects**: Immutable objects (Result)
- **Domain Logic**: Business rules and validation

### 2. Use Case Layer (`src/usecase/`)
- **Application Logic**: Orchestrates data flow between layers
- **Use Cases**: Specific application operations (GetUser, CreateUser, GetPosts)
- **Input/Output DTOs**: Data transfer objects for use case boundaries

### 3. Repository Layer (`src/repository/`)
- **Interfaces**: Data access contracts
- **Abstraction**: Decouples business logic from data access

### 4. Infrastructure Layer (`src/infrastructure/`)
- **Implementations**: Concrete implementations of repositories
- **External Services**: HTTP clients, databases, third-party APIs
- **Dependency Container**: Service locator pattern

### 5. Presentation Layer (`src/presentation/`)
- **React Components**: UI components and pages
- **Custom Hooks**: State management and business logic integration
- **Page Components**: Route-specific components

### 6. Shared Layer (`src/shared/`)
- **Reusable Components**: UI components used across the application
- **Utilities**: Common helper functions and types

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run type checking
npm run type-check

# Run linting
npm run lint
```

## 📁 Project Structure

```
src/
├── domain/                 # Domain layer
│   ├── entities/          # Business entities
│   └── value-objects/     # Value objects
├── usecase/               # Use case layer
│   ├── user/             # User-related use cases
│   └── post/             # Post-related use cases
├── repository/            # Repository layer
│   └── interfaces/       # Repository interfaces
├── infrastructure/        # Infrastructure layer
│   ├── http/            # HTTP client implementations
│   ├── repositories/    # Repository implementations
│   └── container/       # Dependency injection container
├── presentation/          # Presentation layer
│   ├── hooks/           # Custom React hooks
│   └── pages/           # Page components
├── shared/               # Shared layer
│   └── components/      # Reusable UI components
└── app/                  # Next.js app directory
    ├── layout.tsx       # Root layout
    ├── page.tsx         # Home page
    └── globals.css      # Global styles
```

## 🎯 Key Features

### 1. Dependency Inversion
- High-level modules don't depend on low-level modules
- Both depend on abstractions
- Abstractions don't depend on details

### 2. Separation of Concerns
- Each layer has a specific responsibility
- Clear boundaries between layers
- Easy to test and maintain

### 3. Testability
- Each layer can be tested independently
- Proper mocking and dependency injection
- Clear interfaces for testing

### 4. Scalability
- Easy to add new features
- Modular architecture
- Clear extension points

## 🔧 Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **State Management**: React Query + Custom Hooks
- **UI Components**: Custom component library
- **Dependency Injection**: Custom container

## 📝 Usage Examples

### Using a Use Case

```typescript
import { GetUserUseCase } from '@/usecase/user/GetUserUseCase';
import { Container } from '@/infrastructure/container/Container';

const container = Container.getInstance();
const userRepository = container.getUserRepository();
const getUserUseCase = new GetUserUseCase(userRepository);

const result = await getUserUseCase.execute({ userId: '123' });
if (result.isSuccess()) {
  console.log(result.value.user);
} else {
  console.error(result.error);
}
```

### Using Custom Hooks

```typescript
import { useUser } from '@/presentation/hooks/useUser';
import { Container } from '@/infrastructure/container/Container';

function UserProfile({ userId }: { userId: string }) {
  const container = Container.getInstance();
  const userRepository = container.getUserRepository();
  const { user, loading, error, getUser } = useUser(userRepository);

  useEffect(() => {
    getUser(userId);
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return <div>{user?.name}</div>;
}
```

## 🧪 Testing

The clean architecture makes testing straightforward:

```typescript
// Test a use case
describe('GetUserUseCase', () => {
  it('should return user when found', async () => {
    const mockRepository = {
      findById: jest.fn().mockResolvedValue(Result.success(mockUser))
    };
    
    const useCase = new GetUserUseCase(mockRepository);
    const result = await useCase.execute({ userId: '123' });
    
    expect(result.isSuccess()).toBe(true);
    expect(result.value.user).toEqual(mockUser);
  });
});
```

## 🎨 UI Components

The project includes a comprehensive set of reusable UI components:

- **Button**: Multiple variants and sizes
- **Input**: Form inputs with validation
- **Card**: Content containers with headers and footers
- **Loading States**: Consistent loading indicators
- **Error Handling**: Error boundaries and error states

## 🔄 State Management

State management is handled through:

1. **Custom Hooks**: Encapsulate business logic and state
2. **React Query**: Server state management
3. **Local State**: Component-specific state
4. **Context**: Global application state when needed

## 📚 Best Practices

### 1. Error Handling
- Use Result pattern for error handling
- Consistent error boundaries
- User-friendly error messages

### 2. Type Safety
- Strict TypeScript configuration
- Proper type definitions
- Interface segregation

### 3. Code Organization
- Feature-based folder structure
- Clear naming conventions
- Consistent file organization

### 4. Performance
- Lazy loading of components
- Optimized re-renders
- Efficient data fetching

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Clean Architecture by Robert C. Martin
- Next.js team for the excellent framework
- Tailwind CSS for the utility-first CSS framework
- The React community for inspiration and best practices
